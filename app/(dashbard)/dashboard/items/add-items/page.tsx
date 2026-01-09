"use client";
import CustomInput from "@/app/components/CustomInput ";
import ImagePicker from "@/app/components/ImagePicker";
import StepperInput from "@/app/components/StepperInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddItem = () => {
  const router = useRouter();
  const handleImage = (file: File | null) => {
    console.log("Selected file:", file);
  };

  const [quantity, setQuantity] = useState(40);
  const [price, setPrice] = useState(1500);

  return (
    <section className="flex flex-col ">
      <Image
        src="/auth_left-arrow.svg"
        className="hidden sm:block cursor-pointer self-start"
        alt="Back"
        width={20}
        height={20}
        priority
        onClick={() => router.back()}
      />

      <form action="" className="max-w-[750] mt-4 self-center w-full">
        <CustomInput
          label="Item name"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          align="justify-start"
          paddingY="py-1"
          borderRadius="rounded-[20]"
        />
        <CustomInput
          label="Item Id"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          align="justify-start"
          paddingY="py-1"
          borderRadius="rounded-[20]"
        />

        <CustomInput
          label="Brief Description"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          align="justify-start"
          paddingY="py-4"
          borderRadius="rounded-[20]"
        />
        <div className="flex flex-col gap-8 items-center sm:flex-row sm:justify-between p-6 mt-2">
          <ImagePicker label="Add image" onImageSelect={handleImage} />
        </div>

        <div className="flex flex-col gap-8 items-center sm:flex-row sm:justify-between p-6 mt-2">
          <StepperInput
            label="Quantity"
            value={quantity}
            variantColor="gray"
            onIncrement={() => setQuantity((prev) => prev + 1)}
            onDecrement={() => setQuantity((prev) => (prev > 0 ? prev - 1 : 0))}
            onChange={(val) => setQuantity(Number(val) || 0)}
          />

          <StepperInput
            label="Price"
            value={price}
            prefix="₦"
            variantColor="peach"
            onIncrement={() => setPrice((prev) => prev + 1)}
            onDecrement={() => setPrice((prev) => prev - 1)}
            onChange={(val) => setPrice(Number(val) || 0)}
          />
        </div>

        <div className="flex justify-center w-full mt-8">
          <button
            type="submit"
            className="min-w-[130] h-[38] bg-coral text-white rounded-lg px-6 text-sm font-medium hover:cursor-pointer transition-opacity hover:opacity-90"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};
export default AddItem;
