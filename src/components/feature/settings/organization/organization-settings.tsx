"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Combobox,
  ComboboxDescription,
  ComboboxLabel,
  ComboboxOption,
  Description,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  Legend,
  Loading,
  Text,
  Textarea,
} from "@/components/base";
import { useOrganization, useUsers } from "@/swr";

import type { Organization } from "@prisma";

export function OrganizationSettings({ id }: { id: Organization["id"] }) {
  const { data: organization, isLoading } = useOrganization({ id });
  const { data: users, isLoading: isLoadingUsers } = useUsers();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = useCallback(() => {}, []);

  useEffect(() => {
    if (organization) {
      const { name, description } = organization;
      setValue("name", name);
      setValue("description", description);
    }
  }, [organization, setValue]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col gap-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
          <div>
            <Legend>팀 설정</Legend>
            <Text>
              팀에 초대된 사람은 팀명과 소개로 초대를 받을지 말지 결정하게 돼요.
            </Text>
          </div>
          <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <Field className="col-span-full">
              <Label>팀명</Label>
              <Input
                disabled={isLoading}
                invalid={!!errors.name}
                {...register("name", {
                  required: "팀명을 입력해주세요.",
                  minLength: {
                    value: 3,
                    message: "세 글자 이상 작성해주세요.",
                  },
                })}
              />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </Field>
            <Field className="col-span-full">
              <Label>소개</Label>
              <Description>
                초대받은 사람에게 보여줄 간단한 소개를 작성해주세요.
              </Description>
              <Textarea
                disabled={isLoading}
                invalid={!!errors.description}
                {...register("description", {
                  required: "소개를 작성해주세요.",
                  minLength: { value: 10, message: "10자 이상 작성해주세요." },
                })}
              />
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </Field>
            <Button type="submit">저장</Button>
          </FieldGroup>
        </Fieldset>
      </form>

      <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
        <div>
          <Legend>팀원 관리</Legend>
          <Text>팀원 초대는 누구나, 팀원 방출은 팀장만 할 수 있어요.</Text>
        </div>
        <div className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
          <div className="col-span-full flex gap-2">
            <Combobox
              disabled={isLoadingUsers}
              options={users ?? []}
              displayValue={(user) => user?.name}
            >
              {(user) => (
                <ComboboxOption value={user}>
                  <ComboboxLabel>{user.name}</ComboboxLabel>
                  <ComboboxDescription>{user.soldierId}</ComboboxDescription>
                </ComboboxOption>
              )}
            </Combobox>
            <Button outline className="shrink-0 text-sm">
              초대하기
            </Button>
          </div>
        </div>
      </Fieldset>
    </div>
  );
}

type Inputs = {
  name: Organization["name"];
  description: Organization["description"];
};
