import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function testAggregator() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);
  const contract = new ethers.Contract(
    process.env.CHAINLINK_FEED!,
    ["function latestAnswer() view returns (int256)"],
    provider
  );

  const price = await contract.latestAnswer();
  console.log("✅ Aggregator latestAnswer():", price.toString());
}

testAggregator().catch(console.error);
