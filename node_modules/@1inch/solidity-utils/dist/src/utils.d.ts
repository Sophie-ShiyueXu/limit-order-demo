import '@nomicfoundation/hardhat-ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { BaseContract, BigNumberish, BytesLike, Contract, ContractTransactionReceipt, ContractTransactionResponse, JsonRpcProvider, Signer, Wallet } from 'ethers';
import { DeploymentsExtension } from 'hardhat-deploy/types';
import { constants } from './prelude';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
/**
 * @category utils
 * Options for deployment methods.
 * @param contractName Name of the contract to deploy.
 * @param constructorArgs Arguments for the contract's constructor.
 * @param deployments Deployment facilitator object from Hardhat.
 * @param deployer Wallet deploying the contract.
 * @param deploymentName Optional custom name for deployment.
 * @param skipVerify Skips Etherscan verification if true.
 * @param skipIfAlreadyDeployed Avoids redeployment if contract already deployed.
 * @param gasPrice Gas strategy option.
 * @param maxPriorityFeePerGas Gas strategy option.
 * @param maxFeePerGas Gas strategy option.
 * @param log Toggles deployment logging.
 * @param waitConfirmations Number of confirmations to wait based on network. Usually it's need for waiting before Etherscan verification.
 */
export interface DeployContractOptions {
    contractName: string;
    constructorArgs?: any[];
    deployments: DeploymentsExtension;
    deployer: string;
    deploymentName?: string;
    skipVerify?: boolean;
    skipIfAlreadyDeployed?: boolean;
    gasPrice?: bigint;
    maxPriorityFeePerGas?: bigint;
    maxFeePerGas?: bigint;
    log?: boolean;
    waitConfirmations?: number;
}
/**
 * @category utils
 * Options for deployment methods with create3. This is an extension of DeployContractOptions without `deployer` and `skipIfAlreadyDeployed`.
 * @param txSigner Signer object to sign the deployment transaction.
 * @param create3Deployer Address of the create3 deployer contract, which related to `contracts/interfaces/ICreate3Deployer.sol`.
 * @param salt Salt value for create3 deployment.
 */
export interface DeployContractOptionsWithCreate3 extends Omit<DeployContractOptions, 'deployer'> {
    txSigner?: Wallet | SignerWithAddress;
    create3Deployer: string;
    salt: string;
}
/**
 * @category utils
 * Deploys a contract with optional Etherscan verification.
 * @param options Deployment options. Default values:
 *    - constructorArgs: []
 *    - deploymentName: contractName
 *    - skipVerify: false
 *    - skipIfAlreadyDeployed: true
 *    - log: true
 *    - waitConfirmations: 1 on dev chains, 6 on others
 * @returns The deployed contract instance.
 */
export declare function deployAndGetContract(options: DeployContractOptions): Promise<Contract>;
/**
 * @category utils
 * Deploys a contract using create3 and saves the deployment information.
 * @param options Deployment options. Default values:
 *    - constructorArgs: []
 *    - txSigner: first signer in the environment
 *    - deploymentName: contractName
 *    - skipVerify: false
 *    - skipIfAlreadyDeployed: true
 *    - waitConfirmations: 1 on dev chains, 6 on others
 * @returns The deployed contract instance.
 */
export declare function deployAndGetContractWithCreate3(options: DeployContractOptionsWithCreate3): Promise<Contract>;
/**
 * @category utils
 * Saves the deployment information using the deploy transaction hash.
 * @param provider JSON RPC provider or Hardhat Ethers Provider.
 * @param deployments Deployment facilitator object from Hardhat.
 * @param contractName Name of the contract to deploy.
 * @param deploymentName Optional custom name for deployment.
 * @param constructorArgs Arguments for the contract's constructor.
 * @param salt Salt value for create3 deployment.
 * @param create3Deployer Address of the create3 deployer contract.
 * @param deployTxHash Transaction hash of the create3 deployment.
 * @param skipVerify Skips Etherscan verification if true.
 * @returns The deployed contract instance.
 */
export declare function saveContractWithCreate3Deployment(provider: JsonRpcProvider | HardhatEthersProvider, deployments: DeploymentsExtension, contractName: string, deploymentName: string, constructorArgs: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
salt: string, create3Deployer: string, deployTxHash: string, skipVerify?: boolean): Promise<Contract>;
/**
 * @category utils
 * Advances the blockchain time to a specific timestamp for testing purposes.
 * @param seconds Target time in seconds or string format to increase to.
 */
export declare function timeIncreaseTo(seconds: number | string): Promise<void>;
/**
 * @category utils
 * Deploys a contract given a name and optional constructor parameters.
 * @param name The contract name.
 * @param parameters Constructor parameters for the contract.
 * @returns The deployed contract instance.
 */
export declare function deployContract(name: string, parameters?: Array<BigNumberish>): Promise<BaseContract>;
/**
 * @category utils
 * Deploys a contract from bytecode, useful for testing and deployment of minimal proxies.
 * @param abi Contract ABI.
 * @param bytecode Contract bytecode.
 * @param parameters Constructor parameters.
 * @param signer Optional signer object.
 * @returns The deployed contract instance.
 */
