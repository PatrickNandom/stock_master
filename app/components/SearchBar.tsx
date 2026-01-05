"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative max-w-30 h-10">
      <Image
        src="/dashboard_topbar_search_icon.svg"
        alt="Search"
        width={11}
        height={11}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />

      <input
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="w-full h-full rounded-3xl bg-white text-black py-2 pl-10 pr-3 outline-none"
      />
    </div>
  );
};

export default SearchBar;
