"use client";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserData } from "../types";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "./ConfirmDialog";

const Topbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname: string = usePathname();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const routeTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/sales": "Sales",
    "/dashboard/staffs": "Staffs",
    "/dashboard/items": "Items",
    "/dashboard/notifications": "Notifications",
    "/dashboard/history": "History",
    "/dashboard/store-profile": "Store Profile",
    "/dashboard/items/add-items": "Add Item",
    "/dashboard/staffs/add-staff": "Add Staff",
  };
  const title: string = routeTitles[pathname] ?? "Dashboard";

  return (
    <header className="min-h-16 bg-linear-to-r from-[#F7AB97] to-[#071548] flex items-center sm:items-center sm:justify-between px-6 text-white">
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
        {title}
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

        <div className="w-[134] max-h-8  bg-white rounded-2xl p-3 flex justify-evenly items-center">
          <Image
            src="/dashboard_topbar_user_icon.svg"
            alt="user"
            width={16}
            height={16}
          />
          <span className="truncate max-w-[120] text-[10px] text-black">
            {isLoading ? (
              <span>Loading ...</span>
            ) : (
              <span>
                <span className="font-bold text-center">User </span>
                <span>{user?.role}</span>
              </span>
            )}
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
        <div className="absolute top-15.5 left-0 w-full bg-[#071548] text-white flex flex-col items-center gap-6 py-6 z-50 shadow-lg sm:hidden">
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link
            href="/dashboard/staffs"
            onClick={() => setMobileMenuOpen(false)}
          >
            Staffs
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
          <Button
            className="text-white hover:text-peach"
            onClick={() => handleLogoutClick()}
          >
            Logout
          </Button>
        </div>
      )}
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
    </header>
  );
};
export default Topbar;
