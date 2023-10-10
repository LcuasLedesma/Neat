"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  try {
    const result = trpc.authCallback.useQuery(undefined, {});

    if (result.isSuccess) {
      router.push(origin ? `/${origin}` : "/dashboard");
    }

    if (result.failureReason?.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>you will be redirected automatically</p>
      </div>
    </div>
  );
};

export default AuthCallback;
