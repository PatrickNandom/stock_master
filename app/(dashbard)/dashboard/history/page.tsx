"use client";
import Image from "next/image";
import { historyLists } from "@/app/data/data";

import { useRouter } from "next/navigation";
import HistoryCard from "@/app/components/HistoryCard";
const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <section>
      <div className="flex gap-4">
        <Image
          src="/auth_left-arrow.svg"
          className="hidden sm:block cursor-pointer self-start"
          alt="Back"
          width={20}
          height={20}
          priority
          onClick={() => router.back()}
        />
        <p className="text-[#303C67] font-semibold">Recent Activities</p>
      </div>

      <div className="mt-4">
        {historyLists.map((history) => (
          <HistoryCard key={history.id} historyList={history} />
        ))}
      </div>

      <p className="text-[#303C67] font-semibold py-4">Old Activities</p>

      <div>
        {historyLists.map((history) => (
          <HistoryCard key={history.id} historyList={history} />
        ))}
      </div>
    </section>
  );
};

export default page;
