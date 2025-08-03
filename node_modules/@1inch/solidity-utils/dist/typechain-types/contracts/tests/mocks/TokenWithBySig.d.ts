import type { BaseContract, BigNumberish, BytesLike, FunctionFragment, Result, Interface, EventFragment, AddressLike, ContractRunner, ContractMethod, Listener } from "ethers";
import type { TypedContractEvent, TypedDeferredTopicFilter, TypedEventLog, TypedLogDescription, TypedListener, TypedContractMethod } from "../../../common";
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
export interface TokenWithBySigInterface extends Interface {
    getFunction(nameOrSignature: "SIGNED_CALL_TYPEHASH" | "allowance" | "approve" | "balanceOf" | "burn" | "bySig" | "bySigAccountNonces" | "bySigSelectorNonces" | "bySigUniqueNonces" | "bySigUniqueNoncesSlot" | "decimals" | "eip712Domain" | "getChainId" | "hashBySig" | "mint" | "name" | "owner" | "renounceOwnership" | "sponsoredCall" | "symbol" | "totalSupply" | "transfer" | "transferFrom" | "transferOwnership" | "useBySigAccountNonce" | "useBySigSelectorNonce" | "useBySigUniqueNonce"): FunctionFragment;
    getEvent(nameOrSignatureOrTopic: "Approval" | "ChargedSigner" | "EIP712DomainChanged" | "OwnershipTransferred" | "Transfer"): EventFragment;
    encodeFunctionData(functionFragment: "SIGNED_CALL_TYPEHASH", values?: undefined): string;
    encodeFunctionData(functionFragment: "allowance", values: [AddressLike, AddressLike]): string;
    encodeFunctionData(functionFragment: "approve", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "burn", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "bySig", values: [AddressLike, BySig.SignedCallStruct, BytesLike]): string;
    encodeFunctionData(functionFragment: "bySigAccountNonces", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "bySigSelectorNonces", values: [AddressLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "bySigUniqueNonces", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "bySigUniqueNoncesSlot", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "eip712Domain", values?: undefined): string;
    encodeFunctionData(functionFragment: "getChainId", values?: undefined): string;
    encodeFunctionData(functionFragment: "hashBySig", values: [BySig.SignedCallStruct]): string;
    encodeFunctionData(functionFragment: "mint", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "sponsoredCall", values: [AddressLike, BigNumberish, BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [AddressLike, AddressLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [AddressLike]): string;
    encodeFunctionData(functionFragment: "useBySigAccountNonce", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "useBySigSelectorNonce", values: [BytesLike, BigNumberish]): string;
    encodeFunctionData(functionFragment: "useBySigUniqueNonce", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "SIGNED_CALL_TYPEHASH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigAccountNonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigSelectorNonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigUniqueNonces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "bySigUniqueNoncesSlot", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "eip712Domain", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainId", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashBySig", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "sponsoredCall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "useBySigAccountNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "useBySigSelectorNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "useBySigUniqueNonce", data: BytesLike): Result;
}
export declare namespace ApprovalEvent {
    type InputTuple = [
        owner: AddressLike,
        spender: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [owner: string, spender: string, value: bigint];
    interface OutputObject {
        owner: string;
        spender: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace ChargedSignerEvent {
    type InputTuple = [
        signer: AddressLike,
        relayer: AddressLike,
        token: AddressLike,
        amount: BigNumberish
    ];
    type OutputTuple = [
        signer: string,
        relayer: string,
        token: string,
        amount: bigint
    ];
    interface OutputObject {
        signer: string;
        relayer: string;
        token: string;
        amount: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
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
export declare namespace OwnershipTransferredEvent {
    type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
    type OutputTuple = [previousOwner: string, newOwner: string];
    interface OutputObject {
        previousOwner: string;
        newOwner: string;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export declare namespace TransferEvent {
    type InputTuple = [
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ];
    type OutputTuple = [from: string, to: string, value: bigint];
    interface OutputObject {
        from: string;
        to: string;
        value: bigint;
    }
    type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
    type Filter = TypedDeferredTopicFilter<Event>;
    type Log = TypedEventLog<Event>;
    type LogDescription = TypedLogDescription<Event>;
}
export interface TokenWithBySig extends BaseContract {
    connect(runner?: ContractRunner | null): TokenWithBySig;
    waitForDeployment(): Promise<this>;
    interface: TokenWithBySigInterface;
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
    allowance: TypedContractMethod<[
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    approve: TypedContractMethod<[
        spender: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    balanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;
    burn: TypedContractMethod<[
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
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
    decimals: TypedContractMethod<[], [bigint], "view">;
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
    getChainId: TypedContractMethod<[], [bigint], "view">;
    hashBySig: TypedContractMethod<[
        sig: BySig.SignedCallStruct
    ], [
        string
    ], "view">;
    mint: TypedContractMethod<[
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    name: TypedContractMethod<[], [string], "view">;
    owner: TypedContractMethod<[], [string], "view">;
    renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;
    sponsoredCall: TypedContractMethod<[
        token: AddressLike,
        amount: BigNumberish,
        data: BytesLike,
        extraData: BytesLike
    ], [
        string
    ], "payable">;
    symbol: TypedContractMethod<[], [string], "view">;
    totalSupply: TypedContractMethod<[], [bigint], "view">;
    transfer: TypedContractMethod<[
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    transferFrom: TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    transferOwnership: TypedContractMethod<[
        newOwner: AddressLike
    ], [
        void
    ], "nonpayable">;
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
    getFunction(nameOrSignature: "allowance"): TypedContractMethod<[
        owner: AddressLike,
        spender: AddressLike
    ], [
        bigint
    ], "view">;
    getFunction(nameOrSignature: "approve"): TypedContractMethod<[
        spender: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "balanceOf"): TypedContractMethod<[account: AddressLike], [bigint], "view">;
    getFunction(nameOrSignature: "burn"): TypedContractMethod<[
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
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
    getFunction(nameOrSignature: "decimals"): TypedContractMethod<[], [bigint], "view">;
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
    getFunction(nameOrSignature: "getChainId"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "hashBySig"): TypedContractMethod<[sig: BySig.SignedCallStruct], [string], "view">;
    getFunction(nameOrSignature: "mint"): TypedContractMethod<[
        account: AddressLike,
        amount: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "name"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "owner"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "renounceOwnership"): TypedContractMethod<[], [void], "nonpayable">;
    getFunction(nameOrSignature: "sponsoredCall"): TypedContractMethod<[
        token: AddressLike,
        amount: BigNumberish,
        data: BytesLike,
        extraData: BytesLike
    ], [
        string
    ], "payable">;
    getFunction(nameOrSignature: "symbol"): TypedContractMethod<[], [string], "view">;
    getFunction(nameOrSignature: "totalSupply"): TypedContractMethod<[], [bigint], "view">;
    getFunction(nameOrSignature: "transfer"): TypedContractMethod<[
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferFrom"): TypedContractMethod<[
        from: AddressLike,
        to: AddressLike,
        value: BigNumberish
    ], [
        boolean
    ], "nonpayable">;
    getFunction(nameOrSignature: "transferOwnership"): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
    getFunction(nameOrSignature: "useBySigAccountNonce"): TypedContractMethod<[advance: BigNumberish], [void], "nonpayable">;
    getFunction(nameOrSignature: "useBySigSelectorNonce"): TypedContractMethod<[
        selector: BytesLike,
        advance: BigNumberish
    ], [
        void
    ], "nonpayable">;
    getFunction(nameOrSignature: "useBySigUniqueNonce"): TypedContractMethod<[nonce: BigNumberish], [void], "nonpayable">;
    getEvent(key: "Approval"): TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
    getEvent(key: "ChargedSigner"): TypedContractEvent<ChargedSignerEvent.InputTuple, ChargedSignerEvent.OutputTuple, ChargedSignerEvent.OutputObject>;
    getEvent(key: "EIP712DomainChanged"): TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
    getEvent(key: "OwnershipTransferred"): TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
    getEvent(key: "Transfer"): TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    filters: {
        "Approval(address,address,uint256)": TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        Approval: TypedContractEvent<ApprovalEvent.InputTuple, ApprovalEvent.OutputTuple, ApprovalEvent.OutputObject>;
        "ChargedSigner(address,address,address,uint256)": TypedContractEvent<ChargedSignerEvent.InputTuple, ChargedSignerEvent.OutputTuple, ChargedSignerEvent.OutputObject>;
        ChargedSigner: TypedContractEvent<ChargedSignerEvent.InputTuple, ChargedSignerEvent.OutputTuple, ChargedSignerEvent.OutputObject>;
        "EIP712DomainChanged()": TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
        EIP712DomainChanged: TypedContractEvent<EIP712DomainChangedEvent.InputTuple, EIP712DomainChangedEvent.OutputTuple, EIP712DomainChangedEvent.OutputObject>;
        "OwnershipTransferred(address,address)": TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        OwnershipTransferred: TypedContractEvent<OwnershipTransferredEvent.InputTuple, OwnershipTransferredEvent.OutputTuple, OwnershipTransferredEvent.OutputObject>;
        "Transfer(address,address,uint256)": TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
        Transfer: TypedContractEvent<TransferEvent.InputTuple, TransferEvent.OutputTuple, TransferEvent.OutputObject>;
    };
}
