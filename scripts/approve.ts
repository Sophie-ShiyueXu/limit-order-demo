import { ethers,JsonRpcProvider} from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const WETH_ADDRESS = "0xdd13e55209fd76afe204dbda4007c227904f0a81";
const MATCHER_ADDRESS = "0x733a59A315E164Bae082f8cB87E857AdA2d8Eae4";

const abi = ["function approve(address spender, uint256 amount) public returns (bool)"];
const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const token = new ethers.Contract(WETH_ADDRESS, abi, wallet);

async function main() {
  const tx = await token.approve(MATCHER_ADDRESS, ethers.MaxUint256);
  console.log("✅ Approve TX:", tx.hash);
  await tx.wait();
  console.log("✅ Approve 完成！");
}

main();
