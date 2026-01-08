import { FC } from "react";

import Image from "next/image";

type StoreProfileCardProps = {
  title?: string;
  label: string;
  phone: string;
  imageUrl?: string;

  backgroundColor?: string;
  titleColor?: string;
  textColor?: string;
};

const StoreProfileCard: FC<StoreProfileCardProps> = ({
  title = "Info",
  label,
  phone,
  imageUrl,
  backgroundColor = "bg-gray-200",
  titleColor = "text-orange-500",
  textColor = "text-gray-900",
}) => {
  return (
    <div
      className={`
        w-full
        max-w-[350]
        rounded-xl
        ${backgroundColor}
        p-6
        flex
        flex-col
        justify-around
        items-center
        opacity-100
        gap-4
        
      `}
    >
      <p className={`text-sm font-semibold ${titleColor}`}>{title}</p>

      <p className={`text-sm break-all ${textColor}`}>{label}</p>

      {imageUrl && (
        <Image src={imageUrl} alt="Profile" width={20} height={20} />
      )}

      <p className={`text-sm font-medium ${textColor}`}>{phone}</p>
    </div>
  );
};

export default StoreProfileCard;
