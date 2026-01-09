"use client";

import StoreCard from "@/app/components/StoreCard";
import StoreProfileCard from "@/app/components/StoreProfileCard";
import Image from "next/image";
import NotificationRow from "@/app/components/NotificationRow";
import { notifications } from "@/app/data/data";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <section>
      <div className="flex items-center justify-center gap-4 w-auto">
        <Image
          src="/auth_left-arrow.svg"
          className="hidden sm:block cursor-pointer self-start"
          alt="Back"
          width={20}
          height={20}
          priority
          onClick={() => router.back()}
        />

        <StoreCard
          storeName="Spring Net Store"
          description="Household items sales"
          address="123 Fashion Ave, New York, NY"
          imageSrc="/dashboard_store_card_icon.svg"
        />
      </div>

      <div className="flex mt-8 items-center justify-center max-w-auto gap-8 flex-wrap">
        <StoreProfileCard
          label="springstore@gmail.com"
          phone="08096238590"
          imageUrl="/dashboard_topbar_user_icon.svg"
        />
        <StoreProfileCard
          title="Location"
          label="Jos, Plateau State"
          phone="Rantya Road"
          imageUrl="/dashboard_store_profile_location.svg"
          backgroundColor="bg-[#FCDED6]"
        />
        <StoreProfileCard
          title="Product Type"
          label="Household Items"
          phone="All types"
          imageUrl="/dashboard_store_fork.svg"
        />
      </div>
      <div className="mt-8 max-w-[1000] mx-auto w-full">
        <div className="flex justify-between px-2">
          <p className="font-semibold text-[#303C67]">Recent Activities</p>
          <button className="bg-gray-400 text-[#782C18] text-lg rounded-2xl px-2">
            History
          </button>
        </div>

        <div className="bg-[#FCDED6] rounded-[5] mt-8 p-4">
          {notifications.map((notification) => (
            <NotificationRow
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
