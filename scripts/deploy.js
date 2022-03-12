const hre = require("hardhat");

async function main() {
  const GameStation = await hre.ethers.getContractFactory("GameStation");
  const gameStation = await GameStation.deploy();
  await gameStation.deployed();
  console.log("GameStation deployed to:", gameStation.address);

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy(gameStation.address);
  await token.deployed();
  console.log("Token deployed to:", token.address);

  const Market = await hre.ethers.getContractFactory("Market");
  const market = await Market.deploy();
  await market.deployed();
  console.log("Market deployed to:", market.address); 
      
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
