"use client";
import ProductRow from "@/app/components/ProductRow";
import { MOCK_PRODUCTS } from "@/app/data/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ItemsPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between gap-10">
        <Image
          src="/auth_left-arrow.svg"
          className="hidden sm:block cursor-pointer self-start"
          alt="Back"
          width={20}
          height={20}
          priority
          onClick={() => router.back()}
        />
        <Link
          href="/dashboard/items/add-items"
          className=" text-[#E67E5D] font-normal sm:text-xl sm:font-bold"
        >
          Add Item
        </Link>
      </div>
      <div className="mt-4">
        {MOCK_PRODUCTS.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
