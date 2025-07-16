import { initTRPC } from "@trpc/server";
import type { Session } from "next-auth";

export type { Session };
export interface Context {
  session: maybe<Session>;
}

const t = initTRPC.context<Context>().create();
export const createTPRCRouter = t.router;
export const publicProcedure = t.procedure;
