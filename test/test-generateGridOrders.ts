import { expect } from "chai";
import fs from "fs";
import path from "path";
import { verifyTypedData } from "ethers";
import { runScript } from "../scripts/generateGridOrders";

describe("generateGridOrders.ts", () => {
  const outputPath = path.resolve(__dirname, "../scripts/generatedOrders.json");

  before(async () => {
    await runScript();
  });

  it("✅ 应生成 JSON 文件", () => {
    expect(fs.existsSync(outputPath)).to.be.true;
  });

  it("✅ 每个订单结构应完整且签名正确", () => {
    const json = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    for (const entry of json) {
      const { order, signature } = entry;

      expect(order).to.have.property("makerAsset");
      expect(order).to.have.property("takerAsset");
      expect(order).to.have.property("makingAmount");
      expect(order).to.have.property("takingAmount");
      expect(signature).to.match(/^0x[0-9a-fA-F]{130}$/);

      const signer = verifyTypedData(
        order.domain,
        { Order: order.types.Order },
        order.message,
        signature
      );

      expect(signer.toLowerCase()).to.equal(order.message.maker.toLowerCase());
    }
  });

  it("✅ 每个 interaction 应包含价格区间编码", () => {
    const json = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    for (const entry of json) {
      const interaction = entry.order.message.interaction;
      expect(interaction).to.match(/^0x[0-9a-fA-F]+$/);
      expect(interaction.length).to.be.greaterThan(130);
    }
  });
});
