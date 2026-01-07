"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  iconPath: string;
}

const links: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    iconPath: "/dashboard_nav_icon.svg",
  },
  {
    label: "Sales",
    href: "/dashboard/sales",
    iconPath: "/dashboard_nav_sales_icon.svg",
  },
  {
    label: "Items",
    href: "/dashboard/items",
    iconPath: "/dashboard_nav_items_icon.svg",
  },
  {
    label: "Notifications",
    href: "/dashboard/notifications",
    iconPath: "/dashboard_nav_notification_icon.svg",
  },
  {
    label: "History",
    href: "/dashboard/history",
    iconPath: "/dashboard_nav_history_icon.svg",
  },
  {
    label: "Store Profile",
    href: "/dashboard/store-profile",
    iconPath: "/dashboard_nav_store_profile_icon.svg",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside
      className="max-w-50  hidden bg-[#CDD0DA] sm:block border-r border-gray-300 sticky top-0 sm:min-h-screen"
    >
      <div className="mb-8 h-16 bg-[#F7AB97] font-bold text-xl flex items-center justify-around">
        <Link href="/">
          <Image
            src="/stockmaster_logo.svg"
            alt="StockMaster Logo"
            width={50}
            height={50}
          />
        </Link>
        <button className=" text-white text-2xl font-bold">☰</button>
      </div>

      <nav className="space-y-2 px-4">
        {links.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded sm:flex sm:items-center sm:gap-8 sm:font-medium block transition-colors ${
                isActive
                  ? "bg-slate text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div
                className="w-3 h-3"
                style={{
                  maskImage: `url(${link.iconPath})`,
                  WebkitMaskImage: `url(${link.iconPath})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  backgroundColor: isActive ? "#F7AB97" : "#374151",
                }}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
