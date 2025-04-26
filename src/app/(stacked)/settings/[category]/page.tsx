import { Tabs } from "@/components/base";

const tabs = [
  {
    id: "profile",
    displayName: "프로필",
    href: "/settings/profile",
  },
  {
    id: "organizations",
    displayName: "소속",
    href: "/settings/organizations",
  },
  { id: "exempts", displayName: "열외", href: "/settings/exempts" },
];

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <div>
      <Tabs currentTab={category} tabs={tabs} />
    </div>
  );
}
