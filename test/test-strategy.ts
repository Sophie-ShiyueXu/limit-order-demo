import { ethers } from "hardhat";
import { expect } from "chai";

describe("LimitOrderTest", function () {
  let limitOrderTest: any;
  let owner: any;
  let user: any;

  beforeEach(async () => {
    // 获取账户
    [owner, user] = await ethers.getSigners();

    // 部署 LimitOrderTest 合约
    const LimitOrderTest = await ethers.getContractFactory("LimitOrderTest");
    limitOrderTest = await LimitOrderTest.deploy();
  });

  it("should fill a limit order and emit event", async () => {
    const orderAmount = ethers.utils.parseEther("10");
    const orderPrice = ethers.utils.parseEther("1");

    // 模拟限价单成交
    await expect(limitOrderTest.fillLimitOrder(user.address, orderAmount, orderPrice))
      .to.emit(limitOrderTest, "OrderFilled")
      .withArgs(user.address, orderAmount, orderPrice);
  });
});
