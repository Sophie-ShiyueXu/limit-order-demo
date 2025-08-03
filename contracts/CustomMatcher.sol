// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITimeLockHook {
    function preInteraction(
        address taker,
        address maker,
        bytes calldata data
    ) external view;
}

interface ILimitOrderProtocol {
    function fillOrder(
        bytes calldata order,
        bytes calldata signature,
        uint256 makingAmount,
        bytes calldata interaction
    ) external payable returns (uint256, uint256);
}

contract CustomMatcher {
    address public immutable limitOrderProtocol;
    address public immutable hookContract;

    constructor(address _limitOrderProtocol, address _hookContract) {
        limitOrderProtocol = _limitOrderProtocol;
        hookContract = _hookContract;
    }

    function fillOrderWithHook(
        bytes calldata order,
        bytes calldata signature,
        uint256 makingAmount,
        bytes calldata interactionData
    ) external payable {
        ITimeLockHook(hookContract).preInteraction(
            msg.sender,
            extractMaker(order),
            interactionData
        );

        ILimitOrderProtocol(limitOrderProtocol).fillOrder(
            order,
            signature,
            makingAmount,
            interactionData
        );
    }

    function extractMaker(bytes calldata order) internal pure returns (address maker) {
        assembly {
            maker := calldataload(order.offset)
        }
    }
}
