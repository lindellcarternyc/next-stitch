import { RefObject, useEffect } from "react";

interface ClickOutsideHandlerProps {
  ref: RefObject<HTMLElement | null>;
  handler(): void;
}

export const useClickOutside = ({ ref, handler }: ClickOutsideHandlerProps) => {
  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, ref]);
};
