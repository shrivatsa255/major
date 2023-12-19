import React from "react";
import { InfoCard, Input, Button } from "../components";

const addProduct = () => {
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
    
            <Input
              title="Manufacturer Id"
              placeholder="Enter Manufacturers Id"
              handleClick={() => {}}
            />
            <Input
              title="Product Name"
              placeholder="Enter Product Name"
              handleClick={() => {}}
            />
            <Input
              title="Brand"
              placeholder="Enter Product Brand"
              handleClick={() => {}}
            />

            <div className="mt-8 flex justify-end">
              <Button
                btnName="Add Product"
                classStyles="rounded-xl"
                handleClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addProduct;
