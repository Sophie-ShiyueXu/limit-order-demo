import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../common";
export interface SelfdestructEthSenderMockInterface extends Interface {
    getFunction(nameOrSignature: "stopAndTransferBalance" | "transferBalance"): FunctionFragment;
    encodeFunctionData(functionFragment: "stopAndTransferBalance", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "transferBalance", values: [AddressLike]): string;
    decodeFunctionResult(functionFragment: "stopAndTransferBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferBalance", data: BytesLike): Result;
}
export interface SelfdestructEthSenderMock extends BaseContract {
    connect(runner?: ContractRunner | null): SelfdestructEthSenderMock;
    waitForDeployment(): Promise<this>;
    interface: SelfdestructEthSenderMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    stopAndTransferBalance: TypedContractMethod<[
        receiver: AddressLike
    ], [
        void
    ], "nonpayable">;
    transferBalance: TypedContractMethod<[
        receiver: AddressLike
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "stopAndTransferBalance"): TypedContractMethod<[receiver: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "transferBalance"): TypedContractMethod<[receiver: AddressLike], [void], "payable">;
    filters: {};
}
