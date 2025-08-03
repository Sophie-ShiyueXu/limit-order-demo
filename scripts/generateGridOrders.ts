import { Wallet, JsonRpcProvider } from "ethers";
import {
  LimitOrder,
  MakerTraits,
  Address,
  getLimitOrderV4Domain
} from "@1inch/limit-order-sdk";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

// Provider & Wallet
const provider = new JsonRpcProvider(process.env.RPC_URL || "https://eth.llamarpc.com");
const privateKey = process.env.PRIVATE_KEY!;
const maker = new Wallet(privateKey, provider);

// Token addresses (can be read from .env if needed)
const makerAsset = new Address(process.env.MAKER_ASSET!); // e.g. USDT
const takerAsset = new Address(process.env.TAKER_ASSET!); // e.g. 1INCH

// 网格参数
const gridCount = 5;
const priceStart = 9; // 起始价格（1INCH）
const priceEnd = 11;  // 结束价格（1INCH）

const makingAmountPerOrder = 100_000000n; // 100 USDT
const expiresIn = 60n * 60n; // 1小时有效期
const expiration = BigInt(Math.floor(Date.now() / 1000)) + expiresIn;

const chainId = Number(process.env.CHAIN_ID || "1");
const domain = getLimitOrderV4Domain(chainId);

// ✅ 安全 nonce 工具函数
const getSafeNonce = (): bigint => {
  return BigInt(Date.now()) % (1n << 40n);
};

async function main() {
  const orders: any[] = [];

  for (let i = 0; i < gridCount; i++) {
    const price = priceStart + ((priceEnd - priceStart) / gridCount) * i;
    const takingAmount = BigInt(Math.floor(Number(makingAmountPerOrder) / price * 1e18));

    const makerTraits = MakerTraits.default()
      .withExpiration(expiration)
      .withNonce(getSafeNonce());

    const order = new LimitOrder(
      {
        makerAsset,
        takerAsset,
        makingAmount: makingAmountPerOrder,
        takingAmount,
        maker: new Address(maker.address),
        receiver: new Address(maker.address)
      },
      makerTraits
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
      order: typedData.message,
      signature
    });
  }

  const outputPath = path.resolve("scripts", "gridOrders.json");
  fs.writeFileSync(outputPath, JSON.stringify(orders, null, 2));
  console.log(`✅ 共生成 ${orders.length} 个挂单，输出到 ${outputPath}`);
}

main().catch((err) => {
  console.error("❌ 生成失败:", err);
  process.exit(1);
});
