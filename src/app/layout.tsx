import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "./globals.css";

const suit = localFont({
  src: "./fonts/SUIT-Variable.woff2",
  variable: "--font-suit",
});

export const metadata: Metadata = {
  title: "Bloom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${suit.variable} antialiased bg-gray-200 overflow-y-auto`}
      >
        <div className="w-full max-w-[480px] mx-auto min-h-dvh bg-gray-100 flex flex-col shadow-2xl relative">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
