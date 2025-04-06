import { AuthLayout } from "@/components/base";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
