import { ethers, JsonRpcProvider} from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

// === 配置 ===
const matcherAddress = "0x1CC51b2c1268b365232F290e3913555DB37eAAeE"; // 👈 你的 matcher 合约地址
const abi = [
  "function fillOrderWithHook(bytes order, bytes signature, uint256 makingAmount, bytes interactionData) external payable"
];

const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const matcher = new ethers.Contract(matcherAddress, abi, signer);

// === 加载 order.json ===
const orderJson = JSON.parse(fs.readFileSync("order.json", "utf8"));
const { order, signature, unlockTime } = orderJson;

// === 编码 unlockTime（用于 hook 参数）===
const coder = ethers.AbiCoder.defaultAbiCoder();
const interactionData = coder.encode(["uint256"], [unlockTime]);


// === 结构展开 & 修复 ===
function flattenOrder(order: any) {
  return {
    maker: order.maker?.val ?? order.maker,
    makerAsset: order.makerAsset?.val ?? order.makerAsset,
    takerAsset: order.takerAsset?.val ?? order.takerAsset,
    makingAmount: BigInt(order.makingAmount),
    takingAmount: BigInt(order.takingAmount),
    offsets: BigInt(0), // 🔧 若原 order 中无 offsets，则占位    
    interactions: "0x" // 🔧 默认空 interactions；如有真实可替换
  };
}

async function main() {
  const flatOrder = flattenOrder(order);

  const unlockTime = 1754154715 // 👈 从 order.json 读取
  console.log("🕒 当前时间:", Math.floor(Date.now() / 1000));
  console.log("🔒 unlockTime:", unlockTime);
  console.log("⏳ 差距（秒）:", unlockTime - Math.floor(Date.now() / 1000));
  console.log("🔓 interactionData:", interactionData); // 应该是 `0x` 开头、64位 hex

  const encodedOrder = order.buildOrderData(); // 比你手动写 encode(...) 更安全可靠


  const tx = await matcher.fillOrderWithHook(
    encodedOrder,
    signature,
    flatOrder.makingAmount,
    interactionData
  );
  

  console.log("📤 撮合交易已发送:", tx.hash);
  await tx.wait();
  console.log("✅ 撮合成功");
}



main().catch((err) => {
  console.error("❌ 撮合失败:", err);
  process.exit(1);
});
