import type { AppRouter } from "@monoapp/trpc";

import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
