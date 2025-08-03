import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../common";
export declare namespace BySig {
    type SignedCallStruct = {
        traits: BigNumberish;
        data: BytesLike;
    };
    type SignedCallStructOutput = [traits: bigint, data: string] & {
        traits: bigint;
        data: string;
    };
}
export interface BySigInterface extends Interface {
    getFunction(nameOrSignature: "SIGNED_CALL_TYPEHASH" | "bySig" | "bySigAccountNonces" | "bySigSelectorNonces" | "bySigUniqueNonces" | "bySigUniqueNoncesSlot" | "eip712Domain" | "hashBySig" | "sponsoredCall" | "useBySigAccountNonce" | "useBySigSelectorNonce" | "useBySigUniqueNonce"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "EIP712DomainChanged"): EventFragment;
    encodeFunctionData(functionFragment: "SIGNED_CALL_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "bySig", values: [AddressLike, BySig.SignedCallStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "bySigAccountNonces", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "bySigSelectorNonces", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "bySigUniqueNonces", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "bySigUniqueNoncesSlot", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
    encodeFunctionData(functionFragment: "hashBySig", values: [BySig.SignedCallStruct]): string;
    encodeFunctionData(functionFragment: "sponsoredCall", values: [AddressLike, BigNumberish, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "useBySigAccountNonce", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "useBySigSelectorNonce", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "useBySigUniqueNonce", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "SIGNED_CALL_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigAccountNonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigSelectorNonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigUniqueNonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigUniqueNoncesSlot", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashBySig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sponsoredCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "useBySigAccountNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "useBySigSelectorNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "useBySigUniqueNonce", data: BytesLike): Result;
}
export declare namespace EIP712DomainChangedEvent {
    type InputTuple = [];
    type OutputTuple = [];
    interface OutputObject {
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface BySig extends BaseContract {
    connect(runner?: ContractRunner | null): BySig;
    waitForDeployment(): Promise<this>;
    interface: BySigInterface;
    queryFilter<TCEvent extends TypedContractEvent>(event: TCEvent, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    queryFilter<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TypedEventLog<TCEvent>>>;
    on<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    on<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(event: TCEvent, listener: TypedListener<TCEvent>): Promise<this>;
    once<TCEvent extends TypedContractEvent>(filter: TypedDeferredTopicFilter<TCEvent>, listener: TypedListener<TCEvent>): Promise<this>;
    listeners<TCEvent extends TypedContractEvent>(event: TCEvent): Promise<Array<TypedListener<TCEvent>>>;
    listeners(eventName?: string): Promise<Array<Listener>>;
    removeAllListeners<TCEvent extends TypedContractEvent>(event?: TCEvent): Promise<this>;
    SIGNED_CALL_TYPEHASH: TypedContractMethod<[], [string], "view">;
    bySig: TypedContractMethod<[
        signer: AddressLike,
        sig: BySig.SignedCallStruct,
        signature: BytesLike
    ], [
        string
    ], "payable">;
    bySigAccountNonces: TypedContractMethod<[
        account: AddressLike
    ], [
        bigint
    ], "view">;
    bySigSelectorNonces: TypedContractMethod<[
        account: AddressLike,
        selector: BytesLike
    ], [
        bigint
    ], "view">;
    bySigUniqueNonces: TypedContractMethod<[
        account: AddressLike,
        nonce: BigNumberish
    ], [
        boolean
    ], "view">;
    bySigUniqueNoncesSlot: TypedContractMethod<[
        account: AddressLike,
        nonce: BigNumberish
    ], [
        bigint
    ], "view">;
    eip712Domain: TypedContractMethod<[
    ], [
        [
            string,
            string,
            string,
            bigint,
            string,
            string,
            bigint[]
        ] & {
            fields: string;
            name: string;
            version: string;
            chainId: bigint;
            verifyingContract: string;
            salt: string;
            extensions: bigint[];
        }
    ], "view">;
    hashBySig: TypedContractMethod<[
        sig: BySig.SignedCallStruct
    ], [
        string
    ], "view">;
    sponsoredCall: TypedContractMethod<[
        token: AddressLike,
        amount: BigNumberish,
        data: BytesLike,
        extraData: BytesLike
    ], [
        string
    ], "payable">;
    useBySigAccountNonce: TypedContractMethod<[
        advance: BigNumberish
    ], [
        void
    ], "nonpayable">;
    useBySigSelectorNonce: TypedContractMethod<[
        selector: BytesLike,
        advance: BigNumberish
    ], [
        void
    ], "nonpayable">;
    useBySigUniqueNonce: TypedContractMethod<[
        nonce: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction<T extends ContractMethod = ContractMethod>(key: string | FunctionFragment): T;
    getFunction(nameOrSignature: "SIGNED_CALL_TYPEHASH"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "bySig"): TypedContractMethod<[
        signer: AddressLike,
        sig: BySig.SignedCallStruct,
        signature: BytesLike
    ], [
        string
    ], "payable">;
    getFunction(nameOrSignature: "bySigAccountNonces"): TypedContractMethod<[account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "bySigSelectorNonces"): TypedContractMethod<[
        account: AddressLike,
        selector: BytesLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "bySigUniqueNonces"): TypedContractMethod<[
        account: AddressLike,
        nonce: BigNumberish
    ], [
        boolean
    ], "view">;
    getFunction(nameOrSignature: "bySigUniqueNoncesSlot"): TypedContractMethod<[
        account: AddressLike,
        nonce: BigNumberish
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "eip712Domain"): TypedContractMethod<[
    ], [
        [
            string,
            string,
            string,
            bigint,
            string,
            string,
            bigint[]
        ] & {
            fields: string;
            name: string;
            version: string;
            chainId: bigint;
            verifyingContract: string;
            salt: string;
            extensions: bigint[];
        }
    ], "view">;
    getFunction(nameOrSignature: "hashBySig"): TypedContractMethod<[sig: BySig.SignedCallStruct], [string], "view">;
    getFunction(nameOrSignature: "sponsoredCall"): TypedContractMethod<[
        token: AddressLike,
        amount: BigNumberish,
        data: BytesLike,
        extraData: BytesLike
    ], [
        string
    ], "payable">;
    getFunction(nameOrSignature: "useBySigAccountNonce"): TypedContractMethod<[advance: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "useBySigSelectorNonce"): TypedContractMethod<[
        selector: BytesLike,
        advance: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "useBySigUniqueNonce"): TypedContractMethod<[nonce: BigNumberish], [void], "nonpayable">;
    getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
    filters: {
        "EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
        EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
    };
}
