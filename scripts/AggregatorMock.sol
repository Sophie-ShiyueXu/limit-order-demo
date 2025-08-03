// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title AggregatorMock - 可设置任意价格和小数位，模拟 Chainlink Aggregator
contract AggregatorMock {
    int256 private _answer;
    uint8 private immutable _decimals;

    constructor(int256 initialAnswer, uint8 decimals_) {
        _answer = initialAnswer;
        _decimals = decimals_;
    }

    function setLatestAnswer(int256 newAnswer) external {
        _answer = newAnswer;
    }

    function latestAnswer() external view returns (int256) {
        return _answer;
    }

    function decimals() external view returns (uint8) {
        return _decimals;
    }
}
