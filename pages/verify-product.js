import { useState, useRef } from "react";
import { InfoCard, Input, Button, QRscanner } from "../components";
import Web3Modal from "web3modal";
import QrScanner from "qr-scanner";
import { ValidifyAddress, ValidifyAddressesABI } from "../Context/constents";
import { ethers } from "ethers";

const verifyProduct = () => {
  const [companyContractAddress, setCompanyContractAddress] = useState("");
  const [productId, setProductId] = useState("");

  const [productStatus, setProductStatus] = useState(null);
  const [startScan, setStartScan] = useState(false)

  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
      ValidifyAddress,
      ValidifyAddressesABI,
      signerOrProvider
    );

  const checkProduct = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      const result = await contract.checkProduct(
        companyContractAddress,
        parseInt(productId, 36)
      );
      setProductStatus(result);
    } catch (error) {
      console.log(error);
    }
  };

  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const fileRef = useRef();

  const scanQR = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const result = await QrScanner.scanImage(file);
    setData(result);
  };
  console.log(productId);

  return (
    <div className="flex-1 sm:px-4 p-12">
      <div className="md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-bold ml-4 sm:ml-0">
          Verify Products
        </h1>
        <div className="mt-5 text-justify">
          <h3 className="font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-2xl font-semibold ml-4 sm:ml-0">
            Description
          </h3>
          <InfoCard
            content="Consumers can verify their products manufactured by a specific company through the blockchain SMART-CONTRACT"
            warning="Verify the product in the SMART-CONTRACT by providing the company CONTRACT ADDRESS and the PRODUCT ID"
            classStyles="text-md"
          />
          <div className="ml-1 mt-7">
            <p className="font-poppins font-semibold dark:text-white text-nft-black-1 text-xl minlg:text-xl sm:text-sm">
              Scan Your QR code image
            </p>
            <div className="flex-col dark:bg-nft-black-1 p-10 mt-5 bg-indigo-100 rounded-2xl">
              <input
                className="dark:bg-nft-black-1 bg-indigo-50 dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 shadow-md"
                type="file"
                ref={fileRef}
                onChange={scanQR}
              />
              <div className="mt-4 flex-row">
                {file && <img src={URL.createObjectURL(file)} alt="QR Code" />}
                {data && <InfoCard content={data} />}
              </div>
              <div className="flex flex-row-reverse">
                <Button
                  btnName="Scan QR"
                  classStyles="rounded-xl mt-7"
                  handleClick={() => fileRef.current.click()}
                />
              </div>
            </div>
          </div>
          <div className="mt-7 ml-1">
            <p className="font-poppins font-semibold dark:text-white text-nft-black-1 text-xl minlg:text-xl sm:text-sm">
              Scan your QR through camera
            </p>
          </div>
          <div className="sm:w-full md:w-4/5  dark:bg-nft-black-3  bg-indigo-100 rounded-2xl text-center p-10 minlg:m-8 mt-5 cursor-pointer shadow-md lg:w-1/2">
          
          <div className="font-poppins break-all font-semibold dark:text-white text-nft-black-1 text-md minlg:text-xl sm:text-md">
          {!startScan && (
          <div>
             <p className="font-poppins font-semibold break-all dark:text-white text-nft-black-1 text-xl minlg:text-xl sm:text-md">
                To scan the QR press the below button
            </p>
            <Button
              btnName="Scan QR"
              classStyles="rounded-lg mt-5"
              handleClick={() => setStartScan(true)}
            />
            </div>
            )}
              {startScan && (<QRscanner />)}
              

          </div>
        </div>
          <div className="ml-4 sm:ml-0">
            <Input
              title="Contract Address"
              placeholder="Enter the company contract address"
              handleClick={(e) => setCompanyContractAddress(e.target.value)}
            />
            <Input
              title="Product Id"
              placeholder="Enter Product Id"
              handleClick={(e) => setProductId(e.target.value)}
            />

            <div className="mt-8 flex justify-end">
              <Button
                btnName="Verify"
                classStyles="rounded-xl"
                handleClick={checkProduct}
              />
            </div>
            <div className="mt-7">
              {productStatus && (
                <InfoCard content={`Result : ${productStatus}`} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default verifyProduct;
