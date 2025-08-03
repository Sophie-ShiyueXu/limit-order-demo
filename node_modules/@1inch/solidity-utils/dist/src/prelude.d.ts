import { time } from '@nomicfoundation/hardhat-network-helpers';
export declare const constants: {
    readonly ZERO_ADDRESS: "0x0000000000000000000000000000000000000000";
    readonly EEE_ADDRESS: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    readonly ZERO_BYTES32: "0x0000000000000000000000000000000000000000000000000000000000000000";
    readonly MAX_UINT256: bigint;
    readonly MAX_INT256: bigint;
    readonly MAX_UINT48: bigint;
    readonly MIN_INT256: bigint;
    readonly MAX_UINT128: bigint;
    readonly MAX_UINT32: bigint;
    readonly DEV_CHAINS: string[];
};
export { time };
/**
 * @category prelude
 * Converts an Ether amount represented as a string into its Wei equivalent as a bigint.
 * @param n The amount of Ether to convert, specified as a string.
 * @return The equivalent amount in Wei as a bigint.
 */
export declare function ether(n: string): bigint;
