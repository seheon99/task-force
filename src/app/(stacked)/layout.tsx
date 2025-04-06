import {
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  Heading,
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
  StackedLayout,
  Strong,
} from "@/components/base";

const navItems = [
  { label: "시뮬레이션", url: "/simulation" },
  { label: "통계", url: "/statistics" },
  { label: "기록", url: "/log" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <Strong className="max-lg:hidden">Cleaning TF</Strong>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            {navItems.map(({ label, url }) => (
              <NavbarItem key={label} href={url}>
                {label}
              </NavbarItem>
            ))}
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                유세헌
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                  <UserIcon />
                  <DropdownLabel>내 정보</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>설정</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/manage-exempt">
                  <CalendarIcon />
                  <DropdownLabel>열외 관리</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/logout">
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>로그아웃</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Heading>Cleaning TF</Heading>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              {navItems.map(({ label, url }) => (
                <SidebarItem key={label} href={url}>
                  {label}
                </SidebarItem>
              ))}
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </StackedLayout>
  );
}
