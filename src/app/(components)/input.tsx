import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export const Input = ({ id, label, ...rest }: InputProps) => {
  return (
    <div className="flex justify-between items-center">
      <label htmlFor={id}>{label}:</label>
      <input
        name={id}
        id={id}
        className="w-full max-w-[80%] p-2 border rounded-sm"
        {...rest}
      />
    </div>
  );
};
