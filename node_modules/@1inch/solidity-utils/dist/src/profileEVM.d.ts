import { PathLike, promises as fs } from 'fs';
import { JsonRpcProvider } from 'ethers';
/**
 * @category profileEVM
 * Default configuration options for the `gasspectEVM` function to analyze gas usage in EVM transactions.
 * @property minOpGasCost The minimal gas cost of operations to be returned in the analysis. Defaults to 300, filtering out less costly operations for clarity.
 * @property args Boolean indicating whether to return the arguments of each operation in the analysis. Defaults to `false`, omitting arguments for simplicity.
 * @property res Boolean indicating whether to return the results of each operation in the analysis. Defaults to `false`, omitting results to focus on gas usage.
 */
export declare const gasspectOptionsDefault: {
    minOpGasCost: number;
    args: boolean;
    res: boolean;
};
/**
 * @category profileEVM
 * Profiles EVM execution by counting occurrences of specified instructions in a transaction's execution trace.
 * @param provider An Ethereum provider capable of sending custom RPC requests.
 * @param txHash The hash of the transaction to profile.
 * @param instruction An array of EVM instructions (opcodes) to count within the transaction's execution trace.
 * @param optionalTraceFile An optional file path or handle where the full transaction trace will be saved.
 * @return An array of numbers representing the counts of each instruction specified, in the order they were provided.
 */
export declare function profileEVM(provider: JsonRpcProvider | {
    send: (method: string, params: unknown[]) => Promise<any>;
}, txHash: string, instruction: string[], optionalTraceFile?: PathLike | fs.FileHandle): Promise<number[]>;
/**
 * @category profileEVM
 * Performs gas analysis on EVM transactions, highlighting operations that exceed a specified gas cost.
 * Analyzes gas usage by operations within a transaction, applying filters and formatting based on options.
 * @param provider The Ethereum JSON RPC provider or any custom provider with a `send` method.
 * @param txHash Transaction hash to analyze.
 * @param gasspectOptions Analysis configuration, specifying filters and formatting for gas analysis. See `gasspectOptionsDefault` for default values.
 * @param optionalTraceFile Optional path or handle to save the detailed transaction trace.
 * @return A detailed string array of operations meeting the criteria set in `gasspectOptions`.
 */
export declare function gasspectEVM(provider: JsonRpcProvider | {
    send: (method: string, params: unknown[]) => Promise<any>;
}, txHash: string, gasspectOptions?: Record<string, unknown>, optionalTraceFile?: PathLike | fs.FileHandle): Promise<string[]>;
