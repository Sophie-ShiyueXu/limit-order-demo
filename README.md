## **On-Chain Grid Trading Bot with 1inch Limit Order Protocol**

### Overview

This project implements a fully on-chain **grid trading system** using the [1inch Limit Order Protocol v3](https://docs.1inch.io/docs/limit-order-protocol/limit-order-protocol-v3/introduction/). It allows traders to create a series of signed limit orders with custom-defined price ranges. Orders are matched and executed on-chain based on real-time prices fetched from a (mocked) Chainlink oracle.

---

### Motivation

Grid trading is a time-tested strategy in centralized exchanges (CEXs), where users place a sequence of buy and sell orders at regular price intervals, aiming to profit from market fluctuations. This project brings that strategy **on-chain**, providing:

* Trustless asset custody
* Transparent order logic
* Oracle-based execution validation

---

### Core Features

#### 1. Grid Strategy Configuration

Users can define a grid strategy by providing:

* Price range (e.g., \$9.5 to \$10.5)
* Number of grid levels (e.g., 5)
* Amount per order (e.g., 100 USDT)
* Token pair (e.g., USDT to 1INCH)

#### 2. EIP-712 Order Signing

Orders are signed using `@1inch/limit-order-sdk`, and include:

* Maker/taker assets
* Making and taking amounts
* Unique salt (nonce)
* `interactions` field embedding the on-chain hook (e.g., price range check)

#### 3. GridHook Smart Contract

A custom hook contract that validates whether the current market price is within the acceptable range:

* Reads `latestAnswer()` from Chainlink-style aggregator
* Reverts with a custom error if price is out of bounds
* Can be reused in any 1inch order `interaction`

#### 4. Mock Aggregator

A mock Chainlink oracle for local testing. It supports:

* `latestAnswer()` returning a fixed price (e.g., \$10.00)
* `setLatestAnswer(int)` function for manual control during testing
* 8-decimal compatibility with Chainlink price feeds

#### 5. Order Matching & Execution Script

A TypeScript script (`fillOrder.ts`) that:

* Simulates order matching via `staticCall.fillOrder`
* Prints detailed logs for each order (range, current price, success/failure)
* Executes `fillOrder()` only if the simulation passes

#### 6. (Optional) Frontend Components

* Grid strategy input UI (e.g., `GridForm.tsx`)
* Order state visualization (`GridDashboard.tsx`)
* Execution status and logs

---

### Tech Stack

* **Solidity** (GridHook, AggregatorMock)
* **Hardhat** for local dev + deployment
* **TypeScript + Ethers v6**
* **1inch SDK** for order generation and signing
* **Chainlink Oracle Interface**

---

### Local Workflow

1. Start a local Hardhat node:

   ```bash
   npx hardhat node
   ```

2. Deploy contracts:

   ```bash
   npx hardhat run scripts/deployMockAggregator.ts --network localhost
   npx hardhat run scripts/deployGridHook.ts --network localhost
   npx hardhat run scripts/deployLimitOrderProtocol.ts --network localhost
   ```

3. Generate grid orders:

   ```bash
   npx ts-node scripts/generateGridOrders.ts
   ```

4. Match orders:

   ```bash
   npx ts-node scripts/fillOrder.ts
   ```

---

### Highlights

* Fully on-chain order matching with price range enforcement
* Reusable hook mechanism via 1inch `interactions`
* End-to-end simulation and execution
* Oracle-independent architecture (mocked or real)
* Developer-friendly CLI tooling

