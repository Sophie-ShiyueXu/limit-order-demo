import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
export interface PermitAndCallMockInterface extends Interface {
    getFunction(nameOrSignature: "foo" | "payableFoo" | "permitAndCall"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "FooCalled" | "MsgValue"): EventFragment;
    encodeFunctionData(functionFragment: "foo", values?: undefined): string;
    encodeFunctionData(functionFragment: "payableFoo", values?: undefined): string;
    encodeFunctionData(functionFragment: "permitAndCall", values: [BytesLike, BytesLike]): string;
    decodeFunctionResult(functionFragment: "foo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "payableFoo", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "permitAndCall", data: BytesLike): Result;
}
export declare namespace FooCalledEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace MsgValueEvent {
    type InputTuple = [value: BigNumberish];
    type OutputTuple = [value: bigint];
    interface OutputObject {
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface PermitAndCallMock extends BaseContract {
    connect(runner?: ContractRunner | null): PermitAndCallMock;
    waitForDeployment(): Promise<this>;
    interface: PermitAndCallMockInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    foo: TypedContractMethod<[], [void], "nonpayable">;
    payableFoo: TypedContractMethod<[], [void], "payable">;
    permitAndCall: TypedContractMethod<[
        permit: BytesLike,
        action: BytesLike
    ], [
        void
    ], "payable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "foo"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "payableFoo"): TypedContractMethod<[], [void], "payable">;
    getFunction(nameOrSignature: "permitAndCall"): TypedContractMethod<[
        permit: BytesLike,
        action: BytesLike
    ], [
        void
    ], "payable">;
    getEvent(key: "FooCalled"): TypedContractEvent<FooCalledEvent.InputTuple, FooCalledEvent.OutputTuple, FooCalledEvent.OutputObject>;
    getEvent(key: "MsgValue"): TypedContractEvent<MsgValueEvent.InputTuple, MsgValueEvent.OutputTuple, MsgValueEvent.OutputObject>;
    filters: {
        "FooCalled()": TypedContractEvent<FooCalledEvent.InputTuple, FooCalledEvent.OutputTuple, FooCalledEvent.OutputObject>;
        FooCalled: TypedContractEvent<FooCalledEvent.InputTuple, FooCalledEvent.OutputTuple, FooCalledEvent.OutputObject>;
        "MsgValue(uint256)": TypedContractEvent<MsgValueEvent.InputTuple, MsgValueEvent.OutputTuple, MsgValueEvent.OutputObject>;
        MsgValue: TypedContractEvent<MsgValueEvent.InputTuple, MsgValueEvent.OutputTuple, MsgValueEvent.OutputObject>;
    };
}
