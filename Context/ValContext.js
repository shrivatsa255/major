import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
  import { ValidifyAddress, ValidifyAddressesABI } from "./constents";

export const ValContext = React.createContext();
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ValidifyAddress, ValidifyAddressesABI, signerOrProvider);

export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const fetchContractAddress = async () => {
    const [contractAddress, setContractAddress] = useState(null);

    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      if (currentAccount) {
        const address = await contract.getCompanySmartContractAddress(account);
        setContractAddress(address);
        console.log("hello")
      } else {
        alert("Connect to Metamask");
      }
    } catch (err) {
      console.log(err)
    }
  };

  const createContract = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      if (currentAccount) {
        setUpdateStatus("Validate the transaction through your wallet");
        let transaction = await contract.createSmartContract();
        await transaction.wait();
        await fetchContractAddress();
      } else {
        throw Error("Please check that you are connected to a wallet");
      }
    } catch (error) {
        console.log(error.msg)
    }
  };

  return (
    <ValContext.Provider value={{ connectWallet, currentAccount,  createContract }}>
      {children}
    </ValContext.Provider>
  );
};
