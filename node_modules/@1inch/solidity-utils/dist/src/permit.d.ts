import { SignTypedDataVersion } from '@metamask/eth-sig-util';
import { Wallet } from 'ethers';
import '@nomicfoundation/hardhat-ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { DaiLikePermitMock, ERC20Permit, USDCLikePermitMock } from '../typechain-types';
export declare const TypedDataVersion = SignTypedDataVersion.V4;
export declare const defaultDeadline: bigint;
export declare const defaultDeadlinePermit2: bigint;
export declare const PERMIT2_ADDRESS_ZKSYNC = "0x0000000000225e31D15943971F47aD3022F714Fa";
export declare const EIP712Domain: {
    name: string;
    type: string;
}[];
export declare const Permit: {
    name: string;
    type: string;
}[];
export declare const DaiLikePermit: {
    name: string;
    type: string;
}[];
/**
 * @category permit
 * Removes the '0x' prefix from a string. If no '0x' prefix is found, returns the original string.
 * @param bigNumber The number (as a bigint or string) from which to remove the '0x' prefix.
 * @return The string without the '0x' prefix.
 */
export declare function trim0x(bigNumber: bigint | string): string;
/**
 * @category permit
 * Trims the method selector from transaction data, removing the first 8 characters (4 bytes of hexable string) after '0x' prefix.
 * @param data The transaction data string from which to trim the selector.
 * @return The trimmed selector string.
 */
export declare function cutSelector(data: string): string;
/**
 * @category permit
 * Generates a domain separator for EIP-712 structured data using the provided parameters.
 * @param name The user readable name of EIP-712 domain.
 * @param version The version of the EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param verifyingContract The Ethereum address of the contract that will verify the signature. This ties the signature to a specific contract.
 * @return The domain separator as a hex string.
 */
export declare function domainSeparator(name: string, version: string, chainId: string, verifyingContract: string): string;
/**
 * @category permit
 * Constructs structured data for EIP-2612 permit function, including types, domain, and message with details about the permit.
 * @param name The user readable name of signing EIP-712 domain
 * @param version The version of the signing EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param verifyingContract The Ethereum address of the contract that will verify the signature. This ties the signature to a specific contract.
 * @param owner The Ethereum address of the token owner granting permission to spend tokens on their behalf.
 * @param spender The Ethereum address of the party being granted permission to spend tokens on behalf of the owner.
 * @param value The amount of tokens the spender is permitted to spend.
 * @param nonce An arbitrary number used once to prevent replay attacks. Typically, this is the number of transactions sent by the owner.
 * @param deadline The timestamp until which the permit is valid. This provides a window of time in which the permit can be used.
 */
export declare function buildData(name: string, version: string, chainId: number, verifyingContract: string, owner: string, spender: string, value: string, nonce: string, deadline?: string): {
    readonly types: {
        readonly Permit: {
            name: string;
            type: string;
        }[];
    };
    readonly domain: {
        readonly name: string;
        readonly version: string;
        readonly chainId: number;
        readonly verifyingContract: string;
    };
    readonly message: {
        readonly owner: string;
        readonly spender: string;
        readonly value: string;
        readonly nonce: string;
        readonly deadline: string;
    };
};
/**
 * @category permit
 * Prepares structured data similar to the Dai permit function, including types, domain, and message with permit details.
 * @param name The user readable name of signing EIP-712 domain
 * @param version The version of the signing EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param verifyingContract The Ethereum address of the contract that will verify the signature. This ties the signature to a specific contract.
 * @param holder The address of the token holder who is giving permission, establishing the source of the funds.
 * @param spender The address allowed to spend tokens on behalf of the holder, essentially the recipient of the permit.
 * @param nonce An arbitrary number used once to prevent replay attacks. Typically, this is the number of transactions sent by the owner.
 * @param allowed A boolean indicating whether the spender is allowed to spend the tokens, providing a clear permit status.
 * @param expiry The time until which the permit is valid, offering a window during which the spender can use the permit.
 * @return Structured data prepared for a Dai-like permit function.
 */
export declare function buildDataLikeDai(name: string, version: string, chainId: number, verifyingContract: string, holder: string, spender: string, nonce: string, allowed: boolean, expiry?: string): {
    readonly types: {
        readonly Permit: {
            name: string;
            type: string;
        }[];
    };
    readonly domain: {
        readonly name: string;
        readonly version: string;
        readonly chainId: number;
        readonly verifyingContract: string;
    };
    readonly message: {
        readonly holder: string;
        readonly spender: string;
        readonly nonce: string;
        readonly expiry: string;
        readonly allowed: boolean;
    };
};
/**
 * @category permit
 * Returns the Permit2 contract address for the specified chain.
 * @param chainId The ID of the blockchain network (optional).
 * @return The corresponding Permit2 address.
 */
