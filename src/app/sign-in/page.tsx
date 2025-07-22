"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { signIn } from "@/lib/auth-client";

import { Button } from "@/app/(components)/button";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setError(null);

    const formData = new FormData(evt.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/projects");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
        <div className="flex justify-between items-center">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
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
      <p className="text-center">
        Or{" "}
        <Link className="underline cursor-pointer" href="/sign-up">
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600">{error}</p>}
    </main>
  );
}
