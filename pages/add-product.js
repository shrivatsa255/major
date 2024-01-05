import { useState, useRef, useContext } from "react";
import { InfoCard, Input, Button } from "../components";
import Web3Modal from "web3modal";
import { ValidifyAddress, ValidifyAddressesABI } from "../Context/constents";
import { ethers } from "ethers";
import { QRCodeCanvas } from "qrcode.react";
import { ValContext } from "../Context/ValContext";

const addProduct = () => {
  const [companyContractAddress, setCompanyContractAddress] = useState("");
  const [productId, setProductId] = useState("");
  const [manufactureId, setManufactureId] = useState("");
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const { currentAccount } = useContext(ValContext);

  const [loading, setLoading] = useState(false);

  const [updateStatus, setUpdateStatus] = useState(false);

  const [value, setUrl] = useState("");
  
  const qrRef = useRef();
  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };


  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={companyContractAddress}
      size={300}
      bgColor={"#ffffff"}
      level={"H"}
    />
  );
  const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
      ValidifyAddress,
      ValidifyAddressesABI,
      signerOrProvider
    );

  const addProducts = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    try {
      console.log({productId})
      const list = JSON.parse("[" + parseInt(productId, 36) + "]");
      console.log(list)

      if (currentAccount && companyContractAddress && list) {
        setUpdateStatus("Validate the transaction through your wallet");
        let transaction = await contract.addproduct(
          currentAccount,
          companyContractAddress,
          list
        );
        setLoading(true);
        await transaction.wait();
        setUpdateStatus("Products Added");
        setLoading(false);
      } else {
        alert(
          "Please check that you are connected to a wallet,and that you have provided all the fields"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const qrCodeEncoder = () => {
  setUrl(e.target.value);
};


  return (
    <div className="flex-1 sm:px-4 p-12">
      <div className="md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-bold ml-4 sm:ml-0">
          Add Products
        </h1>
        <div className="mt-5 text-justify">
          <h3 className="font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-2xl font-semibold ml-4 sm:ml-0">
            Description
          </h3>
          <InfoCard
            content="Companies can add the products manufactured by them to the blockchain SMART-CONTRACT"
            warning="Add a product to the SMART-CONTRACT by providing the details of the company contract address and the product details"
            classStyles="text-md"
          />
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
            <Input
              title="Manufacturer Id"
              placeholder="Enter Manufacturers Id"
              handleClick={(e) => setManufactureId(e.target.value)}
            />
            <Input
              title="Product Name"
              placeholder="Enter Product Name"
              handleClick={(e) => setProductName(e.target.value)}
            />
            <Input
              title="Brand"
              placeholder="Enter Product Brand"
              handleClick={(e) => setProductBrand(e.target.value)}
            />
            <div className="mt-8 flex justify-end">
              <Button
                btnName="Add Product"
                classStyles="rounded-xl mb-7"
                handleClick={addProducts}
              />
            </div>
            <div className={!loading && "hidden"}>
              {currentAccount ? (
                <div>
                  {loading ? (
                    <InfoCard warning="Transaction is being executed..." />
                  ) : (
                    <InfoCard content={updateStatus} />
                  )}
                </div>
              ) : (
                <InfoCard warning="Connect to MetaMask Wallet" />
              )}
            </div>
            <div className="flex-col dark:bg-nft-black-3 p-5 bg-indigo-100 rounded-2xl">
              <div ref={qrRef} className="sm:flexCenter">{qrcode}</div>
                  <Input
                    type="text"
                    value={companyContractAddress}
                    handleClick={qrCodeEncoder}
                    placeholder="Address of Company"
                  />
                  <Button 
                    btnName="Download QR Code"
                    classStyles="rounded-xl mt-5"
                    disabled={!companyContractAddress}
                    handleClick={downloadQRCode}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default addProduct;
