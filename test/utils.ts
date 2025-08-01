import { ethers } from "ethers";

// 用于生成签名订单
export const generateOrder = async (
  maker: string,
  taker: string,
  makingAmount: string,
  takingAmount: string
) => {
  const domain = {
    name: "LimitOrderProtocol",
    version: "1",
    chainId: 80001,
    verifyingContract: "0xYourDeployedLimitOrderProtocol",  // 部署的协议合约地址
  };

  const types = {
    LimitOrder: [
      { name: "maker", type: "address" },
      { name: "taker", type: "address" },
      { name: "makingAmount", type: "uint256" },
      { name: "takingAmount", type: "uint256" },
    ],
  };

  const order = {
    maker,
    taker,
    makingAmount,
    takingAmount,
  };

  const signer = new ethers.Wallet("your_private_key_here");
  const signature = await signer._signTypedData(domain, types, order);

  return { order, signature };
};
