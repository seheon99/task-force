"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { now } from "es-toolkit/compat";
import React, { useState } from "react";

import {
  BadgeButton,
  type BadgeColor,
  Field,
  Input,
  Label,
} from "@/components/base";
import { ColorPicker } from "@/components/feature";

export function FieldRoles({
  className,
  roles,
  setRoles,
}: {
  className?: string;
  roles: { id: number; name: string }[];
  setRoles: React.Dispatch<
    React.SetStateAction<{ id: number; name: string; color: BadgeColor }[]>
  >;
}) {
  const [color, setColor] = useState<BadgeColor>("zinc");
  const [name, setName] = useState("");
  return (
    <Field className={className}>
      <Label>역할</Label>
      <div data-slot="control" className="flex gap-1">
        <ColorPicker value={color} onChange={setColor} />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyUp={(e) => {
            if (
              name.length &&
              (e.code === "Enter" || e.code === "NumpadEnter")
            ) {
              setRoles((v) => [...v, { id: now(), name, color }]);
              setName("");
            }
          }}
        />
      </div>
      <div data-slot="description" className="flex flex-wrap gap-1">
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
