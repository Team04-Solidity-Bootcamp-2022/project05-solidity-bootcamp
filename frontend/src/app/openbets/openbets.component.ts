import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Contract, ethers } from 'ethers';
import { Subscription, take } from 'rxjs';
import { ApiService } from '../services/api.service';
import Lottery from '../../assets/Lottery.json';

@Component({
  selector: 'app-openbets',
  templateUrl: './openbets.component.html',
  styleUrls: ['./openbets.component.scss']
})

export class OpenbetsComponent implements OnInit {
  lotteryContract: Contract;
  lotteryContractSubscription: Subscription | undefined;

  wallet: ethers.Wallet;
  walletSubscription: Subscription | undefined;

  provider: ethers.providers.Provider;

  ownerPrivateKey: string;

  openBetsForm = this.fb.group({
    ownerPrivateKey: [''],
    duration: ['']
  });

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    console.log('In openbets constructor');

    this.wallet = ethers.Wallet.createRandom();
    this.lotteryContract = new ethers.Contract(
      this.apiService.getLotteryContractAddress(),
      Lottery.abi,
      this.wallet
    );

    this.provider = ethers.getDefaultProvider('goerli');
    this.ownerPrivateKey = '';
  }

  ngOnInit(): void {
    console.log('In openbets OnInit');
    this.lotteryContractSubscription = this.apiService.lotteryContract.subscribe((lotteryContract) => {
      this.lotteryContract = lotteryContract
    });
    this.walletSubscription = this.apiService.wallet.subscribe(wallet => this.wallet = wallet);
    console.log(`openbets::ngOnInit - walletAddress ${this.wallet.address}`);
  }

  async openBets() {
    const duration = this.openBetsForm.value.duration || "";
    console.log(`duration: ${duration}`);

    const privateKey = this.openBetsForm.value.ownerPrivateKey || "";
    console.log(`privateKey: ${privateKey}`);

    this.apiService.lotteryContract.pipe(take(1)).subscribe(lotteryContract => 
      this.lotteryContract = lotteryContract
    );
    
    const currentBlock = await ethers.getDefaultProvider('goerli').getBlock("latest");

    const ownerWallet = new ethers.Wallet(privateKey, ethers.getDefaultProvider('goerli'));
    this.lotteryContract = new ethers.Contract(
      this.apiService.getLotteryContractAddress(),
      Lottery.abi,
      ownerWallet
    );

    
    const openBetsTx = await this.lotteryContract.connect(ownerWallet)['openBets'](currentBlock.timestamp + Number(duration));
    const receipt = await openBetsTx.wait();
    console.log(`Bets opened (${receipt.transactionHash})`);
  }

}
