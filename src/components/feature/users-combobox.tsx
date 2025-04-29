"use client";

import {
  Combobox,
  ComboboxDescription,
  ComboboxLabel,
  ComboboxOption,
} from "@/components/base";
import { useUsers } from "@/swr";

export function UsersCombobox({}: Omit<
  React.ComponentPropsWithoutRef<typeof Combobox>,
  "options" | "displayValue" | "children"
>) {
  const { data: users, isLoading: isLoadingUsers } = useUsers();
  return (
    <Combobox
      disabled={isLoadingUsers}
      options={users ?? []}
      displayValue={(user) => user?.name}
    >
      {(user) => (
        <ComboboxOption value={user}>
          <ComboboxLabel>{user.name}</ComboboxLabel>
          <ComboboxDescription>{user.soldierId}</ComboboxDescription>
        </ComboboxOption>
      )}
    </Combobox>
  );
}
