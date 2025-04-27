import { Tab, Tabs } from "@/components/base";

const tabItems = [
  {
    id: "profile",
    label: "프로필",
    href: "/settings/profile",
  },
  {
    id: "organizations",
    label: "소속",
    href: "/settings/organizations",
  },
  { id: "exempts", label: "열외", href: "/settings/exempts" },
];

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <div>
      <Tabs>
        {tabItems.map((tab) => (
          <Tab key={tab.id} href={tab.href} current={tab.id === category}>
            {tab.label}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
