import Image from "next/legacy/image";
import { useTheme } from 'next-themes';

import { Button } from '.';

const FooterLinks = ({ heading, items }) => (
  <div className="flex-1 justify-start items-start">
    <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10 ">{heading}</h3>
    {items.map((item, index) => (
      <p key={index} className="font-poppins  dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3">
        {item}
      </p>
    ))}
  </div>
);
const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="flexCenter  flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter sm:mt-4 cursor-pointer">
            <Image src="/logo.png" objectFit="contain" width={50} height={50} alt="logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">Validify</p>
          </div>
          <p className="font-poppins font font-semibold dark:text-white text-nft-black-1 text-base mt-6">Get The Latest Updates</p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white dark:border-nft-black-2 border-nft-gray-2 rounded-md">
            <input type="email" placeholder="Enter your Email" className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none" />
            <div className="flex-initial">
              <Button btnName="Email Us" classStyles="rounded-md" />
            </div>
          </div>
        </div>
        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks heading="Validify" items={[]} />
          <FooterLinks heading="Support" items={[]} />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">@Validify, INC All Rights Reserved</p>
          {/* <div className="flex flex-row sm:mt-4">
            {['/instagram.png', '/twitter.png', '/telegram.png', '/discord.png'].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={index}>
                <Image src={image} objectFit="contain" width={24} height={24} alt="social" className={theme === 'light' ? 'filter invert' : undefined} />
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
