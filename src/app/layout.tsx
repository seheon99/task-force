import { Toaster } from "sonner";

import { ServiceWorkerRegister } from "@/components/feature";

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
      <body className="w-screen overflow-x-hidden">
        {children}
        <ServiceWorkerRegister />
        <Toaster />
      </body>
    </html>
  );
}
