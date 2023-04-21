const hre = require("hardhat");

async function main() {
  const Chai = await hre.ethers.getContractFactory("Chai"); // fetching bytecode and ABI
  const chai = await Chai.deploy(); // creating an instance of our smart contract

  await chai.deployed(); // deploying smart contract

  console.log("Deployed contract address: " + chai.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x24E5a452B1F59e3Be861aaCd31397745C59D310c
