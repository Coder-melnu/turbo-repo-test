import NextAuth, { type NextAuthConfig } from "next-auth";
import Google, { type GoogleProfile } from "next-auth/providers/google";

import { ensurePermissionsAsync } from "./users";
const providers: NextAuthConfig["providers"] = [
  Google({
    allowDangerousEmailAccountLinking: true,
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,

    profile(profile: GoogleProfile) {
      if (!profile.email_verified)
        throw new Error("Google: Email not verified");
      return profile;
    },
  }),
];

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },

    signIn({ profile }) {
      const googleProfile = profile as GoogleProfile;
      return ensurePermissionsAsync(googleProfile.email, ["homepage:read"])
        .catch(() => null)
        .then((v) => !!v);
    },
  },
  pages: {
    error: "/auth/error",
    signIn: "/auth/sign-in",
  },

  providers,
  redirectProxyUrl: `${process.env.AUTH_URL}/api/auth`,
  trustHost: true,
});
