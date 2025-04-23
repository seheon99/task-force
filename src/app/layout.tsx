import { Toaster } from "sonner";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Cleaning TF",
  description: "Justice, Equality, and Fair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
