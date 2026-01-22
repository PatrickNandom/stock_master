"use client";
import HistoryCard from "@/app/components/HistoryCard";
import { MOCK_NOTIFICATIONS } from "@/app/data/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
const NotificationPage = () => {
  const router = useRouter();
  return (
    <section>
      <Image
        src="/auth_left-arrow.svg"
        className="hidden sm:block cursor-pointer self-start"
        alt="Back"
        width={20}
        height={20}
        priority
        onClick={() => router.back()}
      />

      <div className="mt-4">
        {MOCK_NOTIFICATIONS.map((history) => (
          <HistoryCard
            key={history.id}
            backgroundColor="#CDD0DA"
            historyList={history}
          />
        ))}
      </div>
    </section>
  );
};

export default NotificationPage;
