import * as Sentry from "@sentry/nextjs";
const sentryDNS = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (!sentryDNS) console.log("Sentry Env missing");

Sentry.init({
  debug: false,
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1,
  // Send all browser errors to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnel: typeof window !== "undefined" ? "/sentry" : undefined, // check the run-time environment if it is either 'NODEJS' or "EDGE",
});

export default Sentry;
