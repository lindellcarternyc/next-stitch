"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "../(components)/button";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  //add-start: destructure user from session
  const { user } = session;

  return (
    <main className="max-w-md flex items-center justify-center flex-col mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome, {user.name || "User"}!</p>
      <p>Email: {user.email}</p>
      {/* add-start: sign out button */}
      <Button
        type="button"
        variant="primary"
        className="rounded"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </main>
  );
}
