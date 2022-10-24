import { deployLottery } from "./_deploy";

async function main() {
  const lotteryContract = await deployLottery();
  console.log(lotteryContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});