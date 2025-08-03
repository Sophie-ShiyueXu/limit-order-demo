import type { BaseContract, BytesLike, FunctionFragment, Result, Interface, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedListener, TypedContractMethod } from "../../../../common";
export interface RevertReasonForwarderMockInterface extends Interface {
    getFunction(nameOrSignature: "reReason" | "reRevert"): FunctionFragment;
    encodeFunctionData(functionFragment: "reReason", values?: undefined): string;
    encodeFunctionData(functionFragment: "reRevert", values?: undefined): string;
    decodeFunctionResult(functionFragment: "reReason", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "reRevert", data: BytesLike): Result;
}
export interface RevertReasonForwarderMock extends BaseContract {
    connect(runner?: ContractRunner | null): RevertReasonForwarderMock;
    waitForDeployment(): Promise<this>;
    interface: RevertReasonForwarderMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    reReason: TypedContractMethod<[], [string], "payable">;
    reRevert: TypedContractMethod<[], [void], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "reReason"): TypedContractMethod<[], [string], "payable">;
    getFunction(nameOrSignature: "reRevert"): TypedContractMethod<[], [void], "payable">;
    filters: {};
}
