import { createTPRCRouter, publicProcedure, protectedProcedure } from "../trpc";
export const testRouter = createTPRCRouter({
  testQuery: publicProcedure.query(() => {
    console.log("This is a test trpc query call");
  }),
  testMutation: publicProcedure.mutation(() => {
    console.log("This is a test mutation call ");
  }),
  protecteTest: protectedProcedure.query(({ ctx }) => {
    console.log("Session User", ctx.session.user);
  }),
});
