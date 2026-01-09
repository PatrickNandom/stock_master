"use client";

interface PrimaryButtonProps {
  label: string;
  type?: "button" | "submit";
  isLoading?: boolean;
  onClick?: () => void;
}

const PrimaryButton = ({
  label,
  type = "submit",
  isLoading = false,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <div className="flex justify-center w-full mt-8 px-6 sm:px-0">
      <button
        type={type}
        onClick={onClick}
        disabled={isLoading}
        className="w-full h-[45] sm:w-auto sm:min-w-[180] bg-coral text-white rounded-lg px-6 text-sm font-semibold hover:cursor-pointer transition-all active:scale-[0.98] hover:opacity-90 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          label
        )}
      </button>
    </div>
  );
};

export default PrimaryButton;
