/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */


// @ts-nocheck

import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import type { Account, User } from "next-auth";
import NextAuth from "next-auth";


// Create auth options configuration
const authOptions  = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_SECRET_KEY || "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/youtube.readonly",
          access_type: "offline",
          prompt: "consent", // Force consent screen to ensure we get refresh token
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, account, user }: { token: JWT, account: Account | null, user: User | null }): Promise<JWT> {
        // If this is the first sign-in, include the tokens in the token object
        if (account && user) {
          return {
            ...token,
            access_token: account.access_token,
            issued_at: Date.now(),
            expires_at: Date.now() + (account.expires_in || 3600) * 1000,
            refresh_token: account.refresh_token,
          };
        }
  
        // If token is still valid, return it
        if (token.expires_at && Date.now() < token.expires_at) {
          return token;
        }
  
        // Otherwise, refresh the token
        return await refreshAccessToken(token);
      },
  
      async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
        // Enrich the session with token details for client-side use
        session.accessToken = token.access_token as string;
        session.refreshToken = token.refresh_token as string;
        session.accessTokenIssuedAt = token.issued_at as number;
        session.accessTokenExpiresAt = token.expires_at as number;
        session.error = token.error;
        
        // Only call createUser when we have a user and it's a new session
        // if (session.user?.email) {
        //   try {
        //     await fetch(`${process.env.BACKEND_URL}/api/user/createUser`, {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         name: session.user.name,
        //         email: session.user.email,
        //         image: session.user.image,
        //         accessToken: session.accessToken,
        //       }),
        //     });

        //   } catch (error) {
        //     console.error("Failed to send user profile to backend:", error);
        //   }
        // }

        return session;
      },
  },
};

// Create the handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ 
          client_id: process.env.GOOGLE_CLIENT_ID!, // Match the env variable names
          client_secret: process.env.GOOGLE_SECRET_KEY!, // Match the env variable names
          grant_type: "refresh_token",
          refresh_token: token.refresh_token as string,
        }),
      });
  
      const refreshedTokens = await response.json();
  
      if (!response.ok) {
        throw refreshedTokens;
      }
  
      return {
        ...token,
        access_token: refreshedTokens.access_token,
        issued_at: Date.now(),
        expires_at: Date.now() + refreshedTokens.expires_in * 1000,
        refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      };
    } catch (error) {
      console.error("Error refreshing access token:", error);
  
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
}