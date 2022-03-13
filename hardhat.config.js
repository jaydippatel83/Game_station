require("@nomiclabs/hardhat-waffle"); 
const privateKey = 'a3993474ed56a2a6304ae3e920a5cb86d80ccf20adfcec95ff1b6fa276d6ff74';
const ALCHEMY_API_KEY =  'kEyfNEbM4rjMuoRChtnhAsOyxM4UpIV4';
const projectId = process.env.REACT_APP_PROJECT_ID;

module.exports = {
  solidity: "0.8.4",
  networks: {
    matic: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000,
    }, 
  },
};
