import type { Context } from "$/trpc";
import connectDb from "@monoapp/db";

import { getServerSession } from "../nextauth/auth";

export const createContext = async (): Promise<Context> => {
  const [session, db] = await Promise.all([getServerSession(), connectDb()]);
  return { session, db };
};
