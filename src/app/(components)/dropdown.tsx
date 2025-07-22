"use client";

import { MouseEvent, ReactNode, useRef, useState } from "react";
import { useClickOutside } from "../(hooks)/use-click-outside";
import { useKeydown } from "../(hooks)/use-keydown";
import { Button } from "./button";

export interface DropdownOption<T> {
  label: string;
  value: T;
}

interface DropdownProps<T> {
  options: DropdownOption<T>[];
  trigger: ReactNode;
  children: (option: DropdownOption<T>) => ReactNode;
  onSelect: (value: string) => void;
}

export function Dropdown<T>({
  options,
  trigger,
  children,
  onSelect,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (evt: MouseEvent<HTMLLIElement>) => {
    const option = evt.currentTarget.dataset.option;
    if (!option) return;
    setIsOpen(false);
    onSelect(option);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  useKeydown({
    key: "Escape",
    handler: () => setIsOpen(false),
  });

  return (
    <div
      className="relative flex justify-end w-full max-w-md"
      ref={dropdownRef}
    >
      <Button
        title="Togglw Dropdown"
        onClick={toggle}
        variant="primary"
        className="rounded-none"
      >
        {trigger}
      </Button>
      {isOpen && (
        <ul className="absolute bg-background top-10 p-2 right-[-1px] cursor-pointer hover:bg-foreground hover:text-background border w-md max-w-full">
          {options.map((option) => (
            <li
              key={`${option.value}`}
              className="flex justify-end"
              data-option={`${option.value}`}
              onClick={handleSelect}
            >
              {children(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
