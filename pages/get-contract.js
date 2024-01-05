import { useState } from "react";
import { InfoCard, Input, Button } from "../components";
import Web3Modal from "web3modal";
import { ValidifyAddress, ValidifyAddressesABI } from "../Context/constents";
import { ethers } from "ethers";

const getContract = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
      ValidifyAddress,
      ValidifyAddressesABI,
      signerOrProvider
    );

  const fetchContractAddress = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      if (walletAddress) {
        const address = await contract.getCompanySmartContractAddress(
          walletAddress
        );
        setContractAddress(address);
      } else {
        alert("Enter wallet address");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 sm:px-4 p-12">
      <div className="md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-bold ml-4 sm:ml-0">
          Fetch Contract Address
        </h1>
        <div className="mt-5 text-justify">
          <h3 className="font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-2xl font-semibold ml-4 sm:ml-0">
            Description
          </h3>
          <InfoCard
            content="Companies can fetch the address of the SMART-CONTRACTS that will serve as a registry of all the products of the company"
            warning="Fetch the Company specific Contract Address by providing the Company specific Metamask Wallet Address in the below area"
            classStyles="text-md"
          />
          <div className="ml-4 sm:ml-0">
            <Input
              title="Fetch Address"
              placeholder="Enter the company wallet address"
              handleClick={(e) => setWalletAddress(e.target.value)}
            />
            <div className="mt-8 sm:my-4 flex sm:justify-end">
              <Button
                btnName="Fetch Address"
                classStyles="rounded-xl"
                handleClick={fetchContractAddress}
              />
            </div>
            <div>
            {contractAddress ? (
              <InfoCard content="Contract Address" warning={contractAddress} />
            ) : (
              <InfoCard warning="Enter a Valid wallet address" classStyles="sm:mt-0" />
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default getContract;
