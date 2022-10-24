import { Component, Input, OnInit } from '@angular/core';
import { Contract, ethers } from 'ethers';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import Lottery from '../../assets/Lottery.json';
import LotteryToken from '../../assets/LotteryToken.json';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  privateKey: string;
  privateKeySubscription: Subscription | undefined;

  walletAddress: string;
  walletAddressSubscription: Subscription | undefined;

  wallet: ethers.Wallet | undefined;
  walletSubscription: Subscription | undefined;

  provider: ethers.providers.Provider;
  providerSubscription: Subscription | undefined;

  balance: string;
  tokenBalance: string;
  tokenContractAddress: string;
  lotteryContract: Contract;
  lotteryContractAddress: string;

  tokenContract: Contract;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    console.log(`In dashboard.component.ts constructor`);
    this.balance = 'Loading...';
    this.tokenBalance = 'Loading...';
    this.tokenContractAddress = '';
    this.lotteryContractAddress = '';
    this.privateKey = '';
    this.walletAddress = 'Loading...';
    this.provider = ethers.getDefaultProvider('goerli');

    this.privateKeySubscription = this.apiService.privateKey.subscribe(privateKey => this.privateKey = privateKey);
    this.wallet = new ethers.Wallet(this.privateKey, ethers.getDefaultProvider('goerli'));

    this.walletAddressSubscription = this.apiService.walletAddress.subscribe(walletAddress => this.walletAddress = walletAddress);
    this.providerSubscription = this.apiService.provider.subscribe(provider => this.provider = provider);
    this.walletSubscription = this.apiService.wallet.subscribe(wallet => this.wallet = wallet);

    
    console.log(`In dashboard constructor: this.wallet.address: ${this.wallet.address}`);
    console.log(`In dashboard constructor: this.walletAddress: ${this.walletAddress}`);

    this.lotteryContract = new ethers.Contract(
      this.apiService.getLotteryContractAddress(),
      Lottery.abi,
      this.wallet
    );
    this.lotteryContractAddress = this.lotteryContract.address;
    this.apiService.changeLotteryContract(this.lotteryContract);

    this.tokenContract = new ethers.Contract(
      this.apiService.getTokenContractAddress(),
      LotteryToken.abi,
      this.wallet
    );
    this.tokenContractAddress = this.tokenContract.address;
    this.apiService.changeTokenContract(this.tokenContract);
  }

  ngOnInit(): void {
    this.getBalance();
    this.getTokenBalance();
  }

  async getBalance() {
    const balanceBN = await this.provider.getBalance(this.walletAddress)
    this.balance = ethers.utils.formatEther(balanceBN);
  }

  async getTokenBalance() {
//     const tokenBalanceBN = await this.tokenContract['balanceOf'](this.walletAddress);


    console.log(`this.apiService.getTokenContractAddress(): ${this.apiService.getTokenContractAddress()}`);
    // console.log(`this.wallet.address: ${this.wallet.address}`);
    const aTokenContract = await new ethers.Contract(
      this.apiService.getTokenContractAddress(),
      LotteryToken.abi,
      this.wallet
    );
    const tokenBalanceBN = (await aTokenContract['balanceOf'](this.walletAddress)).toString();

    console.log(`getTokenBalance tokenBalanceBN: ${tokenBalanceBN}`);
    console.log(`getTokenBalance walletAddress: ${this.walletAddress}`);

    this.tokenBalance = ethers.utils.formatEther(tokenBalanceBN);

  }
}

// const tokenAddress = await contract.paymentToken();
// const tokenFactory = await ethers.getContractFactory("LotteryToken");
// token = tokenFactory.attach(tokenAddress);


  


  // async buyTokens(params: FormGroup) {
  //   console.log(params);

  //   const amount = params.value.amount;
  //   const tx = await this.lotteryContract?.connect(this.wallet).buyTokens({
  //     value: ethers.utils.parseEther(amount),
  //   });
  // }


/* 
async function buyTokens(index: string, amount: string) {
  const tx = await contract.connect(accounts[Number(index)]).buyTokens({
    value: ethers.utils.parseEther(amount),
  });
  const receipt = await tx.wait();
  console.log(`Tokens bought (${receipt.transactionHash})\n`);
}

async function displayTokenBalance(index: string) {
  const balanceBN = await token.balanceOf(accounts[Number(index)].address);
  const balance = ethers.utils.formatEther(balanceBN);
  console.log(
    `The account of address ${
      accounts[Number(index)].address
    } has ${balance} Tokens\n`
  );
}

*/