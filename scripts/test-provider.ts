import * as dotenv from "dotenv"
dotenv.config()

import { ethers } from "ethers";
import { JsonRpcProvider } from "@ethersproject/providers";

console.log("RPC:", process.env.SEPOLIA_RPC);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY?.slice(0, 10) + "...");


const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC)
console.log(process.env.SEPOLIA_RPC);
async function main() {
  const net = await provider.getNetwork()
  console.log("连接成功，网络为：", net)
}

main()