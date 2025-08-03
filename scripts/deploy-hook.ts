import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as solc from "solc";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC!);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

// 读取合约源码
const contractPath = path.resolve(__dirname, "../contracts/TimeLockHook.sol");
const source = fs.readFileSync(contractPath, "utf8");

// 编译合约
const input = {
  language: "Solidity",
  sources: {
    "TimeLockHook.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode.object"],
      },
    },
  },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = compiled.contracts["TimeLockHook.sol"]["TimeLockHook"];
const abi = contractFile.abi;
const bytecode = contractFile.evm.bytecode.object;

async function main() {
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const hook = await factory.deploy();

  await hook.waitForDeployment(); // ethers v6 新写法

  console.log("✅ Hook 合约已部署在:", await hook.getAddress());
}

main().catch((err) => {
  console.error("❌ 部署失败:", err);
  process.exit(1);
});
