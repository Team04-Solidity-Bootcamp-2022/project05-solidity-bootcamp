import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ethers } from 'ethers';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  provider: ethers.providers.BaseProvider | undefined;
  balance: string;
  tokenContractAddress: string;

  claimTokensForm: FormGroup;

  constructor(private apiService: ApiService, 
    private fb: FormBuilder) { 
    this.walletAddress = 'Loading...';
    this.balance = 'Loading...';
    this.tokenContractAddress = '';
    this.claimTokensForm = new FormGroup({
      id: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  get f() { return this.claimTokensForm.controls; }

  ngOnInit(): void {
    this.apiService.getContractAddress().subscribe((response) => {
      this.tokenContractAddress = response.result;
    },
    (error) => {
      this.tokenContractAddress = "0x0";
    });
    this.provider = ethers.getDefaultProvider('goerli');
    const pkLS = localStorage.getItem('privateKey');
    this.wallet = ethers.Wallet.createRandom();
    if(pkLS != null) {
      this.wallet = new ethers.Wallet(pkLS);
    }
    this.walletAddress = this.wallet.address;
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.balance = ethers.utils.formatEther(balanceBN);
    },
    (error) => {
      console.log(error);
    });
    this.claimTokensForm.patchValue({address: this.walletAddress});
  }
  
}