export declare function permit2Address(chainId?: number): string;
/**
 * @category permit
 * Ensures contract code is set for a given address and returns a contract instance.
 * @param chainId The ID of the blockchain network (optional).
 * @return The contract instance of IPermit2.
 */
export declare function permit2Contract(chainId?: number): Promise<import("ethers").Contract>;
/**
 * @category permit
 * Generates a permit signature for ERC20 tokens with EIP-2612 standard.
 * @param owner The wallet or signer issuing the permit.
 * @param permitContract The contract object with ERC20Permit type and token address for which the permit creating.
 * @param tokenVersion The version of the token's EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param spender The address allowed to spend the tokens.
 * @param value The amount of tokens the spender is allowed to use.
 * @param deadline Time until when the permit is valid.
 * @param compact Indicates if the permit should be compressed.
 * @return A signed permit string.
 */
export declare function getPermit(owner: Wallet | SignerWithAddress, permitContract: ERC20Permit, tokenVersion: string, chainId: number, spender: string, value: string, deadline?: string, compact?: boolean): Promise<string>;
/**
 * @category permit
 * Creates a permit for spending tokens on Permit2 standard contracts.
 * @param owner The wallet or signer issuing the permit.
 * @param token The address of the token for which the permit is creates.
 * @param chainId The unique identifier for the blockchain network.
 * @param spender The address allowed to spend the tokens.
 * @param amount The amount of tokens the spender is allowed to use.
 * @param compact Indicates if the permit should be compressed.
 * @param expiration The time until when the permit is valid for Permit2.
 * @param sigDeadline Deadline for the signature to be considered valid.
 * @return A signed permit string specific to Permit2 contracts.
 */
export declare function getPermit2(owner: Wallet | SignerWithAddress, token: string, chainId: number, spender: string, amount: bigint, compact?: boolean, expiration?: bigint, sigDeadline?: bigint): Promise<string>;
/**
 * @category permit
 * Generates a Dai-like permit signature for tokens.
 * @param holder The wallet or signer issuing the permit.
 * @param permitContract The contract object with ERC20PermitLikeDai type and token address for which the permit creating.
 * @param tokenVersion The version of the token's EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param spender The address allowed to spend the tokens.
 * @param allowed Boolean indicating whether the spender is allowed to spend.
 * @param expiry Time until when the permit is valid.
 * @param compact Indicates if the permit should be compressed.
 * @return A signed permit string in Dai-like format.
 */
export declare function getPermitLikeDai(holder: Wallet | SignerWithAddress, permitContract: DaiLikePermitMock, tokenVersion: string, chainId: number, spender: string, allowed: boolean, expiry?: string, compact?: boolean): Promise<string>;
/**
 * @category permit
 * Generates a ERC-7597 permit signature for tokens.
 * @param owner Contract with isValidSignature function.
 * @param signer The wallet or signer issuing the permit.
 * @param permitContract The contract object with ERC7597Permit type and token address for which the permit creating.
 * @param tokenVersion The version of the token's EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param spender The address allowed to spend the tokens.
 * @param value The amount of tokens the spender is allowed to use.
 * @param deadline Time until when the permit is valid.
 * @return A signed permit string in ERC7597Permit format.
 */
export declare function getPermitLikeUSDC(owner: string, signer: Wallet | SignerWithAddress, permitContract: USDCLikePermitMock, tokenVersion: string, chainId: number, spender: string, value: string, deadline?: string): Promise<string>;
/**
 * @category permit
 * Concatenates a target address with data, trimming the '0x' prefix from the data.
 * @param target The target address or value to prepend.
 * @param data The data string to be concatenated after trimming.
 * @return A concatenated string of target and data.
 */
export declare function withTarget(target: bigint | string, data: bigint | string): string;
/**
 * @category permit
 * Compresses a permit function call to a shorter format based on its type.
 *   Type         | EIP-2612 | DAI | Permit2
 *   Uncompressed |    224   | 256 | 352
 *   Compressed   |    100   |  72 | 96
 * @param permit The full permit function call string.
 * @return A compressed permit string.
 */
export declare function compressPermit(permit: string): string;
/**
 * @category permit
 * Decompresses a compressed permit function call back to its original full format.
 * @param permit The compressed permit function call string.
 * @param token The token address involved in the permit (for Permit2 type).
 * @param owner The owner address involved in the permit.
 * @param spender The spender address involved in the permit.
 * @return The decompressed permit function call string.
 */
export declare function decompressPermit(permit: string, token: string, owner: string, spender: string): string;
