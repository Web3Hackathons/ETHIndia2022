require("@nomiclabs/hardhat-waffle");
// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
require("dotenv").config();

const AURORA_PRIVATE_KEY = process.env.AURORA_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.8",
  networks: {
    // testnet_aurora: {
    //   url: "https://testnet.aurora.dev",
    //   accounts: [`0x${AURORA_PRIVATE_KEY}`],
    //   chainId: 1313161555,
    //   gasPrice: 120 * 1000000000,
    // },
    // local_aurora: {
    //   url: "http://localhost:8545",
    //   accounts: [`0x${AURORA_PRIVATE_KEY}`],
    //   chainId: 1313161555,
    //   gasPrice: 120 * 1000000000,
    // },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${AURORA_PRIVATE_KEY}`],
      chainId: 3,
      live: true,
      gasPrice: 50000000000,
      gasMultiplier: 2,
    },
  },
  etherscan: {
    //apiKey: process.env.ETHERSCAN_API_KEY,
    apiKey: process.env.AURORASCAN_API_KEY,
  },
  solidity: {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

// $ npx hardhat run --network testnet_aurora scripts/deploy.js
// Compiled 1 Solidity file successfully
// Deploying contracts with the account: 0x9DC61eEc0C05BFA16eE1DC51B3a0aED358E18Eb5
// Account balance: 1000000000000000
// Trikl deployed to:
//****************************** 0x8A16Ecb5128d30eC56c74bd0f5f75FFdb49391cb **********************************//
//*****************0xfA60b6158A22E54822090ee1Ee81280906Aec4A2*********************/
