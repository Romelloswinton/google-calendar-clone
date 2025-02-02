import { Input } from "@/components/ui/input";
interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>; // Explicitly typing e here
  className?: string; // Optional className to allow customization
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className = "", // Default to an empty string if no className is passed
}) => {
  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // onChange handler will be typed correctly now
      className={`${className}`} // Apply dynamic className
    />
  );
};

export default InputField;
