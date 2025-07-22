import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const getVariantStyles = (variant: ButtonProps["variant"]): string => {
  switch (variant) {
    case "danger":
      return "bg-red-500 text-white";
    case "primary":
      return "bg-foreground text-background";
    case "secondary":
      return "border";
    default:
      return "";
  }
};

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
      className={`${getVariantStyles(
        variant
      )} px-6 py-2 cursor-pointer rounded-md font-medium ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
