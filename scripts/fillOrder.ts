import { ethers, Wallet } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { Address, TakerTraits } from "@1inch/limit-order-sdk";

dotenv.config();

const RPC_URL = process.env.RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const LIMIT_ORDER_PROTOCOL = process.env.LIMIT_ORDER_PROTOCOL!;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

// ABI（从 1inch 的 LimitOrderProtocol V4 合约中提取）
const LIMIT_ORDER_ABI = [
  "function fillOrderTo((uint256,address,address,address,address,uint256,uint256,uint256),bytes32,bytes32,uint256,uint256,address,bytes) external payable returns (uint256,uint256,bytes32)"
];

async function main() {
  const contract = new ethers.Contract(LIMIT_ORDER_PROTOCOL, LIMIT_ORDER_ABI, wallet);

  const ordersPath = path.resolve("scripts", "gridOrders.json");
  const ordersJson = JSON.parse(fs.readFileSync(ordersPath, "utf8"));

  if (!ordersJson || ordersJson.length === 0) {
    throw new Error("❌ 未找到订单数据，请先运行 generateGridOrders.ts");
  }

  const firstOrder = ordersJson[0];
  const order = firstOrder.order;
  const signature = firstOrder.signature;

  const { r, s, v } = ethers.Signature.from(signature);
  const vs = ethers.toBeHex((BigInt(v) << 255n) | BigInt("0x" + s.slice(2)));

  const takerTraits = TakerTraits.default().withMakingAmount(order.makingAmount);

  console.log("📨 开始撮合订单...");
  const tx = await contract.fillOrderTo(
    {
      salt: order.salt,
      maker: order.maker,
      receiver: order.receiver,
      makerAsset: order.makerAsset,
      takerAsset: order.takerAsset,
      makingAmount: order.makingAmount,
      takingAmount: order.takingAmount,
      makerTraits: order.makerTraits,
    },
    r,
    vs,
    order.makingAmount,
    takerTraits.encode(),
    wallet.address, // to self
    "0x"
  );

  const receipt = await tx.wait();
  console.log("✅ 撮合成功，交易哈希：", receipt?.hash);
}

main().catch((err) => {
  console.error("❌ 撮合失败:", err.message);
});
