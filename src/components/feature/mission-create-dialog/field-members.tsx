"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { unionBy } from "es-toolkit";
import { useState } from "react";

import {
  Button,
  Combobox,
  ComboboxDescription,
  ComboboxLabel,
  ComboboxOption,
  Field,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";
import { useUser, useUsers } from "@/swr";
import { User } from "@prisma";

export function FieldMembers({
  className,
  members,
  setMembers,
}: {
  className?: string;
  members: User[];
  setMembers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
  const [member, setMember] = useState<User | null>(null);

  const { data: user } = useUser();
  const { data: users } = useUsers();

  return (
    <Field className={className}>
      <Label>팀원</Label>
      <div data-slot="control" className="flex gap-1">
        <Combobox
          value={member}
          options={users ?? []}
          displayValue={(u) => u?.name}
          onChange={(u) => setMember(u)}
        >
          {(u) => (
            <ComboboxOption value={u}>
              <ComboboxLabel>
                {u.rank} {u.name}
              </ComboboxLabel>
              <ComboboxDescription>{u.soldierId}</ComboboxDescription>
            </ComboboxOption>
          )}
        </Combobox>
        <Button
          outline
          className="shrink-0"
          onClick={() => {
            if (member) {
              setMember(null);
              setMembers((members) => unionBy(members, [member], (x) => x.id));
            }
          }}
        >
          등록
        </Button>
      </div>
      <div data-slot="description">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>계급</TableHeader>
              <TableHeader>이름</TableHeader>
              <TableHeader>소속</TableHeader>
              <TableHeader className="relative w-0">
                <span className="sr-only">삭제버튼</span>
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.rank}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell className="text-zinc-500">
                  {member.soldierId}
                </TableCell>
                <TableCell>
                  <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                    <Button
                      plain
                      onClick={() => {
                        if (member.id === user?.id) {
                          console.error("자기 자신을 삭제할 수 없습니다.");
                          return;
                        }
                        setMembers((members) =>
                          members.filter((m) => m.id !== member.id),
                        );
                      }}
                    >
                      <XMarkIcon />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Field>
  );
}
