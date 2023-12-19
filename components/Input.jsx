import React, { useContext } from "react";

const Input = ({ inputType, title, placeholder, handleClick }) => {

  return (
    <div className="mt-10 w-full min-w-215">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
        {title}
      </p>
      {inputType === "number" ? (
        <div className="dark:bg-nft-black-1 bg-indigo-50 dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row shadow-md">
          <input
            type="number"
            className="flex w-full dark:bg-nft-black-1 bg-indigo-50 outline-none"
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            ETH
          </p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          rows={10}
          className="dark:bg-nft-black-1 bg-indigo-50 dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 shadow-md"
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className="dark:bg-nft-black-1 bg-indigo-50 dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 shadow-md"
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;
