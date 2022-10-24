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
  provider: ethers.providers.Provider;

  ownerPrivateKey: string;

  openBetsForm = this.fb.group({
    ownerPrivateKey: [''],
    duration: ['']
  });

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    console.log('In openbets constructor');

    this.provider = ethers.getDefaultProvider('goerli');
    this.ownerPrivateKey = '';
  }

  ngOnInit(): void {
    console.log('In openbets OnInit');
  
  }

  async openBets() {
    const duration = this.openBetsForm.value.duration || "";
    console.log(`duration: ${duration}`);

    const privateKey = this.openBetsForm.value.ownerPrivateKey || "";
    console.log(`privateKey: ${privateKey.length}`);

    const ownerWallet = new ethers.Wallet(privateKey, this.provider);
    const currentBlock = await this.provider.getBlock("latest");  

    const lotteryContract = new ethers.Contract(
      this.apiService.getLotteryContractAddress(),
      Lottery.abi,
      ownerWallet
    );
    
    
    const openBetsTx = await lotteryContract.connect(ownerWallet)['openBets'](currentBlock.timestamp + Number(duration));
    const receipt = await openBetsTx.wait();
    console.log(`Bets opened (${receipt.transactionHash})`);
  }

}
