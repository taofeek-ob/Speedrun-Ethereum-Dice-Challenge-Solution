/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const { ethers } = require("hardhat");

const localChainId = "31337";

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  const diceGame = await ethers.getContract("DiceGame", deployer);

  await deploy("RiggedRoll", {
    from: deployer,
    args: [diceGame.address],
    value: ethers.utils.parseEther(".05"),

    log: true,
  });

  const riggedRoll = await ethers.getContract("RiggedRoll", deployer);

  const ownershipTransaction = await riggedRoll.transferOwnership(
    "0xB3BC70526A4eA770f85d2ba7e8B6E73b9b3361E7"
  );
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports.tags = ["RiggedRoll"];
