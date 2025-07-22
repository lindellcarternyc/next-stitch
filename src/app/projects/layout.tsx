"use client";

import { ReactNode, useEffect } from "react";
import { Toolbar } from "../(components)/toolbar";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function Layout({ children }: { children: ReactNode }) {
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

  return (
    <div>
      <Toolbar />
      <main className="max-w-md mx-auto space-y-6 pt-16">{children}</main>
    </div>
  );
}
