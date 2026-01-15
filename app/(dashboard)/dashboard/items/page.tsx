"use client"
import ProductRow from "@/app/components/ProductRow";
import { MOCK_PRODUCTS } from "@/app/data/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-start gap-10">
        <Image
          src="/auth_left-arrow.svg"
          className="hidden sm:block cursor-pointer self-start"
          alt="Back"
          width={20}
          height={20}
          priority
          onClick={() => router.back()}
        />
        <Link href="/dashboard/items/add-items">Add Item</Link>
      </div>
      <div className="mt-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default page;
