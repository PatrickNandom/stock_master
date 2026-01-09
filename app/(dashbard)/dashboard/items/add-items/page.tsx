"use client";
import CustomInput from "@/app/components/CustomInput ";
import ImagePicker from "@/app/components/ImagePicker";
import PrimaryButton from "@/app/components/PrimaryButton";
import StepperInput from "@/app/components/StepperInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { is } from "zod/locales";

const AddItem = () => {
  const router = useRouter();
  const handleImage = (file: File | null) => {
    console.log("Selected file:", file);
  };
  const [isSaving, setIsSaving] = useState(false);
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
          placeholder="60924"
        />

        <CustomInput
          label="Brief Description"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          align="justify-start"
          paddingY="py-4"
          borderRadius="rounded-[20]"
          placeholder="Max 500 characters"
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

        <PrimaryButton
          label="Save"
          isLoading={isSaving}
          onClick={() => setIsSaving(!isSaving)}
        />
      </form>
    </section>
  );
};
export default AddItem;
