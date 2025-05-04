"use client";

import {
  Combobox,
  ComboboxDescription,
  ComboboxLabel,
  ComboboxOption,
} from "@/components/base";
import { useUsers } from "@/swr";

import type { User } from "@prisma";

export function UsersCombobox({
  disabled,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof Combobox<User>>,
  "options" | "displayValue" | "children"
>) {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  return (
    <Combobox
      {...props}
      disabled={disabled || isLoadingUsers}
      options={users ?? []}
      displayValue={(user) => user?.nickname}
    >
      {(user) => (
        <ComboboxOption value={user}>
          <ComboboxLabel>{user.nickname}</ComboboxLabel>
          <ComboboxDescription>{user.unit}</ComboboxDescription>
        </ComboboxOption>
      )}
    </Combobox>
  );
}
