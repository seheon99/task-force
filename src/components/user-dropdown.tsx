"use client";

import {
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
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
import { useUser } from "@/hooks/use-user";

export function UserDropdown() {
  const { data: user, isLoading } = useUser();

  return (
    <Dropdown>
      {user ? (
        <DropdownButton
          as={NavbarItem}
          disabled={isLoading}
          className="w-24 h-8 flex items-center justify-end"
        >
          {user.name}
          <ChevronDownIcon />
        </DropdownButton>
      ) : (
        <Button plain>로그인</Button>
      )}
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
  );
}
