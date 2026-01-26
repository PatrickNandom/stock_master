// components/StaffRoleSelect.tsx
interface StaffRoleSelectProps {
  label?: string;
  value: "ADMIN" | "STAFF";
  onChange: (value: "ADMIN" | "STAFF") => void;
  disabled?: boolean;
  error?: string;
  inputBackgroundColor?: string;
  inputBorderColor?: string;
  align?: string;
  paddingY?: string;
  borderRadius?: string;
}

export const StaffRoleSelect = ({
  label = "Role",
  value,
  onChange,
  disabled = false,
  error,
  inputBackgroundColor = "bg-[#FCDED6]",
  inputBorderColor = "border-[#FCDED6]",
  align = "justify-start",
  paddingY = "py-1",
  borderRadius = "rounded-[20]",
}: StaffRoleSelectProps) => {
  return (
    <div className="mb-4">
      <label className={`flex ${align} mb-2 font-medium text-gray-700`}>
        {label}
      </label>
      <select
        id="role"
        value={value}
        onChange={(e) => onChange(e.target.value as "ADMIN" | "STAFF")}
        disabled={disabled}
        className={`w-full px-4 ${paddingY} border ${inputBorderColor} ${borderRadius} ${inputBackgroundColor}  text-lg focus:outline-none ${
          error ? "border-red-500" : ""
        } ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""}`}
      >
        <option value="STAFF">Staff</option>
        <option value="ADMIN">Admin</option>
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default StaffRoleSelect;
