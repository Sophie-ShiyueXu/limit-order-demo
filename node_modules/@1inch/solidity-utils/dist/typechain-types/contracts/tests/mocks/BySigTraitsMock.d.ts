import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../common";
export interface BySigTraitsMockInterface extends Interface {
    getFunction(nameOrSignature: "deadline" | "isRelayerAllowed" | "nonce" | "nonceType"): FunctionFragment;
    encodeFunctionData(functionFragment: "deadline", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "isRelayerAllowed", values: [BigNumberish, AddressLike]): string;
    encodeFunctionData(functionFragment: "nonce", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "nonceType", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "deadline", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isRelayerAllowed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonceType", data: BytesLike): Result;
}
export interface BySigTraitsMock extends BaseContract {
    connect(runner?: ContractRunner | null): BySigTraitsMock;
    waitForDeployment(): Promise<this>;
    interface: BySigTraitsMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    deadline: TypedContractMethod<[traits: BigNumberish], [bigint], "view">;
    isRelayerAllowed: TypedContractMethod<[
        traits: BigNumberish,
        relayer: AddressLike
    ], [
        boolean
    ], "view">;
    nonce: TypedContractMethod<[traits: BigNumberish], [bigint], "view">;
    nonceType: TypedContractMethod<[traits: BigNumberish], [bigint], "view">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "deadline"): TypedContractMethod<[traits: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "isRelayerAllowed"): TypedContractMethod<[
        traits: BigNumberish,
        relayer: AddressLike
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "nonce"): TypedContractMethod<[traits: BigNumberish], [bigint], "view">;
    getFunction(nameOrSignature: "nonceType"): TypedContractMethod<[traits: BigNumberish], [bigint], "view">;
    filters: {};
}
