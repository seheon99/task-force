import { useContext } from "react";

import {
  Combobox,
  ComboboxLabel,
  ComboboxOption,
  Field,
  Label,
} from "@/components/base";
import { useOrganizations } from "@/swr";

import { FormContext } from "./dialog";

export function FieldOrganization({ className }: { className?: string }) {
  const { data: organizations } = useOrganizations();

  const form = useContext(FormContext);

  return (
    <Field className={className}>
      <Label>팀</Label>
      <Combobox
        options={organizations ?? []}
        displayValue={(org) => org?.name}
        value={form?.watch("organization") ?? null}
        onChange={(org) =>
          org
            ? form?.setValue("organization", org)
            : form?.resetField("organization")
        }
      >
        {(org) => (
          <ComboboxOption value={org}>
            <ComboboxLabel>{org.name}</ComboboxLabel>
          </ComboboxOption>
        )}
      </Combobox>
    </Field>
  );
}
