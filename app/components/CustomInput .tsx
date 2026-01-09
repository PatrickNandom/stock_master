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
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      error,
      inputBackgroundColor,
      inputBorderColor,
      align,
      paddingY,
      borderRadius,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-4 ">
        <label
          className={`flex ${
            align ?? "justify-center"
          } mb-2 font-medium text-gray-700`}
        >
          {label}
        </label>

        <input
          ref={ref}
          className={`w-full px-2 ${paddingY} border ${
            inputBorderColor ?? "border-orange-500"
          } ${borderRadius ?? "rounded-[5]"} ${
            inputBackgroundColor ?? "bg-white"
          } text-lg focus:outline-none}`}
          {...props}
        />

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
