import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md", color = "white" }) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-6 h-6 border-3",
  };

  return (
    <div
      className={`${sizeClasses[size]} border-${color} border-t-transparent rounded-full animate-spin`}
      style={{
        borderColor: color === "white" ? "#ffffff" : color,
        borderTopColor: "transparent",
      }}
    />
  );
};

export default Spinner;
