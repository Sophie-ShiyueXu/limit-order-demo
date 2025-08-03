import {
  LimitOrder,
  MakerTraits,
  Address,
  randBigInt
} from "@1inch/limit-order-sdk";
import { Wallet,JsonRpcProvider } from "ethers"
import * as dotenv from "dotenv"
import * as fs from "fs";
// import { JsonRpcProvider } from "@ethersproject/providers";
dotenv.config();


const privKey = process.env.PRIVATE_KEY!;
const rpcUrl = process.env.SEPOLIA_RPC!;
const provider = new JsonRpcProvider(rpcUrl);
const maker = new Wallet(privKey, provider);

async function main() {
  const expirationTime = BigInt(Math.floor(Date.now() / 1000) + 300); // 5分钟后过期
  const unlockTime = Math.floor(Date.now() / 1000) - 10; // 10 秒前 // 2分钟后可解锁
  const UINT_40_MAX = (1n << 40n) - 1n;
  
  const traits = MakerTraits.default()
    .withExpiration(expirationTime)
    .withNonce(randBigInt(UINT_40_MAX)); // ✅ 不要超过 40 位！
  
  // const traits = MakerTraits.default()
  //   .withExpiration(expirationTime)
  //   .withNonce(randBigInt((1n << 48n) - 1n));
  
  const order = new LimitOrder(
    {
      makerAsset: new Address("0xdd13E55209Fd76AfE204dBda4007C227904f0a81"), // WETH
      takerAsset: new Address("0x779877A7B0D9E8603169DdbD7836e478b4624789"), // LINK
      makingAmount: 1_000000000000000000n,
      takingAmount: 20_000000000000000000n,
      maker: new Address(maker.address),
      receiver: new Address(maker.address),
    } as any, traits);

  // ✅ 传入 chainId（Sepolia）
  const typedData = order.getTypedData(11155111);

  const signature = await maker.signTypedData(
    typedData.domain,
    { Order: typedData.types.Order },
    typedData.message
  );
  

  const payload = {
    order,       // 包含 BigInt 字段
    signature,
    unlockTime,
  };
  
  // ✅ 使用 replacer 将 BigInt 转换为字符串
  fs.writeFileSync("order.json", JSON.stringify(payload, (_key, value) =>
    typeof value === "bigint" ? value.toString() : value, 2));
  
  console.log("✅ 订单签名完成，已保存到 order.json");
  
}

main().catch((e) => {
  console.error("❌ 出错：", e);
  process.exit(1);
});
