"use client";

import { sample } from "es-toolkit";
import { createContext, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  FieldGroup,
  Fieldset,
} from "@/components/base";
import { useMissionsMustation, useUser } from "@/hooks";
import { User } from "@prisma";

import type { SubmitHandler, UseFormReturn } from "react-hook-form";

import { FieldDescription } from "./field-description";
import { FieldMembers } from "./field-members";
import { FieldRoles } from "./field-roles";
import { FieldTitle } from "./field-title";

type Inputs = {
  title: string;
  description: string;
};

export const FormContext = createContext<UseFormReturn<Inputs> | null>(null);

export function MissionCreateDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { data: user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);
  const [members, setMembers] = useState<User[]>([]);

  const { trigger: createMission } = useMissionsMustation();

  const form = useForm<Inputs>();
  const { handleSubmit, reset } = form;

  const close = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const submit = useCallback<SubmitHandler<Inputs>>(
    async ({ title, description }) => {
      setIsLoading(true);
      try {
        await createMission({
          title,
          description,
          roles: roles.map((r) => r.name),
          members,
        });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
      close();
    },
    [close, createMission, members, roles]
  );

  useEffect(() => {
    if (user) {
      setMembers((prev) => [...prev.filter((u) => u.id !== user.id), user]);
    }
  }, [user]);

  return (
    <FormContext.Provider value={form}>
      <Dialog open={open} onClose={close}>
        <form
          onSubmit={handleSubmit(submit)}
          onKeyDown={(e) =>
            e.code === "Enter" || e.code === "NumpadEnter"
              ? e.preventDefault()
              : null
          }
        >
          <DialogTitle>새 미션 만들기</DialogTitle>
          <DialogDescription>
            {sample([
              "하기 싫지만 누군가는 해야 하는 일",
              "꼭 해야 하는 일이 정말로 하기 싫을 때",
            ])}
          </DialogDescription>
          <DialogBody>
            <Fieldset>
              <FieldGroup>
                <FieldTitle />
                <FieldDescription />
                <FieldRoles roles={roles} setRoles={setRoles} />
                <FieldMembers members={members} setMembers={setMembers} />
              </FieldGroup>
            </Fieldset>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={close}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              만들기
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </FormContext.Provider>
  );
}
