"use client";
import CustomInput from "@/app/components/CustomInput ";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginInput, loginSchema } from "@/lib/validations/auth";
import PrimaryButton from "@/app/components/PrimaryButton";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  //handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    // Clear server error when user starts typing
    setServerError(null);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof LoginInput;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle different error response structures
        const errorMessage =
          data?.error?.message ||
          data?.message ||
          data?.error ||
          "Login failed. Please check your credentials.";

        setServerError(errorMessage);
        setIsLoading(false); // Reset loading state on error
        return; // Stop execution here
      }

      // Only execute if response is OK
      console.log("Login successful:", data);

      // Navigate to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      console.error("Login error:", err);
      setServerError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
      setIsLoading(false);
    }
    // Note: Don't set isLoading to false here if navigation is successful
    // The page will unmount during navigation
  };

  return (
    <main className="px-8 min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F7AB97] to-[#071548]">
      <form
        className="flex flex-col items-center justify-evenly relative w-full max-w-[500px] min-h-[500px] sm:max-w-[600px] sm:min-h-[600px] lg:max-w-[800px] bg-[#E9E3E399] rounded-[20px] p-10"
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
            loading="eager"
          />
        </Link>

        <Image
          src="/auth_left-arrow.svg"
          className="cursor-pointer block absolute top-4 left-4"
          alt="Back arrow"
          width={20}
          height={20}
          loading="eager"
          onClick={() => router.back()}
        />

        <h1 className="text-lg sm:text-lg md:text-2xl lg:text-3xl font-semibold mb-6">
          Login
        </h1>

        {serverError && (
          <div className="w-full p-3 mb-4 text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg text-center">
            {serverError}
          </div>
        )}

        <div className="w-full max-w-md space-y-4">
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
            required
            disabled={isLoading}
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            inputBackgroundColor="bg-white"
            inputBorderColor="border-orange-500"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="current-password"
            required
            disabled={isLoading}
          />
        </div>

        <PrimaryButton label="Confirm" isLoading={isLoading} type="submit" />

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
// "use client";
// import CustomInput from "@/app/components/CustomInput ";
// import React, { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { LoginInput, loginSchema } from "@/lib/validations/auth";
// import PrimaryButton from "@/app/components/PrimaryButton";
// import Link from "next/link";

// type FormData = {
//   email: string;
//   password: string;
// };

// const LoginPage = () => {
//   const router = useRouter();
//   const [form, setForm] = useState<FormData>({ email: "", password: "" });
//   const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
//     {},
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [serverError, setServerError] = useState<string | null>(null);
//   //handle change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     setErrors((prev) => ({
//       ...prev,
//       [name]: undefined,
//     }));
//   };

//   // Handle form submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setServerError(null);

//     const result = loginSchema.safeParse(form);

//     if (!result.success) {
//       const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
//       result.error.issues.forEach((issue) => {
//         const key = issue.path[0] as keyof LoginInput;
//         fieldErrors[key] = issue.message;
//       });
//       setErrors(fieldErrors);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(result.data),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error);
//       }

//       router.push("/dashboard");
//       router.refresh();
//     } catch (err: unknown) {
//       setServerError(
//         err instanceof Error ? err.message : "An unexpected error occurred",
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <main className="px-8 min-h-screen flex items-center justify-center bg-linear-to-r from-[#F7AB97] to-[#071548]">
//       <form
//         className="flex flex-col items-center justify-evenly relative w-125 h-[500] sm:w-[600] sm:h-[600] lg:w-[800] bg-[#E9E3E399] rounded-[20] p-10"
//         onSubmit={handleSubmit}
//         noValidate
//       >
//         <Link href="/">
//           <Image
//             src="/stockmaster_logo.svg"
//             className="hidden sm:block sm:mb-4"
//             alt="App logo"
//             width={150}
//             height={150}
//             loading="eager"
//           />
//         </Link>

//         <Image
//           src="/auth_left-arrow.svg"
//           className="cursor-pointer block"
//           alt="App logo"
//           width={20}
//           height={20}
//           loading="eager"
//           onClick={() => router.back()}
//         />

//         <h1 className="text-lg sm:text-lg md:text-2xl lg:text-3xl font-semibold mb-6">
//           Login
//         </h1>

//         {serverError && (
//           <div className="w-full p-3 mb-4 text-sm text-red-600 bg-red-100 border border-red-200 rounded-lg text-center">
//             {serverError}
//           </div>
//         )}

//         <div className="w-full max-w-md space-y-4">
//           <CustomInput
//             label="Email Address"
//             type="email"
//             name="email"
//             inputBackgroundColor="bg-white"
//             inputBorderColor="border-orange-500"
//             value={form.email}
//             onChange={handleChange}
//             error={errors.email}
//             autoComplete="email"
//             required
//           />
//           <CustomInput
//             label="Password"
//             type="password"
//             name="password"
//             inputBackgroundColor="bg-white"
//             inputBorderColor="border-orange-500"
//             value={form.password}
//             onChange={handleChange}
//             error={errors.password}
//             autoComplete="current-password"
//             required
//           />
//         </div>

//         <PrimaryButton label="Confirm" isLoading={isLoading} type="submit" />

//         <div className="my-8">
//           <p className="font-medium text-gray-700">Forgotten password?</p>
//           <p className="flex justify-center cursor-pointer font-medium text-coral">
//             Reset
//           </p>
//         </div>

//         <Image
//           src="/auth_crown.svg"
//           alt="auth icon 1"
//           className="hidden sm:block absolute -top-10 -right-14"
//           width={100}
//           height={80}
//         />
//         <Image
//           src="/auth_S.svg"
//           alt="auth icon 2"
//           className="hidden sm:block absolute -bottom-1 -left-12"
//           width={40}
//           height={100}
//         />
//       </form>
//     </main>
//   );
// };

// export default LoginPage;
