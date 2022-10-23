import { ethers } from "ethers";
import { Lottery__factory } from "../../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

export async function getSigner() {
  const options = {
    alchemy: process.env.ALCHEMY_API_KEY,
    infura: process.env.INFURA_API_KEY,
    etherscan: process.env.ETHERSCAN_API_KEY,
  };
  const provider = ethers.getDefaultProvider("goerli", options);
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  console.log(`Using address ${wallet.address}`);
  const signer = wallet.connect(provider);
  return signer;
}

export async function deployLottery() {
  const BET_PRICE = 1;
  const BET_FEE = 0.2;
  const TOKEN_RATIO = 1;

  const signer = await getSigner();
  const factory = new Lottery__factory(signer);
  const contract = await factory.deploy(
    "LotteryToken",
    "LT0",
    TOKEN_RATIO,
    ethers.utils.parseEther(BET_PRICE.toFixed(18)),
    ethers.utils.parseEther(BET_FEE.toFixed(18))
  );
  await contract.deployed();
  return contract;
}
