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
      } p-2 cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
