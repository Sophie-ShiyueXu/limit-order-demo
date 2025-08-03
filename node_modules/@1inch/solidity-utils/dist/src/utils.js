"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployAndGetContract = deployAndGetContract;
exports.deployAndGetContractWithCreate3 = deployAndGetContractWithCreate3;
exports.saveContractWithCreate3Deployment = saveContractWithCreate3Deployment;
exports.timeIncreaseTo = timeIncreaseTo;
exports.deployContract = deployContract;
exports.deployContractFromBytecode = deployContractFromBytecode;
exports.trackReceivedTokenAndTx = trackReceivedTokenAndTx;
exports.fixSignature = fixSignature;
exports.signMessage = signMessage;
exports.countInstructions = countInstructions;
exports.getEthPrice = getEthPrice;
exports.getAccountsWithCode = getAccountsWithCode;
const tslib_1 = require("tslib");
require("@nomicfoundation/hardhat-ethers"); // required to populate the HardhatRuntimeEnvironment with ethers
const hardhat_1 = tslib_1.__importStar(require("hardhat"));
const hardhat_network_helpers_1 = require("@nomicfoundation/hardhat-network-helpers");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const ethers_1 = require("ethers");
const prelude_1 = require("./prelude");
/**
 * @category utils
 * Deploys a contract with optional Etherscan verification.
 * @param options Deployment options. Default values:
 *    - constructorArgs: []
 *    - deploymentName: contractName
 *    - skipVerify: false
 *    - skipIfAlreadyDeployed: true
 *    - log: true
 *    - waitConfirmations: 1 on dev chains, 6 on others
 * @returns The deployed contract instance.
 */
async function deployAndGetContract(options) {
    // Set default values for options
    const { contractName, constructorArgs = [], deployments, deployer, deploymentName = contractName, skipVerify = false, skipIfAlreadyDeployed = true, gasPrice, maxPriorityFeePerGas, maxFeePerGas, log = true, waitConfirmations = prelude_1.constants.DEV_CHAINS.includes(hardhat_1.default.network.name) ? 1 : 6, } = options;
    /**
     * Deploys contract and tries to verify it on Etherscan if requested.
     * @remarks
     * If the contract is deployed on a dev chain, verification is skipped.
     * @returns Deployed contract instance
     */
    const { deploy } = deployments;
    const deployOptions = {
        args: constructorArgs,
        from: deployer,
        contract: contractName,
        skipIfAlreadyDeployed,
        gasPrice: gasPrice?.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas?.toString(),
        maxFeePerGas: maxFeePerGas?.toString(),
        log,
        waitConfirmations,
    };
    // If hardhat-deploy `deploy` function logs need to be displayed, add HARDHAT_DEPLOY_LOG = 'true' to the .env file
    const deployResult = await deploy(deploymentName, deployOptions);
    if (!(skipVerify || prelude_1.constants.DEV_CHAINS.includes(hardhat_1.default.network.name))) {
        await hardhat_1.default.run('verify:verify', {
            address: deployResult.address,
            constructorArguments: constructorArgs,
        });
    }
    else {
        console.log('Skipping verification');
    }
    return await hardhat_1.ethers.getContractAt(contractName, deployResult.address);
}
/**
 * @category utils
 * Deploys a contract using create3 and saves the deployment information.
 * @param options Deployment options. Default values:
 *    - constructorArgs: []
 *    - txSigner: first signer in the environment
 *    - deploymentName: contractName
 *    - skipVerify: false
 *    - skipIfAlreadyDeployed: true
 *    - waitConfirmations: 1 on dev chains, 6 on others
 * @returns The deployed contract instance.
 */
async function deployAndGetContractWithCreate3(options) {
    // Set default values for options
    const { create3Deployer, salt, contractName, constructorArgs = [], deployments, txSigner = (await hardhat_1.ethers.getSigners())[0], deploymentName = contractName, skipVerify = false, skipIfAlreadyDeployed = true, gasPrice, maxPriorityFeePerGas, maxFeePerGas, waitConfirmations = prelude_1.constants.DEV_CHAINS.includes(hardhat_1.default.network.name) ? 1 : 6, } = options;
    const contractDeployment = await deployments.getOrNull(contractName);
    if (skipIfAlreadyDeployed && contractDeployment != null &&
        (await deployments.getArtifact(contractName)).deployedBytecode === contractDeployment.deployedBytecode) {
        console.log(`Contract ${contractName} is already deployed at ${contractDeployment.address}`);
        return await hardhat_1.ethers.getContractAt(contractName, contractDeployment.address);
    }
    const deployer = await hardhat_1.ethers.getContractAt('ICreate3Deployer', create3Deployer);
    const CustomContract = await hardhat_1.ethers.getContractFactory(contractName);
    const deployData = (await CustomContract.getDeployTransaction(...constructorArgs)).data;
    const txn = await deployer.connect(txSigner).deploy(salt, deployData, { gasPrice, maxPriorityFeePerGas, maxFeePerGas });
    const receipt = await txn.wait(waitConfirmations);
    const customContractAddress = await deployer.addressOf(salt);
    console.log(`${contractName} deployed to: ${customContractAddress}`);
    return await saveContractWithCreate3Deployment(txSigner.provider, deployments, contractName, deploymentName, constructorArgs, salt, create3Deployer, receipt.hash, skipVerify);
}
/**
 * @category utils
 * Saves the deployment information using the deploy transaction hash.
 * @param provider JSON RPC provider or Hardhat Ethers Provider.
 * @param deployments Deployment facilitator object from Hardhat.
 * @param contractName Name of the contract to deploy.
 * @param deploymentName Optional custom name for deployment.
 * @param constructorArgs Arguments for the contract's constructor.
 * @param salt Salt value for create3 deployment.
 * @param create3Deployer Address of the create3 deployer contract.
 * @param deployTxHash Transaction hash of the create3 deployment.
 * @param skipVerify Skips Etherscan verification if true.
 * @returns The deployed contract instance.
 */
