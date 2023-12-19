import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { ValidifyAddress,ValidifyAddressesABI } from './constents';

export const ValContext = React.createContext();
const fetchContract = (signerOrProvider) => new ethers.Contract(MarketAddress, MarketAddressesABI, signerOrProvider);

export const ContextProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('');

    const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

   const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install MetaMask');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const loadBlockchainData = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    setProvider(provider);
    const network = await provider.getNetwork();

    const central = new ethers.Contract(
      config[network.chainId].central.address,
      CentralABI,
      signer
    );
    setCentral(central);
  } catch (error) {
    console.log(error);
    showErrorMessage(error);
  }
};


  return <ValContext.Provider value={{ connectWallet, currentAccount }}>{children}</ValContext.Provider>;
}