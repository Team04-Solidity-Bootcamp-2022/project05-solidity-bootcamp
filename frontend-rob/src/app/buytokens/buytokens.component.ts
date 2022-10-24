import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Contract, ethers } from 'ethers';
import { Subscription, take } from 'rxjs';
import { ApiService } from '../services/api.service';
import Lottery from '../../assets/Lottery.json';

@Component({
  selector: 'app-buytokens',
  templateUrl: './buytokens.component.html',
  styleUrls: ['./buytokens.component.scss']
})
export class BuytokensComponent implements OnInit {
  lotteryContract: Contract;
  lotteryContractSubscription: Subscription | undefined;

  wallet: ethers.Wallet;
  walletSubscription: Subscription | undefined;

  buyTokensForm = this.fb.group({
    amount: ['']
  });

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    console.log('In buytokens constructor');

    this.wallet = ethers.Wallet.createRandom();
    this.lotteryContract = new ethers.Contract(
      this.apiService.getLotteryContractAddress(),
      Lottery.abi,
      this.wallet
    );
    console.log(`buytokens.components::constructor - lotteryContract.address: ${this.lotteryContract.address}`);
  }

  ngOnInit(): void {
    console.log('In buytokens onint');
    this.lotteryContractSubscription = this.apiService.lotteryContract.subscribe((lotteryContract) => {
      this.lotteryContract = lotteryContract
    });
    this.walletSubscription = this.apiService.wallet.subscribe(wallet => this.wallet = wallet);
    console.log(`buytokens::ngOnInit - walletAddress ${this.wallet.address}`);
  }

  async buyTokens() {
    const amount = this.buyTokensForm.value.amount || "";
    console.log({ amount });

    this.apiService.lotteryContract.pipe(take(1)).subscribe(lotteryContract => 
      this.lotteryContract = lotteryContract
    );

    const tx = await this.lotteryContract.connect(this.wallet)['buyTokens']({
        value: ethers.utils.parseEther(amount)
    });
    const receipt = await tx.wait();
    console.log(`Tokens bought (${receipt.transactionHash})\n`);
  }

}