export declare function deployContractFromBytecode(abi: any[], bytecode: BytesLike, parameters?: Array<BigNumberish>, signer?: Signer): Promise<BaseContract>;
/**
 * @category utils
 * Represents the interface for a token, providing methods to fetch its balance and address.
 * This type is used in `trackReceivedTokenAndTx` method.
 * @param balanceOf Method which retrieves the balance of the specified address.
 * @param getAddress Method which retrieves the token contract's address.
 */
export type Token = {
    balanceOf: (address: string) => Promise<bigint>;
    getAddress: () => Promise<string>;
};
/**
 * @category utils
 * Represents a tuple containing a token quantity and either a transaction receipt or a recursive instance of the same tuple type.
 * This type is used in `trackReceivedTokenAndTx` method to track token transfers and their transaction receipts in a nested structure,
 * allowing for handling of complex scenarios like chained or batched transactions and tracking several tokens.
 *  - `result[0]`: The amount of the token received.
 *  - `result[1]`: The transaction receipt or another nested token tracking result.
 */
export type TrackReceivedTokenAndTxResult = [bigint, ContractTransactionReceipt | TrackReceivedTokenAndTxResult];
/**
 * @category utils
 * Tracks token balance changes and transaction receipts for specified wallet addresses during test scenarios.
 * It could be used recursively for multiple tokens via specific `txPromise` function.
 * @param provider JSON RPC provider or custom provider object.
 * @param token Token contract instance or ETH address constants.
 * @param wallet Wallet address to track.
 * @param txPromise Function returning a transaction promise.
 * @param args Arguments for the transaction promise function.
 * @returns Tuple of balance change and transaction receipt.
 */
export declare function trackReceivedTokenAndTx<T extends unknown[]>(provider: JsonRpcProvider | {
    getBalance: (address: string) => Promise<bigint>;
}, token: Token | {
    address: typeof constants.ZERO_ADDRESS;
} | {
    address: typeof constants.EEE_ADDRESS;
}, wallet: string, txPromise: (...args: T) => Promise<ContractTransactionResponse | TrackReceivedTokenAndTxResult>, ...args: T): Promise<TrackReceivedTokenAndTxResult>;
/**
 * @category utils
 * Corrects the ECDSA signature 'v' value according to Ethereum's standard.
 * @param signature The original signature string.
 * @returns The corrected signature string.
 */
export declare function fixSignature(signature: string): string;
/**
 * @category utils
 * Signs a message with a given signer and fixes the signature format.
 * @param signer Signer object or wallet instance.
 * @param messageHex The message to sign, in hex format.
 * @returns The signed message string.
 */
export declare function signMessage(signer: Wallet | {
    signMessage: (messageHex: string | Uint8Array) => Promise<string>;
}, messageHex?: string | Uint8Array): Promise<string>;
/**
 * @category utils
 * Counts the occurrences of specified EVM instructions in a transaction's execution trace.
 * @param provider JSON RPC provider or custom provider object.
 * @param txHash Transaction hash to analyze.
 * @param instructions Array of EVM instructions (opcodes) to count.
 * @returns Array of instruction counts.
 */
export declare function countInstructions(provider: JsonRpcProvider | {
    send: (method: string, params: unknown[]) => Promise<any>;
}, txHash: string, instructions: string[]): Promise<number[]>;
/**
 * @category utils
 * Retrieves the current USD price of ETH or another specified native token.
 * This helper function is designed for use in test environments to maintain stability against market fluctuations.
 * It fetches the current price of ETH (or a specified native token for side chains) in USD from the Coinbase API to
 * ensure that tests remain stable and unaffected by significant market price fluctuations when token price is
 * important part of test.
 * @param nativeTokenSymbol The symbol of the native token for which the price is being fetched, defaults to 'ETH'.
 * @return The price of the specified native token in USD, scaled by 1e18 to preserve precision.
 */
export declare function getEthPrice(nativeTokenSymbol?: string): Promise<bigint>;
/**
 * @category utils
 * Sets custom bytecode for local test accounts and returns them as signers.
 * This helper is intended for test environments (e.g., Hardhat) where deploying or modifying contract code
 * at known addresses is required. It allows setting the same or different bytecode for multiple accounts.
 *
 * Primarily useful for ensuring accounts start with empty code. For example, with the introduction of EIP-7702
 * on some networks, default accounts (like the first few returned by `ethers.getSigners()`) may already have
 * forwarding contracts deployed to them, which can break assumptions in tests.
 *
 * @param code A single bytecode (applied to all accounts) or an array of bytecodes (one per account). Defaults to '0x'.
 * @return A list of signers (accounts) with the specified code applied.
 */
export declare function getAccountsWithCode(code?: BytesLike | Array<BytesLike | undefined>): Promise<SignerWithAddress[]>;