async function saveContractWithCreate3Deployment(provider, deployments, contractName, deploymentName, constructorArgs, // eslint-disable-line @typescript-eslint/no-explicit-any
salt, create3Deployer, deployTxHash, skipVerify = false) {
    const deployer = await hardhat_1.ethers.getContractAt('ICreate3Deployer', create3Deployer);
    const contract = await deployer.addressOf(salt);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const receipt = await provider.getTransactionReceipt(deployTxHash);
    if (receipt != null) {
        // convert ethers.TransactionReceipt object to hardhat-deploy.Receipt object
        receipt.transactionHash = receipt.transactionHash || receipt.hash;
        receipt.transactionIndex = receipt.transactionIndex || receipt.index;
        ['provider', 'blobGasPrice', 'type', 'root', 'hash', 'index'].forEach(key => delete receipt[key]);
    }
    const ContractArtifact = await deployments.getArtifact(contractName);
    const ContractDeploymentData = {};
    ContractDeploymentData.address = contract;
    ContractDeploymentData.transactionHash = receipt.hash;
    ContractDeploymentData.receipt = receipt;
    ContractDeploymentData.args = constructorArgs;
    ContractDeploymentData.abi = ContractArtifact.abi;
    ContractDeploymentData.bytecode = ContractArtifact.bytecode;
    ContractDeploymentData.deployedBytecode = ContractArtifact.deployedBytecode;
    await deployments.save(deploymentName, ContractDeploymentData);
    if (!(skipVerify || prelude_1.constants.DEV_CHAINS.includes(hardhat_1.default.network.name))) {
        await hardhat_1.default.run('verify:verify', {
            address: contract,
            constructorArguments: constructorArgs,
        });
    }
    else {
        console.log('Skipping verification');
    }
    return await hardhat_1.ethers.getContractAt(contractName, contract);
}
/**
 * @category utils
 * Advances the blockchain time to a specific timestamp for testing purposes.
 * @param seconds Target time in seconds or string format to increase to.
 */
async function timeIncreaseTo(seconds) {
    const delay = 1000 - new Date().getMilliseconds();
    await new Promise((resolve) => setTimeout(resolve, delay));
    await hardhat_network_helpers_1.time.increaseTo(seconds);
}
/**
 * @category utils
 * Deploys a contract given a name and optional constructor parameters.
 * @param name The contract name.
 * @param parameters Constructor parameters for the contract.
 * @returns The deployed contract instance.
 */
async function deployContract(name, parameters = []) {
    const ContractFactory = await hardhat_1.ethers.getContractFactory(name);
    const instance = await ContractFactory.deploy(...parameters);
    await instance.waitForDeployment();
    return instance;
}
/**
 * @category utils
 * Deploys a contract from bytecode, useful for testing and deployment of minimal proxies.
 * @param abi Contract ABI.
 * @param bytecode Contract bytecode.
 * @param parameters Constructor parameters.
 * @param signer Optional signer object.
 * @returns The deployed contract instance.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function deployContractFromBytecode(abi, bytecode, parameters = [], signer) {
    const ContractFactory = await hardhat_1.ethers.getContractFactory(abi, bytecode, signer);
    const instance = await ContractFactory.deploy(...parameters);
    await instance.waitForDeployment();
    return instance;
}
/**
 * @category utils
 * Tracks token balance changes and transaction receipts for specified wallet addresses during test scenarios.
 * It could be used recursively for multiple tokens via specific `txPromise` function.
 * @param provider JSON RPC provider or custom provider object.
 * @param token Token contract instance or ETH address constants.
 * @param wallet Wallet address to track.
 * @param txPromise Function returning a transaction promise.
 * @param args Arguments for the transaction promise function.
 * @returns Tuple of balance change and transaction receipt.
 */
