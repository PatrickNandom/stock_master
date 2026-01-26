"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ZodError, z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import PrimaryButton from "@/app/components/PrimaryButton";
import CustomInput from "@/app/components/CustomInput ";
import StaffRoleSelect from "@/app/components/StaffRoleSelect ";

const createStaffSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    role: z.enum(["ADMIN", "STAFF"], {
      message: "Please select a valid role",
    }),

    phone: z
      .string()
      .regex(/^\+?[0-9\s-]+$/, "Invalid phone number")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateStaffInput = z.infer<typeof createStaffSchema>;

const AddStaff = () => {
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CreateStaffInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "STAFF",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setErrors({});

    try {
      const validatedData = createStaffSchema.parse(formData);

      console.log(formData);

      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: validatedData.name,
          email: validatedData.email,
          password: validatedData.password,
          role: validatedData.role,
          phone: validatedData.phone,
        }),
      });

      const data: { error?: string } = await response.json();

      if (!response.ok) {
        setErrors({ general: data.error ?? "Something went wrong" });
        setIsSaving(false);
        return;
      }

      router.push("/dashboard/staffs");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const key = issue.path[0];
          if (key) fieldErrors[String(key)] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error creating staff:", error);
        setErrors({ general: "Failed to create staff member" });
      }
      setIsSaving(false);
    }
  };

  return (
    <section className="flex flex-col">
      <Image
        src="/auth_left-arrow.svg"
        alt="Back"
        width={20}
        height={20}
        priority
        className="hidden sm:block cursor-pointer self-start"
        onClick={() => router.back()}
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-187.5 mt-4 self-center w-full"
      >
        <CustomInput
          label="Staff name"
          type="text"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          placeholder="John Doe"
          borderRadius="rounded-[20px]"
          align="justify-start"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          error={errors.name}
        />

        <CustomInput
          label="Staff email"
          type="email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
          placeholder="email@example.com"
          borderRadius="rounded-[20px]"
          align="justify-start"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          error={errors.email}
        />

        <CustomInput
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+234 800 000 0000"
          borderRadius="rounded-[20px]"
          inputBackgroundColor="bg-[#FCDED6]"
          align="justify-start"
          inputBorderColor="border-[#FCDED6]"
          error={errors.phone}
        />

        <CustomInput
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="**********"
          borderRadius="rounded-[20px]"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          align="justify-start"
          error={errors.password}
        />

        <CustomInput
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          placeholder="**********"
          borderRadius="rounded-[20px]"
          inputBackgroundColor="bg-[#FCDED6]"
          align="justify-start"
          inputBorderColor="border-[#FCDED6]"
          error={errors.confirmPassword}
        />

        <StaffRoleSelect
          label="Role"
          value={formData.role}
          onChange={(role: "ADMIN" | "STAFF") =>
            setFormData({ ...formData, role })
          }
          borderRadius="rounded-[20px]"
          inputBackgroundColor="bg-[#FCDED6]"
          inputBorderColor="border-[#FCDED6]"
          error={errors.role}
        />

        <AlertDialog
          open={!!errors.general}
          onOpenChange={(open) => !open && setErrors({})}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error Creating Staff</AlertDialogTitle>
              <AlertDialogDescription className="text-red-600">
                {errors.general}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setErrors({})}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <PrimaryButton label="Confirm" isLoading={isSaving} type="submit" />
      </form>
    </section>
  );
};

export default AddStaff;
