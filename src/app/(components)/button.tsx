import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: "primary";
}

export const Button = ({
  className,
  children,
  variant,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type="button"
      title="Togglw Dropdown"
      className={`${
        variant === "primary" && "bg-foreground text-background"
      } px-6 py-2 cursor-pointer rounded font-medium ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
