import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div>
      {label && <label>{label}</label>}

      <input {...props} />

      {error && <p>{error}</p>}
    </div>
  );
}