import React from 'react';
import { InfoCard, Input, Button } from "../components";
const verifyProduct = () => {
  return (
    <div className="flex-1 sm:px-4 p-12">
      <div className="md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-bold ml-4 sm:ml-0">Verify Products</h1>
        <div className="mt-5 text-justify">
          <h3 className="font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-2xl font-semibold ml-4 sm:ml-0">
            Description
          </h3>
          <InfoCard
            content="Consumers can verify their products manufactured by a specific company through the blockchain SMART-CONTRACT"
            warning="Verify the product in the SMART-CONTRACT by providing the company CONTRACT ADDRESS and the PRODUCT ID"
            classStyles="text-md"
          />
          <div className="ml-4">
            <Input
              title="Contract Address"
              placeholder="Enter the company contract address"
              handleClick={() => {}}
            />
            <Input
              title="Product Id"
              placeholder="Enter Product Id"
              handleClick={() => {}}
            />
            <div className="mt-8 flex justify-end">
              <Button
                btnName="Verify"
                classStyles="rounded-xl"
                handleClick={() => {}}
              />
            </div>
            <div>
              Scan Your QR code
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default verifyProduct
