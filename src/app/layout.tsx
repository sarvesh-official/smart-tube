import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import localFont from 'next/font/local';
import { YoutubeProvider } from "@/contexts/YoutubeContext";

const robotSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: "400"
});

const youtube = localFont({
    src: [
      {
        path: '../../public/fonts/youtube.ttf',
        weight: '400',
        style: 'normal',
      },
      
    ],
    variable: '--font-youtube',

});

export const metadata: Metadata = {
  title: "Smart Tube",
  description: "Generated by create next app",
  icons: ["/images/logo.png"]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex items-center justify-center w-full h-full">
          <head>
          <meta
                    name="google-site-verification"
                    content="XAmKpd9mM-VgSmVHoKVlu7eBB8e9dXBHFDiB-gKr0B4"
                />
          </head>
      <body
        className={`${robotSans.variable} ${youtube.variable} antialiased background-image h-4/5 w-4/5 bg-green-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border-gray-800 border-2`}
      >
        <YoutubeProvider>
          <Provider>
            {children}
          </Provider>
        </YoutubeProvider>
      </body>
    </html>
  );
}
