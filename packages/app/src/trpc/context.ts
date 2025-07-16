import type { Context } from "@monoapp/trpc";

import { getServerSession } from "../nextauth/auth";

export const createContext = async (): Promise<Context> => {
  const [session] = await Promise.all([getServerSession()]);
  return { session };
};
