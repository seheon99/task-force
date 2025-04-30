"use client";

import { useContext } from "react";

import { ErrorMessage, Field, Input, Label } from "@/components/base";

import { FormContext } from "./dialog";

export function FieldOperationTime({ className }: { className?: string }) {
  const form = useContext(FormContext);
  return (
    <Field className={className}>
      <Label>임무 시작 시간</Label>
      <Input
        type="time"
        invalid={!!form?.formState.errors.operationTime}
        {...form?.register("operationTime", {
          required: "시간을 입력해주세요",
        })}
      />
      {form?.formState.errors.operationTime && (
        <ErrorMessage>
          {form?.formState.errors.operationTime.message}
        </ErrorMessage>
      )}
    </Field>
  );
}
