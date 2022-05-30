import { expect } from "chai"
import { ethers } from "hardhat"
import { getContractAddress } from "@ethersproject/address"

describe("SimpleStorage", function () {
  let SimpleStorage
  let simpleStorage
  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorage.deploy()
    await simpleStorage.deployed()
  })
  it("Should be deploy contract", async () => {
    const [owner] = await ethers.getSigners()
    const transactionCount = await owner.getTransactionCount()
    const contractAddress = getContractAddress({
      from: owner.address,
      nonce: transactionCount,
    })
    expect(contractAddress).to.exist
  })
})
