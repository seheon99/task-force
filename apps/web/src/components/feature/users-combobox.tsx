"use client";

import { Combobox, ComboboxLabel, ComboboxOption } from "@/components/base";
import { useUsers } from "@/swr";

import type { User } from "@prisma";

export function UsersCombobox({
  disabled,
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof Combobox<User | null>>,
  "options" | "displayValue" | "children"
>) {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  return (
    <Combobox
      {...props}
      disabled={disabled || isLoadingUsers}
      options={users ?? []}
      displayValue={(user) => user?.username}
    >
      {(user) => (
        <ComboboxOption value={user}>
          <ComboboxLabel>{user.username}</ComboboxLabel>
        </ComboboxOption>
      )}
    </Combobox>
  );
}
