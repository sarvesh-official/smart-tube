declare module "next-auth" {
    interface Session {
      accessToken: string;
      refreshToken: string;
      accessTokenIssuedAt: number;
      accessTokenExpiresAt: number;
    }
  
    interface JWT {
      access_token: string;
      refresh_token: string;
      issued_at: number;
      expires_at: number;
      error?: string; // Handle refresh token errors
    }
  }