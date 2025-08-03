import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
      compilers: [
        {
          version: "0.8.23",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
            viaIR: true,  // ✅ 添加这一行
          },
        },
        {
          version: "0.8.20",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
          },
        },
      ],
    },

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};

export default config;
