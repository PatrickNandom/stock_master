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
       <div className="flex items-baseline justify-between gap-10 mb-4">
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
                className="text-xl text-[#E67E5D] font-bold flex"
              >
                <span className="bg-[#E67E5D] flex items-center justify-center rounded-full mr-2 w-6 h-6">
                  <Image
                    src="/dashboard_add_icon.svg"
                    alt="add-icon"
                    height={20}
                    width={20}
                  />
                </span>{" "}
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
