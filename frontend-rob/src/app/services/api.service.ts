import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take} from 'rxjs';
import { ethers, Contract } from "ethers";

const LOTTERY_CONTRACT_ADDRESS = '0xe7571A4cE797E3835cfE758d510f3a48d7AA0D25';
const TOKEN_CONTRACT_ADDRESS = '0x541282afAf85b1ccAd6678dcF2286d7c4264038A';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private walletAddressSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  walletAddress = this.walletAddressSource.asObservable();

  private walletSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  wallet = this.walletSource.asObservable();

  private providerSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  provider = this.providerSource.asObservable();

  private privateKeySource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  privateKey = this.privateKeySource.asObservable();

  private lotteryContractSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  lotteryContract = this.lotteryContractSource.asObservable();

  private tokenContractSource: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  tokenContract = this.tokenContractSource.asObservable();

  constructor() { 
    console.log('api.service.ts constructor called');
  }

  changeWalletAddress(address_: string) {
    this.walletAddressSource.next(address_);
  }

  changeWallet(wallet_: ethers.Wallet) {
    this.walletSource.next(wallet_);
  }

  changeProvider(provider_: ethers.providers.Provider) {
    this.providerSource.next(provider_);
  }

  changePrivateKey(privateKey_: string) {
    this.privateKeySource.next(privateKey_);
  }

  changeLotteryContract(lotteryContract_: Contract) {
    this.lotteryContractSource.next(lotteryContract_);
  }

  changeTokenContract(tokenContract_: Contract) {
    this.tokenContractSource.next(tokenContract_);
  }

  getLotteryContractAddress() {
    return LOTTERY_CONTRACT_ADDRESS;
  }

  getTokenContractAddress() {
    return TOKEN_CONTRACT_ADDRESS;
  }

  initLotteryContract() {
    return LOTTERY_CONTRACT_ADDRESS;
  }

  getWallet() {
    let wallet_;
    this.walletSource.pipe(take(1)).subscribe((wallet) => {
      wallet_ = wallet;
    });
    return wallet_;
  }
  
}