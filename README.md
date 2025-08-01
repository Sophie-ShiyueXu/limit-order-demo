🧪 测试方法
1. 安装依赖
如果你还没有安装 ethers 和 hardhat 相关的依赖，请运行以下命令：

npm install ethers @nomiclabs/hardhat-ethers chai

2.  编译合约
npx hardhat compile

3. 运行测试
通过以下命令运行测试：

npx hardhat test

Hardhat 会自动执行测试文件中的每个测试用例，并验证是否符合预期。

