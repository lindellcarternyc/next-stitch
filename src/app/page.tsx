"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./(components)/button";

export default function Home() {
  const router = useRouter();
  const { isPending } = useSession();

  if (isPending) return <p className="text-center mt-8">Loading...</p>;

  return (
    <main className="flex items-center flex-col gap-4 justify-center h-[calc(100vh-42px)]">
      <h1 className="text-3xl">Welcome to Stitch.io</h1>
      <div className="flex gap-4">
        <Button variant="primary" onClick={() => router.push("/sign-up")}>
          Sign Up
        </Button>
        <Button variant="primary" onClick={() => router.push("/sign-in")}>
          Sign In
        </Button>
      </div>
    </main>
  );
}
