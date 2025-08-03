import { ethers } from "hardhat";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();

  // 1. 部署 Mock 预言机
  const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");
  const priceFeed = await MockPriceFeed.deploy(1000e8); // 初始价格
  await priceFeed.waitForDeployment();

  // 2. 部署 GridHook 并传入 priceFeed 地址
  const GridHook = await ethers.getContractFactory("GridHook");
  const gridHook = await GridHook.deploy();
  await gridHook.waitForDeployment();

  // ✅ 输出地址
  console.log("🔗 CHAINLINK_FEED:", await priceFeed.getAddress());
  console.log("🧩 GRID_HOOK:", await gridHook.getAddress());

  // 3. 写入 .env 文件
  const envPath = ".env";
  const env = fs.readFileSync(envPath, "utf-8");
  const newEnv = env
    .replace(/CHAINLINK_FEED=.*/g, `CHAINLINK_FEED=${await priceFeed.getAddress()}`)
    .replace(/GRID_HOOK=.*/g, `GRID_HOOK=${await gridHook.getAddress()}`);
  fs.writeFileSync(envPath, newEnv);

  console.log("✅ 地址已写入 .env");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
