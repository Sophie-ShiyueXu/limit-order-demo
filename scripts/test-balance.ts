// scripts/checkBalance.ts
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { JsonRpcProvider, Wallet } from "ethers";
dotenv.config();

const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC);
const signer = new Wallet(process.env.PRIVATE_KEY!, provider.provider);

const tokenAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789"; // LINK
const matcherAddress = "0x733a59A315E164Bae082f8cB87E857AdA2d8Eae4"; // your matcher

const abi = [
  "function balanceOf(address) view returns (uint256)",
  "function allowance(address, address) view returns (uint256)",
];

const erc20 = new ethers.Contract(tokenAddress, abi, provider);

async function main() {
  const balance = await erc20.balanceOf(signer.address);
  const allowance = await erc20.allowance(signer.address, matcherAddress);

  console.log("👛 Balance:", ethers.formatUnits(balance, 18));
  console.log("🧾 Allowance to matcher:", ethers.formatUnits(allowance, 18));
}
main();
