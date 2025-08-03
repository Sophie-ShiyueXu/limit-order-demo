import { Wallet } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { Address, TakerTraits } from "@1inch/limit-order-sdk";
// import { hexZeroPad } from "ethers/lib/utils";
import { ethers } from "ethers";
// import { hexZeroPad } from "ethers/lib/utils"; 
// const { ethers } = require('ethe`rs');
dotenv.config();

const RPC_URL = process.env.RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const LIMIT_ORDER_PROTOCOL = process.env.LIMIT_ORDER_PROTOCOL!;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new Wallet(PRIVATE_KEY, provider);

// ABI from LimitOrderProtocol
const LIMIT_ORDER_ABI = [
  "function fillOrderTo(tuple(uint256 salt,address maker,address receiver,address makerAsset,address takerAsset,uint256 makingAmount,uint256 takingAmount,uint256 makerTraits),bytes32 r,bytes32 vs,uint256 makingAmount,uint256 takerTraits,address target,bytes interaction) external payable returns (uint256, uint256, bytes32)"
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

  // 解构签名
  const { r, s, v } = ethers.Signature.from(signature);

  // 构造符合 bytes32 长度的 r 和 vs
  const rHex = ethers.hexlify(ethers.zeroPadValue(r, 32));
  const sBigInt = BigInt(s);
  const vsBigInt = sBigInt | (BigInt(v) << 255n);
  const vs = ethers.hexlify(ethers.zeroPadValue(ethers.toBeArray(vsBigInt), 32));

  // 构造 takerTraits（最小设置）
  const takerTraits = TakerTraits.default();

  console.log("📨 开始撮合订单...");

  const orderTuple = {
    salt: BigInt(order.salt),
    maker: order.maker,
    receiver: order.receiver,
    makerAsset: order.makerAsset,
    takerAsset: order.takerAsset,
    makingAmount: BigInt(order.makingAmount),
    takingAmount: BigInt(order.takingAmount),
    makerTraits: BigInt(order.makerTraits),
  };

  const tx = await contract.fillOrderTo(
    orderTuple,
    rHex,
    vs,
    BigInt(order.makingAmount),
    takerTraits.encode(),
    wallet.address,
    "0x"
  );

  const receipt = await tx.wait();
  console.log("✅ 撮合成功，交易哈希：", receipt?.hash);
}

main().catch((err) => {
  console.error("❌ 撮合失败:", err.message);
});
