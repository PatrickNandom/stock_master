"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import CustomInput from "@/app/components/CustomInput ";
import PrimaryButton from "@/app/components/PrimaryButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const registerSchema = z
  .object({
    businessName: z.string().min(2, "Business name is required"),
    address: z.string().min(3, "Address is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Pasword must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

const SignUpPage = () => {
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    businessName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterForm, string>>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name as keyof RegisterForm]) {
      setErrors({ ...errors, [name]: undefined });
    }

    if (apiError) setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    const validation = registerSchema.safeParse(form);
    if (!validation.success) {
      const newErrors: Partial<Record<keyof RegisterForm, string>> = {};
      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterForm;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(
          data?.message ||
            data?.error ||
            "Registration failed. Please try again.",
        );
        setIsLoading(false);
        return;
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setApiError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="py-4 min-h-screen px-8 flex items-center justify-center bg-linear-to-r from-[#F7AB97] to-[#071548]">
      <form
        className="flex flex-col items-center justify-evenly relative w-full max-w-150 min-h-150 sm:max-w-187.5 lg:max-w-200 sm:min-h-187.5 bg-[#E9E3E399] rounded-4xl p-10 sm:px-12"
        onSubmit={handleSubmit}
        noValidate
      >
        <Link href="/">
          <Image
            src="/stockmaster_logo.svg"
            className="hidden sm:block sm:mb-4"
            alt="App logo"
            width={150}
            height={150}
          />
        </Link>

        <Image
          src="/auth_left-arrow.svg"
          className="cursor-pointer"
          alt="Back arrow"
          width={20}
          height={20}
          onClick={() => router.back()}
        />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-10">
          Sign Up
        </h1>

        {/* Error Dialog */}
        <AlertDialog open={!!apiError} onOpenChange={() => setApiError("")}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Registration Error</AlertDialogTitle>
              <AlertDialogDescription className="text-red-600">
                {apiError}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setApiError("")}>
                OK
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 w-full mb-4">
            <CustomInput
              label="Business Name"
              type="text"
              name="businessName"
              inputBackgroundColor="bg-white"
              inputBorderColor="border-orange-500"
              value={form.businessName}
              onChange={handleChange}
              error={errors.businessName}
              disabled={isLoading}
            />
            <CustomInput
              label="Address"
              type="text"
              name="address"
              inputBackgroundColor="bg-white"
              inputBorderColor="border-orange-500"
              value={form.address}
              onChange={handleChange}
              error={errors.address}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 w-full mb-4">
            <CustomInput
              label="Email Address"
              type="email"
              name="email"
              inputBackgroundColor="bg-white"
              inputBorderColor="border-orange-500"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
              disabled={isLoading}
            />
            <CustomInput
              label="Phone No."
              type="text"
              name="phone"
              inputBackgroundColor="bg-white"
              inputBorderColor="border-orange-500"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 w-full mb-4">
            <CustomInput
              label="Password"
              type="password"
              name="password"
              inputBackgroundColor="bg-white"
              inputBorderColor="border-orange-500"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
              disabled={isLoading}
            />
            <CustomInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              inputBackgroundColor="bg-white"
              inputBorderColor="border-orange-500"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              disabled={isLoading}
            />
          </div>
        </div>

        <PrimaryButton label="Confirm" isLoading={isLoading} type="submit" />

        <div className="my-8">
          <p className="font-medium text-gray-700">Already have an account?</p>
          <Link href="/login">
            <p className="flex justify-center cursor-pointer font-medium text-coral">
              Login
            </p>
          </Link>
        </div>

        <Image
          src="/auth_crown.svg"
          alt="auth icon 1"
          className="hidden sm:block absolute -top-10 -right-14"
          width={100}
          height={80}
        />
        <Image
          src="/auth_S.svg"
          alt="auth icon 2"
          className="hidden sm:block absolute -bottom-4 -left-5"
          width={40}
          height={100}
        />
      </form>
    </main>
  );
};

export default SignUpPage;
