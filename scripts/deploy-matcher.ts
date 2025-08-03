import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();

// 加载 ABI 和字节码（假设已通过 Hardhat 编译）
const artifactPath = path.join(__dirname, "../artifacts/contracts/CustomMatcher.sol/CustomMatcher.json");
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
const abi = artifact.abi;
const bytecode = artifact.bytecode;

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC!);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  const limitOrderProtocol = "0x1111111254fb6c44bac0bed2854e76f90643097d"; // 官方 Sepolia
  const hookAddress = "0xb473CBa4eeC83A46560716e07A3A41095AdE4cc6";     // 你已部署的 Hook 地址

  const matcherFactory = new ethers.ContractFactory(abi, bytecode, signer);
  const matcher = await matcherFactory.deploy(limitOrderProtocol, hookAddress);
  await matcher.waitForDeployment();

  console.log("✅ CustomMatcher 部署成功，地址为:", await matcher.getAddress());
}

main().catch((error) => {
  console.error("❌ 部署失败:", error);
  process.exitCode = 1;
});
