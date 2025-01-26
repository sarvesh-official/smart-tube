"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { YoutubeProvider } from "@/contexts/YoutubeContext";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <YoutubeProvider>{children}</YoutubeProvider>
    </SessionProvider>
  );
}
