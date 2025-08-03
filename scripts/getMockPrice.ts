import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL!);

  const AggregatorABI = ["function latestAnswer() view returns (int256)"];
  const aggregator = new ethers.Contract(process.env.CHAINLINK_FEED!, AggregatorABI, provider);

  const price = await aggregator.latestAnswer();
  console.log("🔍 当前 ChainlinkAggregator 价格:", price.toString());
  console.log("💵 解读为 USD:", Number(price) / 1e8, "美元");
}

main().catch(console.error);
