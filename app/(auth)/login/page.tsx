"use client";
import CustomInput from "@/app/components/CustomInput ";
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";

// Define schema
const schema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .refine((val) => val === "" || /^\S+@\S+\.\S+$/.test(val), {
      message: "Invalid email address",
    }),
  password: z.string().nonempty("Password is required"),
});

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  // Form state
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  // Error state
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field on change
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      // Map errors from zod
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && typeof key === "string") {
          fieldErrors[key as keyof FormData] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // Validation passed
    console.log("Form data is valid:", form);

    // TODO: Submit to backend when ready
  };

  return (
    <main className="px-8 min-h-screen flex items-center justify-center bg-linear-to-r from-[#F7AB97] to-[#071548]">
      <form
        className="flex flex-col items-center justify-evenly relative w-125 h-[500] sm:w-[600] sm:h-[600] lg:w-[800] bg-[#E9E3E399] rounded-[20] p-10"
        onSubmit={handleSubmit}
        noValidate
      >
        <Image
          src="/stockmaster_logo.svg"
          className="hidden sm:block sm:mb-4"
          alt="App logo"
          width={150}
          height={150}
          loading="eager"
        />

        <Image
          src="/auth_left-arrow.svg"
          className="cursor-pointer hidden sm:block"
          alt="App logo"
          width={20}
          height={20}
          loading="eager"
        />

        <h1 className="text-lg sm:text-lg md:text-2xl lg:text-3xl font-semibold mb-6">
          Login
        </h1>

        <div className="w-full max-w-md space-y-4">
          <CustomInput
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
            required
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            required
          />
        </div>
        <Link href="/dashboard">
          <button
            type="submit"
            className="min-w-[130] min-h-[38] bg-coral cursor-pointer text-white rounded-lg px-6 text-sm font-medium hover:opacity-90 transition mt-6"
          >
            Confirm
          </button>
        </Link>

        <div className="my-8">
          <p className="font-medium text-gray-700">Forgotten password?</p>
          <p className="flex justify-center cursor-pointer font-medium text-coral">
            Reset
          </p>
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
          className="hidden sm:block absolute -bottom-1 -left-12"
          width={40}
          height={100}
        />
      </form>
    </main>
  );
};

export default LoginPage;
