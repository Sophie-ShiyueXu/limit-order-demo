import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("MockERC20");

  const usdt = await Token.deploy("MockUSDT", "USDT", 6, 1_000_000); // 6 decimals
  await usdt.waitForDeployment();
  console.log("✅ USDT 部署地址:", await usdt.getAddress());

  const inch = await Token.deploy("Mock1INCH", "1INCH", 18, 1_000_000); // 18 decimals
  await inch.waitForDeployment();
  console.log("✅ 1INCH 部署地址:", await inch.getAddress());

  console.log(`📌 请将这些地址写入 .env 文件：
MAKER_ASSET=${await usdt.getAddress()}
TAKER_ASSET=${await inch.getAddress()}
`);
}

main().catch(console.error);
