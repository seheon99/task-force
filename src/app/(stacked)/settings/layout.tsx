"use client";

import { usePathname } from "next/navigation";

import { Divider, Tab, Tabs } from "@/components/base";

const tabItems = [
  {
    label: "프로필",
    href: "/settings/profile",
  },
  {
    label: "팀",
    href: "/settings/organizations",
  },
  {
    label: "열외",
    href: "/settings/exempts",
  },
];

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <main>
      <Tabs>
        {tabItems.map((tab) => (
          <Tab key={tab.href} href={tab.href} current={tab.href === pathname}>
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <Divider className="mb-8" />
      {children}
    </main>
  );
}
