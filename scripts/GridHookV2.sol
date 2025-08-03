// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IChainlinkAggregator {
    function latestAnswer() external view returns (int256);
}

contract GridHookV2 {
    error PriceNotInRange(int256 price, int256 lowerBound, int256 upperBound);
    error AggregatorCallFailed();

    function preInteraction(address, address, bytes calldata data) external view {
        (address feed, int256 lower, int256 upper) = abi.decode(data, (address, int256, int256));
        revert("GridHookV2 reached");
        int256 price;

        try IChainlinkAggregator(feed).latestAnswer() returns (int256 p) {
            price = p;
        } catch {
            revert AggregatorCallFailed();
        }

        if (price < lower || price > upper) {
            revert PriceNotInRange(price, lower, upper);
        }
    }
}
