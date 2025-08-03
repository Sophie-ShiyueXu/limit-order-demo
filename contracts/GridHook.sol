// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IChainlinkAggregator {
    function latestAnswer() external view returns (int256);
}

/// @title GridHook - 用于验证当前价格是否落在给定区间
contract GridHook {
    error PriceNotInRange(int256 price, int256 lowerBound, int256 upperBound);

    /// @notice 将会被 Limit Order Protocol 的 interaction 调用
    /// @param data 编码为 abi.encode(address priceFeed, int256 lower, int256 upper)
    function preInteraction(
        address, // maker
        address, // taker
        bytes calldata data
    ) external view {
        (address priceFeed, int256 lower, int256 upper) =
            abi.decode(data, (address, int256, int256));

        int256 price = IChainlinkAggregator(priceFeed).latestAnswer();

        if (price < lower || price > upper) {
            revert PriceNotInRange(price, lower, upper);
        }
    }
}
