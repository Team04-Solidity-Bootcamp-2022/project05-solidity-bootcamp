import { Component, OnInit } from '@angular/core';
import { Contract, ethers } from 'ethers';
import { FormBuilder, FormGroup, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // walletAddress: string;
  // wallet: ethers.Wallet | undefined;
  // // provider: ethers.providers.Provider | undefined;
  
  privateKey: string;
  privateKeySubscription: Subscription | undefined;

  walletAddress: string;
  walletAddressSubscription: Subscription | undefined;
 
  loginForm = this.fb.group({
    privateKey: ['']
  });

  constructor(private router: Router, private apiService: ApiService, private fb: FormBuilder) {
    this.privateKey = '';
    this.walletAddress = '';
  }

  ngOnInit(): void {
    this.privateKeySubscription = this.apiService.privateKey.subscribe(privateKey => this.privateKey = privateKey);
    this.walletAddressSubscription = this.apiService.walletAddress.subscribe(walletAddress => this.walletAddress = walletAddress);
  }

  loginWithPrivKey() {
    const privateKey = this.loginForm.value.privateKey || "";
    console.log({ privateKey });

    this.apiService.changePrivateKey(privateKey);
    this.apiService.changeProvider(ethers.getDefaultProvider('goerli'));

    const wallet = new ethers.Wallet(privateKey, ethers.getDefaultProvider('goerli'));
    this.apiService.changeWallet(wallet);
    this.apiService.changeWalletAddress(wallet.address);
    // this.provider = ethers.getDefaultProvider('goerli');
    // this.wallet = new ethers.Wallet(this.privateKey);
    // this.walletAddress = this.wallet.address;

    this.router.navigate(['dashboard']);


    // this.provider.getBalance(this.walletAddress).then((balanceBN) => {
    //   this.balance = ethers.utils.formatEther(balanceBN);
    // },
    // (error) => {
    //   console.log(error);
    // });

  }

}
