import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Contract, ethers, BigNumber } from 'ethers';
import Lottery from 'src/assets/Lottery.json'

//FIXME
const LOTTERY_CONTRACT_ADDRESS = '0x1a6b6140e530a907dab709382078e9a7c1371351';

@Component({
  selector: 'app-buy-tokens',
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.scss']
})
export class BuyTokensComponent implements OnInit {
  buyTokensForm: FormGroup;
  walletAddress: string;
  wallet: ethers.Wallet;
  provider: ethers.providers.BaseProvider | undefined;
  lotteryContract: Contract;

  constructor(private fb: FormBuilder) {
    this.walletAddress = 'Loading...'; 
    this.buyTokensForm = new FormGroup({
      amount: new FormControl('', Validators.compose([Validators.required])),
      feedback: new FormControl(''),
    });

    this.provider = ethers.getDefaultProvider('goerli');
    const pkLS = localStorage.getItem('privateKey');
    this.wallet = ethers.Wallet.createRandom();
    if(pkLS != null) {
      this.wallet = new ethers.Wallet(pkLS);
    }
    this.walletAddress = this.wallet.address;

    this.lotteryContract = new ethers.Contract(
      LOTTERY_CONTRACT_ADDRESS,
      Lottery.abi,
      this.wallet,
    );
  }

  get f() { return this.buyTokensForm.controls; }

  ngOnInit(): void {
    
  }

  async buyTokens(params: FormGroup) {
    console.log(params);
    params.patchValue({feedback: "Feeback will appear here..."});
    const amountInEther = params.value.amount;
    const amount = ethers.utils.parseEther(amountInEther);
    const tx = await this.lotteryContract.connect(this.wallet)['buyTokens']({
      value: amount,
    });
    const receipt = await tx.wait();
    console.log(`Tokens bought (${receipt.transactionHash})\n`);
  }
}
