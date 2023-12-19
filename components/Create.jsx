import { useRouter } from "next/router";
import { Button } from "../components";
import Image from "next/legacy/image";
const Create = ({ content, warning, name, contract, image, classStyles }) => {
  const router = useRouter();
  return (
    <div className="relative flex justify-center md:flex-col min-h-screen overflow-hidden">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <Image
            src="/contract.png"
            objectFit="cover"
            className="rounded-xl shadow-lg"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="flex-1 justify-start sm:px-4  p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            Description
          </h2>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="w-full border-b border-nft-black-1 dark:border-nft-gray-1 flex flex-row">
          </div>
          <div className="mt-3">
            <p className="font-poppins dark:text-white text-nft-black-1 text-base  font-normal">
              In this innovative project, companies are empowered with a groundbreaking feature that allows them to effortlessly create their own smart contracts with a simple click of a button. This functionality represents a significant leap forward in blockchain technology accessibility, as it streamlines and democratizes the smart contract creation process. Traditionally, the development and deployment of smart contracts have been intricate tasks, often requiring specialized knowledge and coding expertise. However, by integrating a user-friendly interface into the platform, companies can now initiate the creation of their custom smart contracts seamlessly. This feature not only enhances the efficiency of blockchain adoption but also democratizes the utilization of smart contracts, enabling a broader range of businesses to harness the benefits of decentralized and automated transactions with unparalleled ease."
            </p>
          </div>
          <Button
            btnName="Create Contract"
            classStyles="rounded-2xl p-8 mt-7"
            handleClick={CreateContract}
          />
        </div>
      </div>
    </div>
  );
};

export default Create;
