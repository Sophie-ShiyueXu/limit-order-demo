import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const aggregatorAddress = process.env.CHAINLINK_FEED!;
  const decimals = 8; // 必须与你部署时一致！
  const mock = await ethers.getContractAt(
      "contracts/AggregatorMock.sol:AggregatorMock",
      aggregatorAddress
    );

  const price = "10.00"; // 设置为 $10.00
  const value = ethers.parseUnits(price, decimals);

  const tx = await mock.setLatestAnswer(value);
  await tx.wait();

  console.log(`✅ 设置成功: ${price} (${value.toString()})`);
}

main().catch(console.error);
