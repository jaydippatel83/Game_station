const hre = require("hardhat");

/**
 *
 * Network: Polygon (Matic) Mumbai Testnet
 * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
 * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
 * Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
 */
 const VRFCoordinator = "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255";
 const LINKToken = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
 const keyHash =
   "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4";
 

async function main() {
  const SuperFunSocial = await hre.ethers.getContractFactory("SuperFunSocial");
  const superFunSocial = await SuperFunSocial.deploy();
  await superFunSocial.deployed();
  console.log("superFunSocial deployed to:", superFunSocial.address);

  const Token = await hre.ethers.getContractFactory("PostToken");
  const token = await Token.deploy(superFunSocial.address);
  await token.deployed();
  console.log("Token deployed to:", token.address);

  const MintNFT = await hre.ethers.getContractFactory("MintRewardNFT");
  const mintnft = await MintNFT.deploy();
  await mintnft.deployed();
  console.log("MintNFT deployed to:", mintnft.address);

  const SuperFunMemoryGame = await hre.ethers.getContractFactory(
    "MemoryGameNFT"
  );
  const superFunMemoryGame = await SuperFunMemoryGame.deploy();
  await superFunMemoryGame.deployed();
  console.log("MemoryGameNFT deployed to:", superFunMemoryGame.address);

  const SuperFunLuckyLottery = await hre.ethers.getContractFactory(
    "LuckyLotteryNFT"
  );
  const superFunLuckyLottery = await SuperFunLuckyLottery.deploy();
  await superFunLuckyLottery.deployed();
  console.log("LuckyLottery deployed to:", superFunLuckyLottery.address);

  const Contest = await hre.ethers.getContractFactory("ContestToken");
  const contest = await Contest.deploy(superFunSocial.address);
  await contest.deployed();
  console.log("contest deployed to:", contest.address);

  const RandomNumberGenerator = await hre.ethers.getContractFactory(
    "RandomNumberGenerator"
  );
  const randomNumberGenerator = await RandomNumberGenerator.deploy(
    VRFCoordinator,
    LINKToken,
    keyHash
  );
  await randomNumberGenerator.deployed();
  console.log(
    "RandomNumberGenerator deployed to:",
    randomNumberGenerator.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
