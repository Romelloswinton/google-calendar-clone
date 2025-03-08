import React from "react";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  className,
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-black"
      />
      <label htmlFor={id} className="text-sm font-semibold text-gray-800">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
