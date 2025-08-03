// contracts/TimeLockHook.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// 检查当前区块时间是否已经过了解锁时间。
// 如果没有到达，直接 revert，撮合交易会失败。
// 这个逻辑是核心：锁定订单直至指定时间生效。

contract TimeLockHook {
    function preInteraction(
        address,
        address,
        bytes calldata data
    ) external view {
        uint256 unlockTime = abi.decode(data, (uint256));
        require(block.timestamp >= unlockTime, "Time not reached yet");
    }
}
