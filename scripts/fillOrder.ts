import { ethers, Wallet, JsonRpcProvider, Contract } from "ethers";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config();

const ordersPath = path.resolve("scripts", "gridOrders.json");
const orders = JSON.parse(fs.readFileSync(ordersPath, "utf8"));

const provider = new JsonRpcProvider(process.env.RPC_URL!);
const privateKey = process.env.PRIVATE_KEY!;
const matcher = new Wallet(privateKey, provider);

const aggregatorAbi = ["function latestAnswer() view returns (int256)"];
const aggregator = new Contract(process.env.CHAINLINK_FEED!, aggregatorAbi, provider);

const limitOrderProtocolAbi = [
  "function fillOrder(tuple(address makerAsset,address takerAsset,address maker,address receiver,address allowedSender,uint256 makingAmount,uint256 takingAmount,uint256 salt,uint256 expiration,uint256 makerTraits,bytes interactions), bytes signature, uint256 makingAmount, uint256 takingAmount, bytes resolverInteraction) external"
];

const limitOrderProtocol = new Contract(process.env.LIMIT_ORDER_PROTOCOL!, limitOrderProtocolAbi, matcher);

// decode interaction 中的 price range
function decodeInteraction(interactions: string) {
  const encoded = "0x" + interactions.slice(42); // 去掉 hook 地址
  const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
    ["address", "int256", "int256"],
    encoded
  );
  return {
    priceFeed: decoded[0],
    lower: Number(decoded[1]) / 1e8,
    upper: Number(decoded[2]) / 1e8,
  };
}

async function main() {
  console.log(`📦 撮合者地址: ${matcher.address}`);
  console.log(`📄 撮合 ${orders.length} 个订单\n`);

  const latestAnswer = await aggregator.latestAnswer();
  const currentPrice = Number(latestAnswer) / 1e8;
  console.log(`📈 当前链上价格 (mock aggregator): $${currentPrice.toFixed(2)}\n`);

  for (let i = 0; i < orders.length; i++) {
    const o = orders[i];
    const interactionInfo = decodeInteraction(o.order.interactions);
    const { lower, upper } = interactionInfo;

    console.log(`🚀 撮合订单 #${i + 1}`);
    console.log(`💰 订单价格区间: $${lower.toFixed(2)} - $${upper.toFixed(2)}`);
    console.log(`🔎 当前价格 $${currentPrice.toFixed(2)} ${currentPrice >= lower && currentPrice <= upper ? "✅ 可成交" : "❌ 不在区间"}`);
    console.log(`📤 Making: ${o.makingAmount}, 📥 Taking: ${o.takingAmount}`);

    try {

    const makingAmount = BigInt(o.order.makingAmount);
    const takingAmount = BigInt(o.order.takingAmount);
      // 👇 模拟撮合（不发送交易）
      // ✅ 模拟调用（不发送交易）
    await limitOrderProtocol.getFunction("fillOrder").staticCall(
        o.order,
        o.signature,
        makingAmount,
        takingAmount,
        "0x"
    );
    console.log(`🧪 ✅ 模拟撮合成功，可上链填单`);

    const tx = await limitOrderProtocol.fillOrder(
          o.order,
          o.signature,
          makingAmount,
          takingAmount,
          "0x"
        );

      await tx.wait();
      console.log(`✅ 撮合成功: ${tx.hash}\n`);
    } catch (err: any) {
      console.error(`❌ 撮合失败: ${err.reason || err.message}\n`);
        // 👇👇👇 你要添加的就在这里 👇👇👇
        console.error(`❌ 模拟调用失败`);
        console.error("🧪 原因:", err?.reason || err?.message || err);
        if (err?.data?.errorName) {
          console.error("🧪 识别到错误类型:", err.data.errorName);
        }
        console.error();




    }
  }
}

main().catch(console.error);
