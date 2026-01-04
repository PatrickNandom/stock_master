"use client";
import SearchBar from "./SearchBar";
import Image from "next/image";

const Topbar = () => {
  return (
    <header className="h-16 bg-linear-to-r from-[#F7AB97] to-[#071548] flex items-center justify-between px-6 text-white">
      <div className="flex items-center gap-4">
        <SearchBar value="" onChange={() => {}} />

        <div className="flex justify-center items-center w-8 h-8 bg-white rounded-4xl p-1">
          <Image
            src="/dashboard_topbar_notification_icon.svg"
            alt="notification"
            width={11}
            height={11}
          />
        </div>
      </div>

      <h1 className="text-xl text-white">Dashoard</h1>

      <div className="flex gap-4">
        <div className="flex justify-center w-8 h-8 items-center bg-white rounded-4xl p-1">
          <Image
            src="/dashboard_topbar_settings_icon.svg"
            alt="notification"
            width={11}
            height={11}
          />
        </div>

        <div className="w-[130] h-8  bg-white rounded-2xl px-2 flex justify-around items-center">
          <Image
            src="/dashboard_topbar_user_icon.svg"
            alt="user"
            width={11}
            height={11}
          />
          <p className="text-black">User</p>
        </div>
      </div>
    </header>
  );
};
export default Topbar;
