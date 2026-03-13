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

import { ResponsiveLayout } from "./responsive-layout";

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
        <Providers>
          <ResponsiveLayout>{children}</ResponsiveLayout>
        </Providers>
      </body>
    </html>
  );
}
