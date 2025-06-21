"use client";

import {
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  NavbarItem,
} from "@/components/base";
import { useUser } from "@/swr";

export function UserDropdown() {
  const { data: user, isLoading } = useUser();

  return (
    <Dropdown>
      <DropdownButton
        as={NavbarItem}
        disabled={isLoading}
        className="flex h-8 w-24 items-center justify-end"
      >
        {user?.username}
        <ChevronDownIcon />
      </DropdownButton>
      <DropdownMenu className="min-w-64" anchor="bottom end">
        <DropdownItem href="/settings/profile">
          <UserIcon />
          <DropdownLabel>내 정보</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="/settings/organizations">
          <UserGroupIcon />
          <DropdownLabel>내 팀</DropdownLabel>
        </DropdownItem>
        <DropdownItem href="/settings/exempts">
          <CalendarIcon />
          <DropdownLabel>열외 관리</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/settings/preferences">
          <Cog6ToothIcon />
          <DropdownLabel>환경 설정</DropdownLabel>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/sign-out">
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>로그아웃</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
