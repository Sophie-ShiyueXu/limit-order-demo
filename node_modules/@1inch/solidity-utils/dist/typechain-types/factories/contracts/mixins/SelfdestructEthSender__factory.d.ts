import { type ContractRunner } from "ethers";
import type { SelfdestructEthSender, SelfdestructEthSenderInterface } from "../../../contracts/mixins/SelfdestructEthSender";
export declare class SelfdestructEthSender__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address payable";
            readonly name: "receiver";
            readonly type: "address";
        }];
        readonly name: "stopAndTransferBalance";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static createInterface(): SelfdestructEthSenderInterface;
    static connect(address: string, runner?: ContractRunner | null): SelfdestructEthSender;
}
