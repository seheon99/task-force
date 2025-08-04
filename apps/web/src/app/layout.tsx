import { Toaster } from "sonner";

import type { Metadata } from "next";

import { ServiceWorkerRegister, SessionRegister } from "@/components/feature";


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
      <body className="w-screen overflow-x-hidden">
        {children}
        <ServiceWorkerRegister />
        <SessionRegister />
        <Toaster />
      </body>
    </html>
  );
}
