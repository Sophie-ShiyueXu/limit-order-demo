import { Wallet } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
/**
 * Enum defining types of nonces.
 */
export declare enum NonceType {
    Account = 0,// Nonce for account
    Selector = 1,// Nonce for selector
    Unique = 2,// Nonce for unique
    Invalid = 3
}
/**
 * Builds traits for {bySig} contract by combining params.
 * @param params An object containing the following properties:
 * - `nonceType` The type of nonce to use. Default is `NonceType.Account`.
 * - `deadline` The deadline for the message. Default is `0`.
 * - `relayer` The relayer address. Default is the zero address.
 * - `nonce` The nonce. Default is `0`.
 * @returns A bigint representing the combined traits.
 * @throws Error if provided with invalid parameters.
 */
export declare function buildBySigTraits({ nonceType, deadline, relayer, nonce, }?: {
    nonceType?: NonceType | undefined;
    deadline?: number | undefined;
    relayer?: string | undefined;
    nonce?: number | undefined;
}): bigint;
export interface SignedCallStruct {
    traits: bigint;
    data: string;
}
/**
 * Computes the EIP-712 hash for a given bySig call.
 * @param name The user readable name of EIP-712 domain.
 * @param version The version of the EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param verifyingContract The Ethereum address of the contract that will verify the signature. This ties the signature to a specific contract.
 * @param sig The data to be signed.
 * @returns The EIP-712 hash of the fully encoded data.
 */
export declare function hashBySig(name: string, version: string, chainId: bigint, verifyingContract: string, sig: SignedCallStruct): string;
/**
 * Signs a given data for {bySig} contract call using EIP-712 standard.
 * @param name The user readable name of EIP-712 domain.
 * @param version The version of the EIP-712 domain.
 * @param chainId The unique identifier for the blockchain network.
 * @param verifyingContract The Ethereum address of the contract that will verify the signature. This ties the signature to a specific contract.
 * @param signer The wallet or signer to sign the data.
 * @param signedCall The call data to be signed, consisting of traits and data.
 * @returns A Promise that resolves to the signature.
 */
export declare function signSignedCall(name: string, version: string, chainId: bigint | string, verifyingContract: string, signer: Wallet | SignerWithAddress, signedCall: SignedCallStruct): Promise<string>;
