import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-new-lottery',
  templateUrl: './create-new-lottery.component.html',
  styleUrls: ['./create-new-lottery.component.scss']
})
export class CreateNewLotteryComponent implements OnInit {
  wallet: ethers.Wallet | undefined;
  provider: ethers.providers.BaseProvider | undefined;

  createLotteryForm: FormGroup;
  constructor() { 
    this.createLotteryForm = new FormGroup({
      ratio: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
      fee: new FormControl('', Validators.compose([Validators.required])),
      feedback: new FormControl('', Validators.compose([Validators.required])),
    });

  }

  ngOnInit(): void {
  }

  createLottery(params: FormGroup) {
    console.log(params);
    params.patchValue({feedback: "Feeback will appear here..."});

    

  }
}
