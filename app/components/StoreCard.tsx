import Image from "next/image";
interface StoreCardProps {
  storeName: string;
  description: string;
  address: string;
  imageSrc: string;
}

const StoreCard: React.FC<StoreCardProps> = ({
  storeName,
  description,
  address,
  imageSrc,
}) => {
  return (
    <div className="flex self-center bg-[#283658] rounded-xl overflow-hidden  min-w-[900] h-40 font-sans text-white shadow-md">
      <div className="flex-1 p-5">
        <h2 className="m-0 font-semibold text-[1.3rem]">{storeName}</h2>
        <p className="mt-1 mb-2 text-[0.85rem] text-[#C1C6D1]">{description}</p>
        <hr className="border-0 border-b border-dotted border-[#56658A] mb-2" />
        <p className="font-semibold text-[0.75rem] text-[#9AA3B1]">{address}</p>
      </div>
      <div className="relative w-[140] overflow-hidden">
        <Image
          src={imageSrc}
          alt={storeName}
          width={140}
          height={140}
          className="h-full w-auto rounded-tr-xl rounded-br-xl object-cover"
        />
      </div>
    </div>
  );
};

export default StoreCard;
