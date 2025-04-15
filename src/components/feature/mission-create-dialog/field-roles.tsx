"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { now } from "es-toolkit/compat";
import React, { useState } from "react";

import { BadgeButton, Field, Input, Label } from "@/components/base";

export function FieldRoles({
  roles,
  setRoles,
}: {
  roles: { id: number; name: string }[];
  setRoles: React.Dispatch<
    React.SetStateAction<{ id: number; name: string }[]>
  >;
}) {
  const [role, setRole] = useState("");
  return (
    <Field>
      <Label>역할</Label>
      <Input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        onKeyUp={(e) => {
          if (role.length && (e.code === "Enter" || e.code === "NumpadEnter")) {
            setRoles((v) => [...v, { id: now(), name: role }]);
            setRole("");
          }
        }}
      />
      <div data-slot="description" className="flex flex-wrap gap-1">
        <input hidden />
        {roles.map((role) => (
          <BadgeButton
            key={role.id}
            onClick={() =>
              setRoles((roles) => roles.filter((r) => r.id !== role.id))
            }
          >
            {role.name} <XMarkIcon className="size-4" />
          </BadgeButton>
        ))}
      </div>
    </Field>
  );
}
