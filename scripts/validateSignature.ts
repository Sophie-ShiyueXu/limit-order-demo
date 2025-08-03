import { verifyTypedData } from "ethers";
import { readFileSync } from "fs";
import path from "path";

// 读取你之前生成的订单 JSON
const ordersPath = path.resolve(__dirname, "generatedOrders.json");
const ordersJson = JSON.parse(readFileSync(ordersPath, "utf-8"));

ordersJson.forEach((entry: any, idx: number) => {
  const { order, signature } = entry;

  const typedData = {
    domain: order.domain,
    types: { Order: order.types.Order },
    message: order.message,
  };

  const signer = verifyTypedData(
    typedData.domain,
    typedData.types,
    typedData.message,
    signature
  );

  const isValid = signer.toLowerCase() === order.maker.toLowerCase();

  console.log(`🧾 Order #${idx + 1}: ${isValid ? "✅ Valid" : "❌ Invalid"}`);
});
