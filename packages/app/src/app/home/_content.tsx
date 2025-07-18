"use client";

import { useSession } from "next-auth/react";
import { TEST_MY_NUMBER } from "@monoapp/test";
import { trpc } from "../../trpc/client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { captureException } from "@sentry/nextjs";

export const HomePage = (): React.JSX.Element => {
  const { data: session } = useSession();

  if (!session) throw new Error("Session not found");

  void trpc.test.testQuery.useQuery();
  void trpc.test.protecteTest.useQuery();
  const mutationTest = trpc.test.testMutation.useMutation();
  useEffect(() => {
    mutationTest.mutate();
    captureException(new Error("This is Test Error"));
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        Hello World!!!! This is My number {TEST_MY_NUMBER} And this is
        Protected!
        <Button>Click on this</Button>
      </main>
    </div>
  );
};
