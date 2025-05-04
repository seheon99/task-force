"use client";

import {
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  NavbarItem,
} from "@/components/base";
import { useUser } from "@/swr/use-user";

export function UserDropdown() {
  const { data: user, isLoading } = useUser();

  return (
    <Dropdown>
      {user ? (
        <DropdownButton
          as={NavbarItem}
          disabled={isLoading}
          className="flex h-8 w-24 items-center justify-end"
        >
          {user.nickname}
          <ChevronDownIcon />
        </DropdownButton>
      ) : (
        <Button plain href="/sign-in">
          로그인
        </Button>
      )}
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
        <DropdownItem href="/logout">
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>로그아웃</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
