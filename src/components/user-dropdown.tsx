"use client";

import {
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";

import {
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
  const { data, isLoading } = useUser();

  const router = useRouter();

  if (data === null) {
    router.replace("/sign-in");
  }

  return (
    <Dropdown>
      <DropdownButton
        as={NavbarItem}
        disabled={isLoading}
        className="w-24 h-8 flex items-center justify-end"
      >
        {data?.name}
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
  );
}
