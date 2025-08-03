import { Wallet, JsonRpcProvider, Contract, AbiCoder } from "ethers";
import {
  LimitOrder,
  MakerTraits,
  Address,
  randBigInt
} from "@1inch/limit-order-sdk";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const provider = new JsonRpcProvider(process.env.RPC_URL!);
const privateKey = process.env.PRIVATE_KEY!;
const maker = new Wallet(privateKey, provider);

// assets & hook
const makerAsset = new Address(process.env.MAKER_ASSET!);
const takerAsset = new Address(process.env.TAKER_ASSET!);
const priceFeed = process.env.CHAINLINK_FEED!;
const hookAddress = process.env.GRID_HOOK!;
const chainId = Number(process.env.CHAIN_ID!);

// 网格参数
const gridCount = 5;
const priceStart = 9.5;
const priceEnd = 10.5;
const baseMakerAmount = 100; // 100 USDT

// 过期时间
const expiresIn = 60n * 60n;
const expiration = BigInt(Math.floor(Date.now() / 1000)) + expiresIn;

// utils
const defaultAbiCoder = AbiCoder.defaultAbiCoder();
const erc20Abi = ["function decimals() view returns (uint8)"];

async function main() {
  // 获取 decimals
  const makerToken = new Contract(makerAsset.toString(), erc20Abi, provider);
  const takerToken = new Contract(takerAsset.toString(), erc20Abi, provider);
  const makerDecimals = await makerToken.decimals();
  const takerDecimals = await takerToken.decimals();

  const makerFactor = 10n ** BigInt(makerDecimals);
  const takerFactor = 10n ** BigInt(takerDecimals);

  const makingAmountPerOrder = BigInt(baseMakerAmount) * makerFactor;

  const orders = [];

  for (let i = 0; i < gridCount; i++) {
    const price = priceStart + ((priceEnd - priceStart) / (gridCount - 1)) * i;

    // 精确换算 takingAmount
    // 使用 BigInt 表示价格（以 1e8 为单位）
    const priceInt = BigInt(Math.round(price * 1e8));
    const priceScale = 10n ** 8n;

    const takingAmount = (makingAmountPerOrder * takerFactor * priceScale) / (priceInt * makerFactor);

    const MAX_NONCE = (1n << 40n) - 1n;
    const traits = MakerTraits.default()
      .withExpiration(expiration)
      .withNonce(randBigInt(MAX_NONCE));

    // interaction 构造
    const lower = BigInt(Math.floor(price * 0.995 * 1e8));
    const upper = BigInt(Math.ceil(price * 1.005 * 1e8));
    const encodedArgs = defaultAbiCoder.encode(["address", "int256", "int256"], [priceFeed, lower, upper]);
    const interaction =
      "0x" +
      hookAddress.toLowerCase().replace(/^0x/, "").padStart(40, "0") +
      encodedArgs.slice(2);

    const order = new LimitOrder(
      {
        makerAsset,
        takerAsset,
        maker: new Address(maker.address),
        receiver: new Address("0x0000000000000000000000000000000000000000"),
        makingAmount: makingAmountPerOrder,
        takingAmount
      },
      traits
    );

    const typedData = order.getTypedData(chainId);
    const signature = await maker.signTypedData(
      typedData.domain,
      { Order: typedData.types.Order },
      typedData.message
    );

    orders.push({
      gridPrice: price,
      makingAmount: makingAmountPerOrder.toString(),
      takingAmount: takingAmount.toString(),
      order: {
        makerAsset: makerAsset.toString(),
        takerAsset: takerAsset.toString(),
        maker: maker.address,
        receiver: "0x0000000000000000000000000000000000000000",
        allowedSender: "0x0000000000000000000000000000000000000000",
        makingAmount: makingAmountPerOrder.toString(),
        takingAmount: takingAmount.toString(),
        salt: typedData.message.salt,
        expiration: expiration.toString(),
        makerTraits: typedData.message.makerTraits,
        interactions: interaction
      },
      signature
    });

    console.log(`✅ 订单 #${i + 1} @ $${price.toFixed(2)} | 区间 [$${(price * 0.995).toFixed(2)} - $${(price * 1.005).toFixed(2)}]`);
  }

  const outputPath = path.resolve("scripts", "gridOrders.json");
  fs.writeFileSync(outputPath, JSON.stringify(orders, null, 2));
  console.log(`\n✅ 共生成 ${orders.length} 个挂单，已写入 ${outputPath}`);
}

main().catch(console.error);
