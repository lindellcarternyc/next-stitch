"use client";

import { useRouter } from "next/navigation";

import { Dropdown, DropdownOption } from "./dropdown";

export const Toolbar = () => {
  const router = useRouter();

  const options: DropdownOption<string>[] = [
    {
      label: "Sign In",
      value: "signin",
    },
  ];

  const onSelect = (value: string) => {
    if (value === "signin" || value === "login") {
      router.push(`/auth/${value}`);
    }
  };

  return (
    <div className="absolute top-0 border w-full flex justify-end">
      <Dropdown options={options} trigger="Menu" onSelect={onSelect}>
        {(option) => {
          return <p>{option.label}</p>;
        }}
      </Dropdown>
    </div>
  );
};
