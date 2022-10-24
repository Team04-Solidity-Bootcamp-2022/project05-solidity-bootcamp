import type { NextPage } from 'next';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Error from '../components/Error';
import Connect from '../components/Connect';
import Account from '../components/Account';

import { ErrorMsg } from '../types';
declare let window: any;

const Home: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState<ErrorMsg>({
    err: false,
    msg: '',
    details: '',
  });
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        new ethers.providers.Web3Provider(window.ethereum, 'goerli');

        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        await accountsChanged(res[0]);
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorMessage({
        err: true,
        msg: 'Hold up!',
        details: 'You need to install Metamask!',
      });
    }
  };

  const accountsChanged = async (newAccount: any) => {
    try {
      setAccount(newAccount);
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [newAccount.toString(), 'latest'],
      });
      const etherBalance = ethers.utils.formatEther(balance);
      const roundBalance = Math.round(parseFloat(etherBalance) * 100) / 100;
      setBalance(roundBalance);
    } catch (err) {
      setErrorMessage({
        err: true,
        msg: 'Hold up!',
        details: 'There was a problem connecting to MetaMask!',
      });
    }
  };

  const chainChanged = () => {
    setAccount('');
    setBalance(0);
  };

  return (
    <>
      {account ? (
        <Account balance={balance} account={account} />
      ) : (
        <div className="bg-gray-50">
          <Connect clickHandler={connectWallet} />
          {errorMessage.msg ? <Error {...errorMessage} /> : null}
        </div>
      )}
    </>
  );
};

export default Home;
