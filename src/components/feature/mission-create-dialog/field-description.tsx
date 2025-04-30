"use client";

import { useContext } from "react";

import { ErrorMessage, Field, Label, Textarea } from "@/components/base";

import { FormContext } from "./dialog";

export function FieldDescription({ className }: { className?: string }) {
  const form = useContext(FormContext);
  return (
    <Field className={className}>
      <Label>설명</Label>
      <Textarea
        {...form?.register("description", {
          required: "간단한 설명을 입력해주세요",
        })}
        invalid={!!form?.formState.errors.description}
      />
      {form?.formState.errors.description && (
        <ErrorMessage>
          {form?.formState.errors.description.message}
        </ErrorMessage>
      )}
    </Field>
  );
}
