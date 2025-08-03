import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface AddressSetMockInterface extends Interface {
    getFunction(nameOrSignature: "add" | "at" | "contains" | "erase" | "get" | "getAndProvideSet" | "length" | "remove" | "unsafeAt"): FunctionFragment;
    encodeFunctionData(functionFragment: "add", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "at", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "contains", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "erase", values?: undefined): string;
    encodeFunctionData(functionFragment: "get", values?: undefined): string;
    encodeFunctionData(functionFragment: "getAndProvideSet", values: [AddressLike[]]): string;
    encodeFunctionData(functionFragment: "length", values?: undefined): string;
    encodeFunctionData(functionFragment: "remove", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "unsafeAt", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "add", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "at", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "contains", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "erase", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "get", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAndProvideSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "length", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "remove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unsafeAt", data: BytesLike): Result;
}
export interface AddressSetMock extends BaseContract {
    connect(runner?: ContractRunner | null): AddressSetMock;
    waitForDeployment(): Promise<this>;
    interface: AddressSetMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    add: TypedContractMethod<[item: AddressLike], [boolean], "nonpayable">;
    at: TypedContractMethod<[index: BigNumberish], [string], "view">;
    contains: TypedContractMethod<[item: AddressLike], [boolean], "view">;
    erase: TypedContractMethod<[], [void], "nonpayable">;
    get: TypedContractMethod<[], [string[]], "view">;
    getAndProvideSet: TypedContractMethod<[
        providedArr: AddressLike[]
    ], [
        [string[], string[]]
    ], "view">;
    length: TypedContractMethod<[], [bigint], "view">;
    remove: TypedContractMethod<[item: AddressLike], [boolean], "nonpayable">;
    unsafeAt: TypedContractMethod<[index: BigNumberish], [string], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "add"): TypedContractMethod<[item: AddressLike], [boolean], "nonpayable">;
    getFunction(nameOrSignature: "at"): TypedContractMethod<[index: BigNumberish], [string], "view">;
    getFunction(nameOrSignature: "contains"): TypedContractMethod<[item: AddressLike], [boolean], "view">;
    getFunction(nameOrSignature: "erase"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "get"): TypedContractMethod<[], [string[]], "view">;
    getFunction(nameOrSignature: "getAndProvideSet"): TypedContractMethod<[
        providedArr: AddressLike[]
    ], [
        [string[], string[]]
    ], "view">;
    getFunction(nameOrSignature: "length"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "remove"): TypedContractMethod<[item: AddressLike], [boolean], "nonpayable">;
    getFunction(nameOrSignature: "unsafeAt"): TypedContractMethod<[index: BigNumberish], [string], "view">;
    filters: {};
}
