import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 部署账户地址:", deployer.address);

  // 获取合约工厂
  const WETH9 = await ethers.getContractFactory("WETH9");
  const weth = await WETH9.deploy();
  await weth.waitForDeployment();
  console.log("✅ WETH 部署成功:", await weth.getAddress());

  const Protocol = await ethers.getContractFactory("LimitOrderProtocol");
  const protocol = await Protocol.deploy(await weth.getAddress());
  await protocol.waitForDeployment();

  console.log("✅ LimitOrderProtocol 部署成功地址:", await protocol.getAddress());

  console.log("\n📌 请将以下地址添加到 .env 文件中:");
  console.log(`LIMIT_ORDER_PROTOCOL=${await protocol.getAddress()}`);
  console.log(`WETH_ADDRESS=${await weth.getAddress()}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
