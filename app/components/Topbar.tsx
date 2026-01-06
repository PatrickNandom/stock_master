"use client";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Topbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="min-h-16 bg-linear-to-r from-[#F7AB97] to-[#071548]  flex  items-center sm:items-center sm:justify-between px-6 text-white">
      <div className="hidden  sm:flex sm:items-center sm:justify-between gap-4">
        <SearchBar value="" onChange={() => {}} />

        <div className="w-8 h-8 sm:hidden  lg:flex justify-center items-center  bg-white rounded-4xl p-1">
          <Image
            src="/dashboard_topbar_notification_icon.svg"
            alt="notification"
            width={11}
            height={11}
          />
        </div>
      </div>

      <h1 className="hidden sm:hidden lg:block sm:text-[12] md:text-sm lg:text-xl text-white">
        Dashoard
      </h1>

      <div className="hidden sm:hidden lg:flex gap-4">
        <div className="w-8 h-8 flex justify-center items-center bg-white rounded-4xl p-1">
          <Image
            src="/dashboard_topbar_settings_icon.svg"
            alt="settings"
            width={11}
            height={11}
          />
        </div>

        <div className="w-[134] max-h-8  bg-white rounded-2xl p-2 flex justify-around items-center">
          <Image
            src="/dashboard_topbar_user_icon.svg"
            alt="user"
            width={11}
            height={11}
          />
          <span className="truncate max-w-[120] text-[10px] text-black">
            User <br /> Position title
          </span>
        </div>
      </div>

      <button
        className="sm:hidden text-white text-2xl font-bold"
        aria-label="Open menu"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile menu*/}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-[#071548] text-white flex flex-col items-center gap-6 py-6 z-50 shadow-lg">
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link
            href="/dashboard/sales"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sales
          </Link>
          <Link
            href="/dashboard/items"
            onClick={() => setMobileMenuOpen(false)}
          >
            Items
          </Link>
          <Link
            href="/dashboard/notifications"
            onClick={() => setMobileMenuOpen(false)}
          >
            Notifications
          </Link>
          <Link
            href="/dashboard/history"
            className="text-white hover:text-peach"
            onClick={() => setMobileMenuOpen(false)}
          >
            History
          </Link>
          <Link
            href="/dashboard/store-profile"
            className="text-white hover:text-peach"
            onClick={() => setMobileMenuOpen(false)}
          >
            Store Profile
          </Link>
        </div>
      )}
    </header>
  );
};
export default Topbar;
