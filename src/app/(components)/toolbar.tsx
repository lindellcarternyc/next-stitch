"use client";

import { useRouter } from "next/navigation";

import { Dropdown, DropdownOption } from "./dropdown";
import { signOut, useSession } from "@/lib/auth-client";

const AUTHORIZED_OPTIONS = [
  {
    label: "Sign Out",
    value: "sign-out",
  },
  {
    label: "Projects",
    value: "/projects",
  },
];

const UNAUTHORIZED_OPTIONS = [
  {
    label: "Sign In",
    value: "/sign-in",
  },
];

export const Toolbar = () => {
  const router = useRouter();
  const session = useSession();

  const options: DropdownOption<string>[] = session.data?.user
    ? AUTHORIZED_OPTIONS
    : UNAUTHORIZED_OPTIONS;

  const onSelect = (value: string) => {
    switch (value) {
      case "sign-out": {
        return signOut();
      }
      default:
        router.push(value);
    }
  };

  return (
    <div
      className={`fixed top-0 border w-full flex justify-between items-center bg-background`}
    >
      {session.data?.user && (
        <div className="pl-2">Hi, {session.data.user.name}</div>
      )}
      <Dropdown options={options} trigger="Menu" onSelect={onSelect}>
        {(option) => {
          return <p>{option.label}</p>;
        }}
      </Dropdown>
    </div>
  );
};
