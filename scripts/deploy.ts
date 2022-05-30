// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat"

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage")
  const simpleStorage = await SimpleStorage.deploy()

  await simpleStorage.deployed()

  //only verify on a testnet!
  // if (network.config.chainId === 42 && process.env.ETHERSCAN_API_KEY) {
  //   // 6 blocks is sort of a guess
  //   await simpleStorage.deployTransaction.wait(6)
  //   await verify(simpleStorage.address, [])
  // }

  console.log("Greeter deployed to:", simpleStorage.address)

  let currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  console.log("Updating contract...")
  let transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait() // returns transaction receipt
  currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)
}

// const verify = async (contractAddress: string, args: any[]) => {
//   console.log("Verifying contract...")
//   try {
//     await run("verify:verify", {
//       address: contractAddress,
//       constructorArguments: args,
//     })
//   } catch (e: any) {
//     if (e.message.toLowerCase().includes("already verified")) {
//       console.log("Already verified!")
//     } else {
//       console.log(e)
//     }
//   }
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
