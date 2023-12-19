import React from 'react'
import { InfoCard } from '../components'
const createContract = () => {
  return (
    <div className="flex-1 sm:px-4 p-12">
      <div className="md:w-full">
      <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-bold ml-4 sm:ml-0">Create Contract</h1>
        <div className="mt-5 text-justify">
          <h3 className="font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-2xl font-semibold ml-4 sm:ml-0">Description</h3>
              <InfoCard
            content="Companies can create customized SMART-CONTRACTS of their own which will serve as a registry of products"
            warning="Click the above button to Create the company's SMART-CONTRACT"
            classStyles="text-md"
            link={true}
            image='/fetch.png'
            name="Create Contract"
            />
        </div>
      </div>
    </div>
  )
}

export default createContract
