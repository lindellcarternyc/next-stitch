import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface ButtonLinkProps extends LinkProps {
  children: ReactNode;
}

export const ButtonLink = ({ href, ...rest }: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      {...rest}
      className={`bg-foreground text-background px-6 py-4 cursor-pointer rounded-md font-medium `}
    />
  );
};
