import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export declare namespace BytesMemory {
    type SliceStruct = {
        pointer: BigNumberish;
        length: BigNumberish;
    };
    type SliceStructOutput = [pointer: bigint, length: bigint] & {
        pointer: bigint;
        length: bigint;
    };
}
export interface BytesMemoryMockInterface extends Interface {
    getFunction(nameOrSignature: "slice" | "wrap" | "wrapAndUnwrap" | "wrapWithNonDefaultPointer" | "wrapWithNonDefaultPointerAndUnwrap" | "wrapWithSliceAndUnwrap"): FunctionFragment;
    encodeFunctionData(functionFragment: "slice", values: [BytesMemory.SliceStruct, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrap", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "wrapAndUnwrap", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "wrapWithNonDefaultPointer", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrapWithNonDefaultPointerAndUnwrap", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrapWithSliceAndUnwrap", values: [BytesLike, BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "slice", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapAndUnwrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapWithNonDefaultPointer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapWithNonDefaultPointerAndUnwrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapWithSliceAndUnwrap", data: BytesLike): Result;
}
export interface BytesMemoryMock extends BaseContract {
    connect(runner?: ContractRunner | null): BytesMemoryMock;
    waitForDeployment(): Promise<this>;
    interface: BytesMemoryMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    slice: TypedContractMethod<[
        data: BytesMemory.SliceStruct,
        offset: BigNumberish,
        size: BigNumberish
    ], [
        BytesMemory.SliceStructOutput
    ], "view">;
    wrap: TypedContractMethod<[
        data: BytesLike
    ], [
        BytesMemory.SliceStructOutput
    ], "view">;
    wrapAndUnwrap: TypedContractMethod<[data: BytesLike], [string], "view">;
    wrapWithNonDefaultPointer: TypedContractMethod<[
        data: BytesLike,
        n: BigNumberish
    ], [
        BytesMemory.SliceStructOutput
    ], "view">;
    wrapWithNonDefaultPointerAndUnwrap: TypedContractMethod<[
        data: BytesLike,
        n: BigNumberish
    ], [
        string
    ], "view">;
    wrapWithSliceAndUnwrap: TypedContractMethod<[
        data: BytesLike,
        offset: BigNumberish,
        size: BigNumberish
    ], [
        string
    ], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "slice"): TypedContractMethod<[
        data: BytesMemory.SliceStruct,
        offset: BigNumberish,
        size: BigNumberish
    ], [
        BytesMemory.SliceStructOutput
    ], "view">;
    getFunction(nameOrSignature: "wrap"): TypedContractMethod<[
        data: BytesLike
    ], [
        BytesMemory.SliceStructOutput
    ], "view">;
    getFunction(nameOrSignature: "wrapAndUnwrap"): TypedContractMethod<[data: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "wrapWithNonDefaultPointer"): TypedContractMethod<[
        data: BytesLike,
        n: BigNumberish
    ], [
        BytesMemory.SliceStructOutput
    ], "view">;
    getFunction(nameOrSignature: "wrapWithNonDefaultPointerAndUnwrap"): TypedContractMethod<[data: BytesLike, n: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "wrapWithSliceAndUnwrap"): TypedContractMethod<[
        data: BytesLike,
        offset: BigNumberish,
        size: BigNumberish
    ], [
        string
    ], "view">;
    filters: {};
}
