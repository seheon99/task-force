import { Divider, Tab, Tabs } from "@/components/base";
import {
  ExemptsSettings,
  OrganizationsSettings,
  ProfileSettings,
} from "@/components/feature";

const tabItems = [
  {
    id: "profile",
    label: "프로필",
    href: "/settings/profile",
    Component: ProfileSettings,
  },
  {
    id: "organizations",
    label: "소속",
    href: "/settings/organizations",
    Component: OrganizationsSettings,
  },
  {
    id: "exempts",
    label: "열외",
    href: "/settings/exempts",
    Component: ExemptsSettings,
  },
];

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const currentTab = tabItems.find((tab) => tab.id === category);

  return (
    <main>
      <Tabs>
        {tabItems.map((tab) => (
          <Tab key={tab.id} href={tab.href} current={tab.id === category}>
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <Divider className="mb-8" />
      {currentTab && <currentTab.Component />}
    </main>
  );
}
