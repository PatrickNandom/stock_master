import Image from "next/image";
import { ReactNode } from "react";
type Props = {
  label: string;
  value: string | ReactNode;
  imageSrc: string;
  bgColor?: string;
};

export default function StatCard({ label, value, imageSrc, bgColor }: Props) {
  return (
    <div
      className={`${bgColor} rounded-[5] pl-4 pr-2 flex justify-between m-w-[320] h-[80]`}
    >
      <Image
        src={imageSrc}
        alt={label}
        width={30}
        height={30}
        className="self-center"
      />
      <span className="text-sm self-center text-gray-600">{label}</span>
      <span className="w-[80] flex justify-center  items-center bg-white font-bold text-lg">
        {value}
      </span>
    </div>
  );
}
