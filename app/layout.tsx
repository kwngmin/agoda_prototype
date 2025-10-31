import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import LanguageSelect from "@/src/widgets/app/LanguageSelect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prototype",
  description: "Prototype App Version 1.0.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-scroll`}
      >
        {/* <div className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-black/60">
          <div className="mx-auto flex h-10 max-w-screen-2xl items-center justify-end px-4">
            <LanguageSelect />
          </div>
        </div> */}
        {children}
      </body>
    </html>
  );
}
