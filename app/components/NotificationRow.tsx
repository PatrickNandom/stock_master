import Image from "next/image";
import { NotificationItem } from "@/app/data/notifications";
import Link from "next/link";

type Props = {
  notification: NotificationItem;
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

const NotificationRow = ({ notification }: Props) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-dashed border-gray-300">
      <div className="flex items-center gap-4">
        <Image
          src={iconMap[notification.type]}
          alt={notification.type}
          width={20}
          height={20}
        />

        <p className="text-sm text-gray-800">
          <span> Product ID:</span>
          <span className="font-bold">{notification.productId}</span>
          {actionTextMap[notification.type]}
        </p>
      </div>

      <Link href="#">
        <button className="text-sm text-orange-500  hover:cursor-pointer">
          See details
        </button>
      </Link>
    </div>
  );
};

export default NotificationRow;
