require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = process.env.REACT_APP_PRIVATE_KEY; 
const ALCHEMY_API_KEY =  process.env.REACT_APP_ALCHEMY_API_KEY; 
const projectId =process.env.REACT_APP_PROJECT_ID;

module.exports = {
  solidity: "0.8.4",
  networks: {
    matic: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${projectId}`,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
};
