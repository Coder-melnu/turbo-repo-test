import { createTPRCRouter } from "./trpc";
import { testRouter } from "./routes";
export const appRouter = createTPRCRouter({
  test: testRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
export * from "./trpc";
