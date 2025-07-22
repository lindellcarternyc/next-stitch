"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { signIn } from "@/lib/auth-client";

import { Button } from "@/app/(components)/button";
import Link from "next/link";
import { Input } from "../(components)/input";

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
    <main className="max-w-md mx-auto flex flex-col justify-center h-screen p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <Input
            label="Email"
            id="email"
            placeholder="username@email.com"
            type="email"
            required
          />
          <Input
            label="Password"
            id="password"
            placeholder="Password"
            type="password"
            required
          />
          <Button variant="primary" className="rounded-sm" type="submit">
            Sign In
          </Button>
        </form>
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <p className="text-center">
        Or{" "}
        <Link className="underline cursor-pointer" href="/sign-up">
          Sign Up
        </Link>
      </p>
    </main>
  );
}
