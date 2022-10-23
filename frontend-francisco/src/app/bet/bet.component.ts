import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ethers, Contract } from 'ethers';
import Lottery from 'src/assets/Lottery.json'

//FIXME
const LOTTERY_CONTRACT_ADDRESS = '0x1a6b6140e530a907dab709382078e9a7c1371351';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit {
  betForm: FormGroup;
  walletAddress: string;
  wallet: ethers.Wallet;
  provider: ethers.providers.BaseProvider | undefined;
  lotteryContract: Contract;
  
  constructor(private fb: FormBuilder) { 
    this.walletAddress = 'Loading...'; 
    this.betForm = new FormGroup({
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

  get f() { return this.betForm.controls; }

  ngOnInit(): void {
    
  }

  async bet(params: FormGroup) {
    console.log(params);
    params.patchValue({feedback: "Feeback will appear here..."});
    const amount = params.value.amount;

    const tx = await this.lotteryContract.connect(this.wallet)['bet'](amount);
    const receipt = await tx.wait();
    console.log(`Bets are placed (${receipt.transactionHash})\n`);
  }

}
