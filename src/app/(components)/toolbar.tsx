"use client";

import { useRouter } from "next/navigation";

import { Dropdown, DropdownOption } from "./dropdown";
import { useSession } from "@/lib/auth-client";

export const Toolbar = () => {
  const router = useRouter();
  const session = useSession();

  const options: DropdownOption<string>[] = session.data?.user
    ? [
        {
          label: "sign-out",
          value: "/sign-out",
        },
      ]
    : [
        {
          label: "Sign In",
          value: "/sign-in",
        },
      ];

  const onSelect = (value: string) => {
    switch (value) {
      default:
        router.push(value);
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
