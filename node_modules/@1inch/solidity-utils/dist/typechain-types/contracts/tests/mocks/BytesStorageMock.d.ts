import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace BytesStorage {
    type SliceStruct = {
        slot: BigNumberish;
        offset: BigNumberish;
        length: BigNumberish;
    };
    type SliceStructOutput = [
        slot: bigint,
        offset: bigint,
        length: bigint
    ] & {
        slot: bigint;
        offset: bigint;
        length: bigint;
    };
}
export interface BytesStorageMockInterface extends Interface {
    getFunction(nameOrSignature: "setData" | "wrap" | "wrapAndCopy" | "wrapAndSlice" | "wrapWithSliceAndCopy"): FunctionFragment;
    encodeFunctionData(functionFragment: "setData", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "wrap", values?: undefined): string;
    encodeFunctionData(functionFragment: "wrapAndCopy", values?: undefined): string;
    encodeFunctionData(functionFragment: "wrapAndSlice", values: [BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrapWithSliceAndCopy", values: [BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "setData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapAndCopy", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapAndSlice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapWithSliceAndCopy", data: BytesLike): Result;
}
export interface BytesStorageMock extends BaseContract {
    connect(runner?: ContractRunner | null): BytesStorageMock;
    waitForDeployment(): Promise<this>;
    interface: BytesStorageMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    setData: TypedContractMethod<[data: BytesLike], [void], "nonpayable">;
    wrap: TypedContractMethod<[], [BytesStorage.SliceStructOutput], "view">;
    wrapAndCopy: TypedContractMethod<[], [string], "view">;
    wrapAndSlice: TypedContractMethod<[
        offset: BigNumberish,
        size: BigNumberish
    ], [
        BytesStorage.SliceStructOutput
    ], "view">;
    wrapWithSliceAndCopy: TypedContractMethod<[
        offset: BigNumberish,
        size: BigNumberish
    ], [
        string
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "setData"): TypedContractMethod<[data: BytesLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "wrap"): TypedContractMethod<[], [BytesStorage.SliceStructOutput], "view">;
    getFunction(nameOrSignature: "wrapAndCopy"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "wrapAndSlice"): TypedContractMethod<[
        offset: BigNumberish,
        size: BigNumberish
    ], [
        BytesStorage.SliceStructOutput
    ], "view">;
    getFunction(nameOrSignature: "wrapWithSliceAndCopy"): TypedContractMethod<[
        offset: BigNumberish,
        size: BigNumberish
    ], [
        string
    ], "view">;
    filters: {};
}
