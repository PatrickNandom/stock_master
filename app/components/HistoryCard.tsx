import Image from "next/image";
import { HistoryItem } from "@/app/types/index";

type Props = {
  historyList: HistoryItem;
  backgroundColor?: string;
};

const actionTextMap = {
  sold: "was recently Sold",
  updated: "was recently updated",
  added: "was recently added",
};

const iconMap = {
  sold: "/notification_sold_icon.svg",
  updated: "/notification_updated_icon.svg",
  added: "/notification_add_icon.svg",
};

const HistoryCard = ({ historyList, backgroundColor }: Props) => {
  return (
    <div
      className={`flex items-center justify-between mb-4 p-4 bg-[${
        backgroundColor ?? "#FCDED6"
      }] rounded-[5px]`}
    >
      <div className="flex items-center gap-4">
        <Image
          src={iconMap[historyList.type]}
          alt={historyList.type}
          width={20}
          height={20}
        />

        <p className="text-sm text-gray-800">
          <span> Product ID:</span>
          <span className="font-bold">{historyList.productId}</span>
          {actionTextMap[historyList.type]}
        </p>
      </div>
      <div className="flex gap-3">
        <button className="text-sm text-orange-500  hover:cursor-pointer">
          See details
        </button>

        <span>{historyList.createdAt}</span>
      </div>
    </div>
  );
};

export default HistoryCard;
