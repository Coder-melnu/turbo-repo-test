import { initTRPC, TRPCError } from "@trpc/server";
import type { Session } from "next-auth";

export type { Session };
export interface Context {
  session: maybe<Session>;
  db: Awaited<ReturnType<typeof import("@monoapp/db").default>>;
}

const t = initTRPC.context<Context>().create();
export const createTPRCRouter = t.router;
export const publicProcedure = t.procedure;

export const baseProcedure = t.procedure.use(async ({ ctx, next }) => {
  const result = await next({ ctx });
  return result;
});

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...ctx.session,
        user: {
          ...ctx.session.user,
        },
      },
    },
  });
});
