import { ReactNode } from "react";

interface RenderIfProps {
  condition: boolean | (() => boolean);
  if: ReactNode;
  else?: ReactNode;
}

export const RenderIf = ({ condition, if: If, else: Else }: RenderIfProps) => {
  const shouldRender = typeof condition === "boolean" ? condition : condition();

  if (shouldRender) return If;
  return Else;
};
