require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
require("dotenv").config();

const private_keys = process.env.PRIVATE_KEYS;

module.exports = {
  solidity: "0.8.8",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_ALCHEMY_KEY,
      accounts: [private_keys],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
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
