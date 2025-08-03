import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface Create3MockInterface extends Interface {
    getFunction(nameOrSignature: "addressOf" | "deploy"): FunctionFragment;
    encodeFunctionData(functionFragment: "addressOf", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "deploy", values: [BytesLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "addressOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
}
export interface Create3Mock extends BaseContract {
    connect(runner?: ContractRunner | null): Create3Mock;
    waitForDeployment(): Promise<this>;
    interface: Create3MockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    addressOf: TypedContractMethod<[salt: BytesLike], [string], "view">;
    deploy: TypedContractMethod<[
        salt: BytesLike,
        code: BytesLike
    ], [
        string
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "addressOf"): TypedContractMethod<[salt: BytesLike], [string], "view">;
    getFunction(nameOrSignature: "deploy"): TypedContractMethod<[
        salt: BytesLike,
        code: BytesLike
    ], [
        string
    ], "nonpayable">;
    filters: {};
}
