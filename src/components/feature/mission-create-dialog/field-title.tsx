"use client";

import { useContext } from "react";

import { ErrorMessage, Field, Input, Label } from "@/components/base";

import { FormContext } from "./dialog";

export function FieldTitle({ className }: { className?: string }) {
  const form = useContext(FormContext);
  return (
    <Field className={className}>
      <Label>제목</Label>
      <Input
        {...form?.register("title", { required: "제목을 입력해주세요" })}
        invalid={!!form?.formState.errors.title}
      />
      {form?.formState.errors.title && (
        <ErrorMessage>{form?.formState.errors.title.message}</ErrorMessage>
      )}
    </Field>
  );
}
