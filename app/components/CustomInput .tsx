"use client";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="mb-4 ">
        <label className="flex justify-center mb-1 font-medium text-gray-700">
          {label}
        </label>

        <input
          ref={ref}
          className={`w-full px-2 border border-orange-500 rounded-[5]  bg-white  text-lg focus:outline-none
            ${error ? "border-red-500" : ""}`}
          {...props}
        />

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