async function trackReceivedTokenAndTx(provider, token, wallet, txPromise, ...args) {
    const tokenAddress = 'address' in token ? token.address : await token.getAddress();
    const isETH = tokenAddress === prelude_1.constants.ZERO_ADDRESS || tokenAddress === prelude_1.constants.EEE_ADDRESS;
    const getBalance = 'balanceOf' in token ? token.balanceOf.bind(token) : provider.getBalance.bind(provider);
    const preBalance = await getBalance(wallet);
    const txResponse = await txPromise(...args);
    const txReceipt = 'wait' in txResponse ? await txResponse.wait() : txResponse[1];
    const txFees = wallet.toLowerCase() === txReceipt.from.toLowerCase() && isETH
        ? txReceipt.gasUsed * txReceipt.gasPrice
        : 0n;
    const postBalance = await getBalance(wallet);
    return [postBalance - preBalance + txFees, 'wait' in txResponse ? txReceipt : txResponse];
}
/**
 * @category utils
 * Corrects the ECDSA signature 'v' value according to Ethereum's standard.
 * @param signature The original signature string.
 * @returns The corrected signature string.
 */
function fixSignature(signature) {
    // in geth its always 27/28, in ganache its 0/1. Change to 27/28 to prevent
    // signature malleability if version is 0/1
    // see https://github.com/ethereum/go-ethereum/blob/v1.8.23/internal/ethapi/api.go#L465
    let v = parseInt(signature.slice(130, 132), 16);
    if (v < 27) {
        v += 27;
    }
    const vHex = v.toString(16);
    return signature.slice(0, 130) + vHex;
}
/**
 * @category utils
 * Signs a message with a given signer and fixes the signature format.
 * @param signer Signer object or wallet instance.
 * @param messageHex The message to sign, in hex format.
 * @returns The signed message string.
 */
async function signMessage(signer, messageHex = '0x') {
    return fixSignature(await signer.signMessage(messageHex));
}
/**
 * @category utils
 * Counts the occurrences of specified EVM instructions in a transaction's execution trace.
 * @param provider JSON RPC provider or custom provider object.
 * @param txHash Transaction hash to analyze.
 * @param instructions Array of EVM instructions (opcodes) to count.
 * @returns Array of instruction counts.
 */
async function countInstructions(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
provider, txHash, instructions) {
    const trace = await provider.send('debug_traceTransaction', [txHash]);
    const str = JSON.stringify(trace);
    return instructions.map((instr) => {
        return str.split('"' + instr.toUpperCase() + '"').length - 1;
    });
}
/**
 * @category utils
 * Retrieves the current USD price of ETH or another specified native token.
 * This helper function is designed for use in test environments to maintain stability against market fluctuations.
 * It fetches the current price of ETH (or a specified native token for side chains) in USD from the Coinbase API to
 * ensure that tests remain stable and unaffected by significant market price fluctuations when token price is
 * important part of test.
 * @param nativeTokenSymbol The symbol of the native token for which the price is being fetched, defaults to 'ETH'.
 * @return The price of the specified native token in USD, scaled by 1e18 to preserve precision.
 */
async function getEthPrice(nativeTokenSymbol = 'ETH') {
    const response = await (0, node_fetch_1.default)(`https://api.coinbase.com/v2/prices/${nativeTokenSymbol}-USD/spot`);
    let amount = 0n;
    try {
        amount = BigInt(parseFloat((await response.json()).data.amount) * 1e18);
    }
    catch {
        throw new Error('Failed to parse price from Coinbase API');
    }
    return amount;
}
/**
 * @category utils
 * Sets custom bytecode for local test accounts and returns them as signers.
 * This helper is intended for test environments (e.g., Hardhat) where deploying or modifying contract code
 * at known addresses is required. It allows setting the same or different bytecode for multiple accounts.
 *
 * Primarily useful for ensuring accounts start with empty code. For example, with the introduction of EIP-7702
 * on some networks, default accounts (like the first few returned by `ethers.getSigners()`) may already have
 * forwarding contracts deployed to them, which can break assumptions in tests.
 *
 * @param code A single bytecode (applied to all accounts) or an array of bytecodes (one per account). Defaults to '0x'.
 * @return A list of signers (accounts) with the specified code applied.
 */
async function getAccountsWithCode(code = '0x') {
    const accounts = await hardhat_1.ethers.getSigners();
    for (let i = 0; i < accounts.length; i++) {
        const newAccountCode = (0, ethers_1.isBytesLike)(code)
            ? code
            : (code[i] ? code[i] : '0x');
        await hardhat_1.default.network.provider.request({
            method: 'hardhat_setCode',
            params: [accounts[i].address, newAccountCode],
        });
    }
    return accounts;
}
//# sourceMappingURL=utils.js.map