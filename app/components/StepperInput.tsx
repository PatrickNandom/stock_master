"use client";

interface StepperInputProps {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  prefix?: string;
  variantColor?: "gray" | "peach";
}

const StepperInput = ({
  label,
  value,
  onChange,
  onIncrement,
  onDecrement,
  prefix,
  variantColor = "gray",
}: StepperInputProps) => {
  const bgClasses = variantColor === "peach" ? "bg-[#FCDED6]" : "bg-[#D9DEE8]";
  const iconColor = "text-[#1a237e]";

  return (
    <div className="flex flex-col gap-2 w-full sm:max-w-[200]">
      <label className="text-[#1a237e] font-semibold text-sm ml-1">
        {label}
      </label>

      <div className="flex items-center sm:w-auto overflow-hidden rounded-xl border border-transparent focus-within:border-[#1a237e]/20 transition-all shadow-sm">
        <button
          type="button"
          onClick={onIncrement}
          className={`${bgClasses} px-3 py-2 h-full flex items-center justify-center active:scale-90 transition-transform`}
        >
          <span className={`${iconColor} text-xl font-bold`}>+</span>
        </button>

        <div className="flex-1 flex items-center bg-white px-2 h-full min-h-[40]">
          {prefix && <span className="text-gray-500 mr-1">{prefix}</span>}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-center h-full outline-none text-[#1a237e] font-medium"
          />
        </div>

        <button
          type="button"
          onClick={onDecrement}
          className={`${bgClasses} px-3 py-2 h-full flex items-center justify-center active:scale-90 transition-transform`}
        >
          <span className={`${iconColor} text-xl font-bold`}>-</span>
        </button>
      </div>
    </div>
  );
};

export default StepperInput;
