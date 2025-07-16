import { createTPRCRouter, publicProcedure } from "../trpc";
export const testRouter = createTPRCRouter({
  testQuery: publicProcedure.query(() => {
    console.log("This is a test trpc query call");
  }),
  testMutation: publicProcedure.mutation(() => {
    console.log("This is a test mutation call ");
  }),
});
