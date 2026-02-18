import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SZProvider from "@/lib/provider/ReduxProvider";
import AuthListener from "@/components/utilities/AuthListener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnackZilla",
  description: "Resturent and food ordering website",
   icons: {
     icon: "https://i.postimg.cc/gjhSbS06/resturent.png",
     
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans?.variable} ${geistMono?.variable} antialiased`}
      >
        <SZProvider>
          <AuthListener />
          <div className="max-w-[1280px] mx-auto">{children}</div>
        </SZProvider>
      </body>
    </html>
  );
}
