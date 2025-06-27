import { AuthLayout as AuthLayoutComponent } from "@/components/base";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
}
