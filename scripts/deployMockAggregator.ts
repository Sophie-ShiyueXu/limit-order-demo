import { ethers } from "hardhat";

async function main() {
  const decimals = 8;
  const initialAnswer = ethers.parseUnits("1000", decimals); // $1000 * 1e8

  const Mock = await ethers.getContractFactory("contracts/AggregatorMock.sol:AggregatorMock");

  const mock = await Mock.deploy(initialAnswer, decimals);

  console.log(`✅ Mock Aggregator 部署成功: ${mock.target}`);
  console.log(`🧪 初始价格: ${initialAnswer.toString()} (${decimals} decimals)`);
}

main().catch(console.error);
