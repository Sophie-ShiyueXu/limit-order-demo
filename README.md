# 🧠 LimitOrder Grid Strategy Demo

本项目基于 **1inch Limit Order Protocol** 实现了一个**链上网格挂单策略**，包含订单生成、验证、自定义撮合与策略 Hook 的全流程。该项目用于演示如何基于 1inch 协议扩展高级限价单策略并实现链上撮合成交。

------

## 🧭 项目介绍

- 使用 **1inch Limit Order Protocol V4** 构建链上撮合系统；
- 实现支持价格区间的**网格策略挂单逻辑（GridHook.sol）**；
- 撰写自定义 Hook 合约，实现链上撮合前的检查逻辑；
- 撰写脚本生成签名订单并执行撮合；
- 项目可运行于本地节点或测试网；
- 使用 TypeScript + Hardhat + Ethers.js 完整构建与部署流程。

------

## 🗂️ 项目结构概览

```bash
limit-order-demo/
├── contracts/              # 智能合约
│   ├── extensions/         # Hook 扩展逻辑（如价格验证）
│   ├── mocks/              # 测试用 Mock 合约
│   ├── GridHook.sol        # 网格策略逻辑合约
│   ├── TimeLockHook.sol    # 时间锁策略 Hook 合约示例
│   ├── LimitOrderProtocol.sol # 核心撮合协议合约
│   └── WETH9.sol           # WETH 实现合约
│
├── scripts/                # 执行脚本
│   ├── deployMocks.ts           # 部署 mock 合约和预言机
│   ├── deployLimitOrderProtocol.ts # 部署主协议合约
│   ├── generateGridOrders.ts   # 生成网格挂单订单
│   ├── fillOrder.ts            # 撮合成交订单
│   └── gridOrders.json         # 生成的订单 JSON 数据
│
├── test/                   # 单元测试（可扩展）
├── hardhat.config.ts       # Hardhat 配置
└── .env                    # 环境变量配置
```

### 🔁 **运行流程概览**

下面是你的项目从头到尾的**运行逻辑流程**：

------

### ① 部署基础合约

> 📁 `scripts/deployMocks.ts`

部署：

- `MockPriceFeed.sol`：模拟链上价格数据。
- `GridHook.sol`：用于订单生效判断的“网格钩子”，根据价格是否落在区间内执行订单。

**运行：**

```bash
npx hardhat run scripts/deployMocks.ts --network localhost
```

------

### ② 部署核心协议合约

> 📁 `scripts/deployLimitOrderProtocol.ts`

部署：

- `WETH9.sol`
- `LimitOrderProtocol.sol`：核心撮合协议合约，用于撮合、签名验证、成交订单。

**运行：**

```bash
npx hardhat run scripts/deployLimitOrderProtocol.ts --network localhost
```

⚠️ 运行成功后，请把控制台输出的地址添加到 `.env` 文件中：

```env
LIMIT_ORDER_PROTOCOL=...
WETH_ADDRESS=...
```

------

### ③ 生成网格订单

> 📁 `scripts/generateGridOrders.ts`

根据设定的价格区间与分档数，自动生成多个挂单（USDT 兑 1INCH），并使用 EIP-712 签名后保存至 `gridOrders.json` 文件中。

**运行：**

```bash
npx ts-node scripts/generateGridOrders.ts
```

生成：

- 签名后的订单对象数组
- 每个订单包含 `makingAmount`, `takingAmount`, `price`, `signature`

------

### ④ 撮合挂单执行交易

> 📁 `scripts/fillOrder.ts`

读取 `gridOrders.json` 中的订单，通过调用 `fillOrderTo()` 函数将挂单送入链上协议进行成交（本地匹配，不依赖 1inch 官方 Orderbook API）。

**运行：**

```bash
npx ts-node scripts/fillOrder.ts
```

------

### ⑤ 可选：验证订单签名

> 📁 `scripts/validateSignature.ts`

如果你希望在本地或前端验证挂单签名是否有效，可运行该脚本验证订单和签名。

------

### ⑥ 前端集成（可选）

> 📁 `frontend/`

你可以构建前端页面来展示挂单、发起成交、签名订单等交互。前端可以使用 `ethers.js` 或 SDK 直接读取生成的 JSON 文件，进行挂单匹配或签名。

------

### 📦 依赖组件说明

- `@1inch/limit-order-sdk`: 创建 & 签名 EIP-712 限价单
- `@1inch/limit-order-protocol-contract`: 核心合约逻辑
- `ethers`: 区块链交互
- `dotenv`: 读取私钥等敏感信息
- `ts-node`, `typescript`: 脚本执行
- `hardhat`: 合约开发 & 测试环境

------

### ✅ 运行顺序总结（建议）

```bash
# 1. 启动本地节点
npx hardhat node

# 2. 部署 Mock 合约（Chainlink Feed、GridHook）
npx hardhat run scripts/deployMocks.ts --network localhost

# 3. 部署主协议合约
npx hardhat run scripts/deployLimitOrderProtocol.ts --network localhost

# 4. 创建网格订单（签名 & 保存）
npx ts-node scripts/generateGridOrders.ts

# 5. 撮合成交（本地链上）
npx ts-node scripts/fillOrder.ts
```