"use client";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  inputBackgroundColor: string;
  inputBorderColor: string;
  align?: string;
  paddingY?: string;
  borderRadius?: string;
  placeholder?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      error,
      inputBackgroundColor,
      inputBorderColor,
      align = "justify-center",
      paddingY,
      borderRadius = "rounded-[5]",
      placeholder,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-4 ">
        <label className={`flex ${align} mb-2 font-medium text-gray-700`}>
          {label}
        </label>

        <input
          ref={ref}
          placeholder={placeholder}
          className={`w-full px-4 placeholder:text-[14] ${paddingY} border ${inputBorderColor} ${borderRadius} ${inputBackgroundColor} text-lg focus:outline-none`}
          {...props}
        />

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
