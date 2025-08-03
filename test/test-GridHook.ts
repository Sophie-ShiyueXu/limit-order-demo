import { expect } from "chai";
import { ethers } from "hardhat";
import { AbiCoder } from "ethers";

describe("GridHook", () => {
  let hook: any;
  let priceFeedMock: any;
  const abi = new AbiCoder();

  beforeEach(async () => {
    const PriceFeedMock = await ethers.getContractFactory("MockPriceFeed");
    priceFeedMock = await PriceFeedMock.deploy(1000e8); // 初始化模拟价格为 1000

    const GridHook = await ethers.getContractFactory("GridHook");
    hook = await GridHook.deploy(); // 无需构造函数参数
  });

  it("✅ 当前价格在范围内，应通过", async () => {
    const encodedData = abi.encode(
      ["address", "int256", "int256"],
      [priceFeedMock.target, 950e8, 1050e8]
    );

    await expect(
      hook.preInteraction(ethers.ZeroAddress, ethers.ZeroAddress, encodedData)
    ).to.not.be.reverted;
  });

  it("❌ 当前价格超出范围，应被拒绝", async () => {
    const encodedData = abi.encode(
      ["address", "int256", "int256"],
      [priceFeedMock.target, 800e8, 900e8]
    );

    await expect(
      hook.preInteraction(ethers.ZeroAddress, ethers.ZeroAddress, encodedData)
    ).to.be.revertedWithCustomError(hook, "PriceNotInRange");
  });
});
