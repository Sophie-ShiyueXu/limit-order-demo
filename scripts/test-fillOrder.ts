// scripts/directFill.ts
import { ethers,JsonRpcProvider } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";
dotenv.config();

const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const orderJson = JSON.parse(fs.readFileSync("order.json", "utf-8"));
const { order, signature, unlockTime } = orderJson;

const coder = ethers.AbiCoder.defaultAbiCoder();

const interactionData = coder.encode(["uint256"], [unlockTime]);

const encodedOrder = coder.encode(
  [
    "tuple(address maker, address makerAsset, address takerAsset, uint256 makingAmount, uint256 takingAmount, uint256 offsets, bytes interactions)"
  ],
  [order]
);

async function main() {
  const limitOrderProtocol = new ethers.Contract(
    "0x1111111254EEB25477B68fb85Ed929f73A960582", // 1inch Limit Order Protocol (Sepolia)
    ["function fillOrder(bytes,bytes,uint256,bytes) external returns (uint256, uint256)"],
    signer
  );

  const tx = await limitOrderProtocol.fillOrder(
    encodedOrder,
    signature,
    order.makingAmount,
    interactionData
  );

  console.log("📤 成交发送成功:", tx.hash);
  await tx.wait();
  console.log("✅ 成交成功");
}
main();
