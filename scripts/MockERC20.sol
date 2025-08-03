// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public immutable decimals;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _supply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _supply * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "insufficient");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}
