import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface AddressArrayMockInterface extends Interface {
    getFunction(nameOrSignature: "at" | "erase" | "get" | "getAndProvideArr" | "length" | "pop" | "push" | "set" | "unsafeAt"): FunctionFragment;
    encodeFunctionData(functionFragment: "at", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "erase", values?: undefined): string;
    encodeFunctionData(functionFragment: "get", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAndProvideArr", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "length", values?: undefined): string;
    encodeFunctionData(functionFragment: "pop", values?: undefined): string;
    encodeFunctionData(functionFragment: "push", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "set", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "unsafeAt", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "at", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAndProvideArr", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "length", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pop", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "push", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "set", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unsafeAt", data: BytesLike): Result;
}
export interface AddressArrayMock extends BaseContract {
    connect(runner?: ContractRunner | null): AddressArrayMock;
    waitForDeployment(): Promise<this>;
    interface: AddressArrayMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    at: TypedContractMethod<[i: BigNumberish], [string], "view">;
    erase: TypedContractMethod<[], [void], "nonpayable">;
    get: TypedContractMethod<[], [string[]], "view">;
    getAndProvideArr: TypedContractMethod<[
        providedArr: AddressLike[]
    ], [
        [string[], string[]]
    ], "view">;
    length: TypedContractMethod<[], [bigint], "view">;
    pop: TypedContractMethod<[], [void], "nonpayable">;
    push: TypedContractMethod<[account: AddressLike], [bigint], "nonpayable">;
    set: TypedContractMethod<[
        index: BigNumberish,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    unsafeAt: TypedContractMethod<[i: BigNumberish], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "at"): TypedContractMethod<[i: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "erase"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "get"): TypedContractMethod<[], [string[]], "view">;
    getFunction(nameOrSignature: "getAndProvideArr"): TypedContractMethod<[
        providedArr: AddressLike[]
    ], [
        [string[], string[]]
    ], "view">;
    getFunction(nameOrSignature: "length"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "pop"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "push"): TypedContractMethod<[account: AddressLike], [bigint], "nonpayable">;
    getFunction(nameOrSignature: "set"): TypedContractMethod<[
        index: BigNumberish,
        account: AddressLike
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "unsafeAt"): TypedContractMethod<[i: BigNumberish], [string], "view">;
    filters: {};
}
