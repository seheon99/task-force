"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { now } from "es-toolkit/compat";
import React, { useCallback, useState } from "react";

import {
  BadgeButton,
  type BadgeColor,
  Button,
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
  roles: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>;
}) {
  const [color, setColor] = useState<BadgeColor>("zinc");
  const [name, setName] = useState("");

  const onRolePush = useCallback(
    ({ id, name, color }: { id: number; name: string; color: BadgeColor }) => {
      setRoles((v) => [...v, { id, name, color }]);
      setName("");
    },
    [setRoles],
  );

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
              onRolePush({ id: now(), name, color });
            }
          }}
        />
        <Button
          outline
          className="shrink-0"
          onClick={() => onRolePush({ id: now(), name, color })}
        >
          추가
        </Button>
      </div>
      <div data-slot="description" className="flex flex-wrap gap-1">
        {roles.map((role) => (
          <BadgeButton
            key={role.id}
            color={role.color}
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

type Role = { id: number; name: string; color: BadgeColor };
