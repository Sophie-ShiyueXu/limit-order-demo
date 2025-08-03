import { Wallet } from "ethers";

const wallet = Wallet.createRandom();
console.log("🧾 地址:", wallet.address);
console.log("🔑 私钥:", wallet.privateKey);
console.log("📝 助记词:", wallet.mnemonic?.phrase);
