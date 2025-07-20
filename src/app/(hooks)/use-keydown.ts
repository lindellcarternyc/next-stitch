import { useEffect } from "react";

interface KeydownHandlerProps {
  key: string;
  handler: () => void;
}

export const useKeydown = ({ key, handler }: KeydownHandlerProps) => {
  useEffect(() => {
    const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.key === key) handler();
    };

    document.addEventListener("keydown", handleKeydown);

    return () => removeEventListener("keydown", handleKeydown);
  }, [key, handler]);
};
