"use client";
import React, { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomInput from "@/app/components/CustomInput ";
import PrimaryButton from "@/app/components/PrimaryButton";

// Validation schema
const schema = z
  .object({
    businessName: z.string().nonempty("Business name is required"),
    address: z.string().nonempty("Address is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    phone: z.string().nonempty("Phone number is required"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    businessName: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setApiError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);

    if (!result.success) {
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

    setErrors({});
    setApiError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: result.data.businessName,
          address: result.data.address,
          email: result.data.email,
          phone: result.data.phone,
          password: result.data.password,
          confirmPassword: result.data.confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data?.error?.message ||
          data?.message ||
          data?.error ||
          "Registration failed. Please try again.";

        setApiError(errorMessage);
        setIsLoading(false);
        return;
      }

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setApiError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="py-4 min-h-screen px-8 flex items-center justify-center bg-gradient-to-r from-[#F7AB97] to-[#071548]">
      <form
        className="flex flex-col items-center justify-evenly relative w-full max-w-[600px] min-h-[600px] sm:max-w-[750px] lg:max-w-[800px] sm:min-h-[750px] bg-[#E9E3E399] rounded-[20px] p-10 sm:px-12"
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
          className="cursor-pointer "
          alt="Back arrow"
          width={20}
          height={20}
          onClick={() => router.back()}
        />

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-10">
          Sign Up
        </h1>

        {apiError && (
          <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {apiError}
          </div>
        )}

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

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { z } from "zod";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import CustomInput from "@/app/components/CustomInput ";
// import PrimaryButton from "@/app/components/PrimaryButton";

// // Validation schema
// const schema = z
//   .object({
//     businessName: z.string().nonempty("Business name is required"),
//     address: z.string().nonempty("Address is required"),
//     email: z
//       .string()
//       .nonempty("Email is required")
//       .email("Invalid email address"),
//     phone: z.string().nonempty("Phone number is required"),
//     password: z
//       .string()
//       .nonempty("Password is required")
//       .min(6, "Password must be at least 6 characters"),
//     confirmPassword: z.string().nonempty("Confirm Password is required"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
//   });

// type FormData = z.infer<typeof schema>;

// const SignUpPage = () => {
//   const router = useRouter();
//   const [form, setForm] = useState<FormData>({
//     businessName: "",
//     address: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
//     {},
//   );
//   const [isLoading, setIsLoading] = useState(false);
//   const [apiError, setApiError] = useState<string>("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: undefined }));
//     setApiError("");
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const result = schema.safeParse(form);

//     if (!result.success) {
//       const fieldErrors: Partial<Record<keyof FormData, string>> = {};
//       for (const issue of result.error.issues) {
//         const key = issue.path[0];
//         if (key && typeof key === "string") {
//           fieldErrors[key as keyof FormData] = issue.message;
//         }
//       }
//       setErrors(fieldErrors);
//       return;
//     }

//     setErrors({});
//     setApiError("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           businessName: result.data.businessName,
//           address: result.data.address,
//           email: result.data.email,
//           phone: result.data.phone,
//           password: result.data.password,
//           confirmPassword: result.data.confirmPassword,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setApiError(data.error.message);
//         return;
//       }

//       console.log("Registration successful:", data);

//       router.push("/dashboard");
//     } catch (error) {
//       console.error("Registration error:", error);
//       setApiError("An unexpected error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <main className="py-4 min-h-screen px-8 flex items-center justify-center bg-linear-to-r from-[#F7AB97] to-[#071548]">
//       <form
//         className="flex flex-col items-center justify-evenly relative w-[600] min-h-[600] sm:w-[75000] lg:w-[800] sm:h-[750] bg-[#E9E3E399] rounded-[20] p-10 sm:px-12"
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
//           />
//         </Link>

//         <Image
//           src="/auth_left-arrow.svg"
//           className="cursor-pointer block"
//           alt="Back arrow"
//           width={20}
//           height={20}
//           onClick={() => router.back()}
//         />
//         <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-10">
//           Sign Up
//         </h1>

//         {apiError && (
//           <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
//             {apiError}
//           </div>
//         )}

//         <div className="w-full flex flex-col justify-center items-center">
//           <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 w-full mb-4">
//             <CustomInput
//               label="Business Name"
//               type="text"
//               name="businessName"
//               inputBackgroundColor="bg-white"
//               inputBorderColor="border-orange-500"
//               value={form.businessName}
//               onChange={handleChange}
//               error={errors.businessName}
//               disabled={isLoading}
//             />
//             <CustomInput
//               label="Address"
//               type="text"
//               name="address"
//               inputBackgroundColor="bg-white"
//               inputBorderColor="border-orange-500"
//               value={form.address}
//               onChange={handleChange}
//               error={errors.address}
//               disabled={isLoading}
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row sm:justify-center  sm:gap-4 w-full mb-4">
//             <CustomInput
//               label="Email Address"
//               type="email"
//               name="email"
//               inputBackgroundColor="bg-white"
//               inputBorderColor="border-orange-500"
//               value={form.email}
//               onChange={handleChange}
//               error={errors.email}
//               autoComplete="email"
//               disabled={isLoading}
//             />
//             <CustomInput
//               label="Phone No."
//               type="text"
//               name="phone"
//               inputBackgroundColor="bg-white"
//               inputBorderColor="border-orange-500"
//               value={form.phone}
//               onChange={handleChange}
//               error={errors.phone}
//               disabled={isLoading}
//             />
//           </div>

//           <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 w-full mb-4">
//             <CustomInput
//               label="Password"
//               type="password"
//               name="password"
//               inputBackgroundColor="bg-white"
//               inputBorderColor="border-orange-500"
//               value={form.password}
//               onChange={handleChange}
//               error={errors.password}
//               autoComplete="new-password"
//               disabled={isLoading}
//             />
//             <CustomInput
//               label="Confirm Password"
//               type="password"
//               name="confirmPassword"
//               inputBackgroundColor="bg-white"
//               inputBorderColor="border-orange-500"
//               value={form.confirmPassword}
//               onChange={handleChange}
//               error={errors.confirmPassword}
//               autoComplete="new-password"
//               disabled={isLoading}
//             />
//           </div>
//         </div>

//         <PrimaryButton label="Confirm" isLoading={isLoading} type="submit" />

//         <div className="my-8">
//           <p className="font-medium text-gray-700">Already have an account?</p>
//           <Link href="/login">
//             <p className="flex justify-center cursor-pointer font-medium text-coral">
//               Login
//             </p>
//           </Link>
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
//           className="hidden sm:block absolute -bottom-4 -left-5"
//           width={40}
//           height={100}
//         />
//       </form>
//     </main>
//   );
// };

// export default SignUpPage;
