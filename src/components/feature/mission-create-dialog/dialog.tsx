"use client";

import { sample } from "es-toolkit";
import { createContext, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Temporal } from "temporal-polyfill";

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  FieldGroup,
  Fieldset,
  toast,
} from "@/components/base";
import { useMissionCreation } from "@/swr";

import type { Organization } from "@prisma";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";

import { FieldDescription } from "./field-description";
import { FieldOperationTime } from "./field-operation-time";
import { FieldOrganization } from "./field-organization";
import { FieldReadinessTime } from "./field-readiness-time";
import { FieldTitle } from "./field-title";

export const FormContext = createContext<UseFormReturn<Inputs> | null>(null);

export function MissionCreateDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { trigger: createMission, isMutating: isCreating } =
    useMissionCreation();

  const form = useForm<Inputs>();
  const { handleSubmit, reset } = form;

  const close = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const submit = useCallback<SubmitHandler<Inputs>>(
    async ({
      organization,
      title,
      description,
      readinessTime,
      operationTime,
    }) => {
      try {
        await createMission({
          organizationId: organization.id,
          title,
          description,
          readinessTime,
          operationTime,
        });
        close();
      } catch (error) {
        toast.error({ title: "미션 생성 실패", description: error });
      }
    },
    [close, createMission],
  );

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
          <DialogTitle>새 협동과제 만들기</DialogTitle>
          <DialogDescription>
            {sample([
              "하기 싫지만 누군가는 해야 하는 일",
              "꼭 해야 하는 일이 정말로 하기 싫을 때",
            ])}
          </DialogDescription>
          <DialogBody>
            <Fieldset>
              <FieldGroup className="grid-col-2 grid gap-x-4">
                <FieldOrganization className="col-span-2" />
                <FieldTitle className="col-span-2" />
                <FieldDescription className="col-span-2" />
                <FieldReadinessTime />
                <FieldOperationTime />
              </FieldGroup>
            </Fieldset>
          </DialogBody>
          <DialogActions>
            <Button plain onClick={close}>
              취소
            </Button>
            <Button type="submit" disabled={isCreating}>
              만들기
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </FormContext.Provider>
  );
}

type Inputs = {
  organization: Organization;
  title: string;
  description: string;
  readinessTime: Temporal.PlainTime;
  operationTime: Temporal.PlainTime;
};
