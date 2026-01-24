"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { links } from "@/app/data/data";
import ConfirmDialog from "./ConfirmDialog";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      router.push("/login");
      router.refresh();
    }
  };

  return (
    <>
      <aside className="max-w-50 hidden bg-[#CDD0DA] sm:block border-r border-gray-300 sticky top-0 sm:min-h-screen">
        <div className="mb-8 h-16 bg-[#F7AB97] font-bold text-xl flex items-center justify-around">
          <Link href="/">
            <Image
              src="/stockmaster_logo.svg"
              alt="StockMaster Logo"
              width={50}
              height={50}
            />
          </Link>
          <button className="text-white text-2xl font-bold hidden lg:block">☰</button>
        </div>
        <nav className="space-y-2 px-4">
          {links.map((link) => {
            const isActive = pathname === link.href;

            if (link.isLogout) {
              return (
                <button
                  key={link.href}
                  onClick={handleLogoutClick}
                  className="w-full px-4 py-2 rounded sm:flex sm:items-center hover:cursor-pointer sm:gap-8 sm:font-medium transition-colors text-left text-gray-700 hover:bg-gray-100"
                >
                  <div
                    className="w-4 h-4"
                    style={{
                      maskImage: `url(${link.iconPath})`,
                      WebkitMaskImage: `url(${link.iconPath})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      backgroundColor: "#374151",
                    }}
                  />
                  <span className="hidden lg:block"> {link.label}</span>
                </button>
              );
            }

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
                <span className="hidden lg:block"> {link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <ConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogoutConfirm}
        title="Confirm Logout"
        description="Are you sure you want to logout? You will need to login again to access your account."
        confirmText="Yes, Logout"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

export default Sidebar;
