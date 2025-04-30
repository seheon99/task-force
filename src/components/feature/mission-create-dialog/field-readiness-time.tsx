"use client";

import { useContext } from "react";

import { ErrorMessage, Field, Input, Label } from "@/components/base";

import { FormContext } from "./dialog";

export function FieldReadinessTime({ className }: { className?: string }) {
  const form = useContext(FormContext);
  return (
    <Field className={className}>
      <Label>역할 발표 시간</Label>
      <Input
        type="time"
        invalid={!!form?.formState.errors.readinessTime}
        {...form?.register("readinessTime", {
          required: "시간을 입력해주세요",
        })}
      />
      {form?.formState.errors.readinessTime && (
        <ErrorMessage>
          {form?.formState.errors.readinessTime.message}
        </ErrorMessage>
      )}
    </Field>
  );
}
