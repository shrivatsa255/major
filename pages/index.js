import Image from "next/legacy/image"
import styles from '../styles/Home.module.css'
import {useTheme} from 'next-themes'
import { useEffect,useRef,useContext,useState } from 'react'
import { Banner,Button,InfoCard } from '../components'

export default function Home() {

const [hideButtons, setHideButtons] = useState(false);

const parentRef = useRef(null);
const scrollRef = useRef(null);
const { theme } = useTheme();

  const handelScroll = (direction) => {
  const { current } = scrollRef;
  const scrollCount = window.innerWidth > 1800 ? 270 : 300;
  if (direction === "left") {
    current.scrollLeft -= scrollCount;
  } else {
    current.scrollLeft += scrollCount;
  }
};
const isScrollable = () => {
  const { current } = scrollRef;
  const { current: parent } = parentRef;

  if (current?.scrollWidth >= parent?.offsetWidth) {
    setHideButtons(false);
  } else {
    setHideButtons(true);
  }
};
useEffect(() => {
  isScrollable();
  window.addEventListener("resize", isScrollable);
  return () => {
    window.removeEventListener("resize", isScrollable);
  };
});

  return (
    <div className="flex justify-center sm:px-4 p-12">
    <div className="w-full minmd:w-4/5">
    <Banner parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-2xl" childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left" name="Validify a Blockchain Solutions for Transparent Product Verification"/>
    <InfoCard
      content='VALIDIFY is a platform where Companies can register to receive a customized smart contract, which will serve
            as a registry of all products produced by the company.
            This smart contract will be made publicly accessible, allowing any individual to verify the authenticity
            of a product by checking its presence on the corresponding smart contract.'
      warning='Note: Only contract owners can add products to their contract.'
      link={false}
      classStyles='text-2xl text-center'
    />
    <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 sm:ml-0">Instructions</h1>
    <div className = "relative flex-1 max-w-full flex mt-3" ref = { parentRef }>
    
 

<div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>

       <InfoCard
        content='Create Smart Contract'
        name='Create'
        link={true}
        linkTo='/create-contract'
        image='/contract.png'
       />
       <InfoCard
        content='Fetch Contract Address'
        name='Fetch'
        link={true}
        linkTo='/get-contract'
        image='/fetch.png'
       />
       <InfoCard
        content='Add Product'
        name='Add'
        link={true}
        linkTo='/add-product'
        image='/addProduct.png'
       />
       <InfoCard
        content='Verify Authenticity'
        name='Verify'
        link={true}
        linkTo='/verify-product'
        image='/verify.png'
       />
       {
  !hideButtons && (
    <>
      <div
        onClick={() => {
          handelScroll("left");
        }}
        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 left-0 cursor-pointer"
      >
        <Image
          src='/left.png'
          layout="fill"
          objectFit="contain"
          alt="leftarrow"
          className={theme === "light" ? "filter invert" : undefined}
        />
      </div>
      <div
        onClick={() => {
          handelScroll("right");
        }}
        className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 right-0 cursor-pointer"
      >
        <Image
          src='/right.png'
          layout="fill"
          objectFit="contain"
          alt="rightarrow"
          className={theme === "light" ? "filter invert" : undefined}
        />
      </div>
    </>
  )}

</div>
    </div>
    </div>
    </div>
  )
}
