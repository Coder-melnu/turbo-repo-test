"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const Login = () => {
  const router = useRouter();
  const urlSearchParams = useSearchParams();

  const searchParams = useMemo(() => {
    const continueParam = urlSearchParams.get("continue");
    const error = urlSearchParams.get("error");

    const url = new URL(
      continueParam ?? "/",
      process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    );

    return {
      continue: url.pathname + url.search + url.hash,
      error,
    };
  }, [urlSearchParams]);

  const session = useSession();

  if (session.status === "authenticated") {
    router.push(searchParams.continue);
    return null;
  }

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: searchParams.continue });
  };

  return (
    <div className="bg-background flex h-full min-h-screen w-full items-center justify-center">
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <button
          onClick={handleGoogleSignIn}
          className="px-6 py-3 rounded-lg bg-white text-gray-800 border border-gray-300 shadow hover:bg-gray-50 hover:shadow-md active:scale-95 transition duration-200"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
