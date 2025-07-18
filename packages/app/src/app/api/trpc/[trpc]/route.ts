import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "$/";
import { createContext } from "../../../../trpc/context";
import "server-only";

async function handler(request: Request) {
  return fetchRequestHandler({
    createContext,
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
  });
}

export { handler as GET, handler as POST };
