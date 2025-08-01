// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LimitOrderTest {
    event OrderFilled(address indexed user, uint256 amount, uint256 price);

    function fillLimitOrder(
        address user,
        uint256 amount,
        uint256 price
    ) public {
        emit OrderFilled(user, amount, price);
    }
}
