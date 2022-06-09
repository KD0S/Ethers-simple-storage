const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  )
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("Deploying, Please wait....")
  const contract = await contractFactory.deploy()
  await contract.deployTransaction.wait(1)
  console.log(`Contract Address : ${contract.address}`)
  // Get Number
  const currentFavouriteNumber = await contract.retrieve()
  console.log(`Updated Favourite Number is : ${currentFavouriteNumber}`)
  const transactionResponse = await contract.store("67")
  const transactionReceipt = await transactionResponse.wait(1)
  const updatedFavouriteNumber = await contract.retrieve()
  console.log(`Updated Favourite Number is : ${updatedFavouriteNumber}`)
}

main()
