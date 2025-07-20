"use client";

import { Button } from "@/app/(components)/button";

interface SigninFormProps {
  signin: (formData: FormData) => void;
}

export const SigninForm = ({ signin }: SigninFormProps) => {
  return (
    <form action={signin} className="flex flex-col gap-6 mt-4">
      <div className="flex justify-between items-center">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="w-full max-w-[80%] p-2 border rounded-sm"
          required
        />
      </div>
      <div className="flex justify-between items-center">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full max-w-[80%] p-2 border rounded-sm"
          required
        />
      </div>
      <Button variant="primary" className="rounded-sm" type="submit">
        Sign In
      </Button>
    </form>
  );
};
