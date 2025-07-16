import { auth } from ".";

import { SessionProvider } from "next-auth/react";
import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { ensurePermissionsAsync, type Permission } from "./users";
import { UnauthorizedError } from "./error";

export const getServerSession = cache(auth);

export async function NextAuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>): Promise<React.JSX.Element> {
  const session = await getServerSession();
  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
      session={session}
    >
      {children}
    </SessionProvider>
  );
}
export const assertPermissions = cache(
  async (requiredPermissions: Permission[], continueUrl?: string) => {
    const session = await getServerSession();
    const signinUrl = new URL(`/auth/sign-in`, process.env.AUTH_URL);
    if (continueUrl) signinUrl.searchParams.set("continue", continueUrl);
    if (!session || !session.user?.email) {
      redirect(signinUrl.toString());
    }
    await ensurePermissionsAsync(session.user.email, requiredPermissions).catch(
      (e: unknown) => {
        throw new UnauthorizedError(
          `You do not have the required permission to access this page`,
          { cause: e }
        );
      }
    );
  }
);
