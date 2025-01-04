import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token; // Save access token for API requests
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken; // Make access token available in the session
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };