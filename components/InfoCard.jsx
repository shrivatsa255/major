import { useRouter } from "next/router";
import { Button } from "../components";
import Image from "next/legacy/image";
const InfoCard = ({
  content,
  warning,
  name,
  link,
  linkTo,
  contract,
  image,
  classStyles,
}) => {
  const router = useRouter();
  return (
    <div className="flex-1 min-w-215  max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-indigo-100 rounded-2xl m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-xl p-10">
      <div className="relative w-full h-full sm:h-50 xs:h-66 minmd:h-60 minlg:h-300 overflow-hidden">
        <h1 className="font-poppins font-semibold dark:text-white text-nft-black-1 text-xl minlg:text-xl sm:text-sm xs:text-xs">
          {content}
        </h1>

        {link && (
          <div className="flexCenter flex flex-col">
            <div className="relative flexCenter mt-6 sm:h-36 sm:w-none xs:h-35 minmd:h-60 minlg:h-300 h-100 w-100 rounded-xl overflow-hidden">
              <Image
                src={image}
                width={241}
                height={230}
                objectFit="cover"
                alt="image"
              />
            </div>
            <Button
              btnName={name}
              classStyles="rounded-2xl p-8 mt-7"
              handleClick={() => router.push(linkTo)}
            />
          </div>
        )}
      </div>
      <h2
        className={`${classStyles} mt-5 font-poppins font-bold text-red-500 sm:text-xs minlg:text-xl`}
      >
        {warning}
      </h2>
    </div>
  );
};

export default InfoCard;
