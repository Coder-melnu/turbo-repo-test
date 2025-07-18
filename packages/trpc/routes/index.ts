import {
  createTPRCRouter,
  publicProcedure,
  protectedProcedure,
} from "../src/trpc";
import { TRPCError } from "@trpc/server";
export const testRouter = createTPRCRouter({
  testQuery: publicProcedure.query(() => {
    try {
      console.log("This is a test trpc query call");
    } catch (err) {
      console.error("testMutation failed:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  testMutation: publicProcedure.mutation(() => {
    console.log("This is a test mutation call ");
  }),
  protecteTest: protectedProcedure.query(async ({ ctx }) => {
    console.log("Session User", ctx.session.user);

    const tuser = await ctx.db.TUserModel.create({
      firstName: "May",
      lastName: "Nu",
      email: "maythan.pt@gmail.com",
    });
    console.log("User Created", tuser);
  }),
});
