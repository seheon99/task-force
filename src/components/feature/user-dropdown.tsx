"use client";

import {
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useCallback } from "react";

import { deleteAccessTokenCookie } from "@/actions/auth";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  NavbarItem,
} from "@/components/base";
import { ACCESS_TOKEN } from "@/constants";
import { useUser } from "@/swr";

export function UserDropdown() {
  const { data: user, isLoading } = useUser();

  const onLogoutClick = useCallback(async () => {
    await deleteAccessTokenCookie();
    localStorage.removeItem(ACCESS_TOKEN);
    location.href = "/";
  }, []);

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
        <DropdownItem onClick={onLogoutClick}>
          <ArrowRightStartOnRectangleIcon />
          <DropdownLabel>로그아웃</DropdownLabel>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
