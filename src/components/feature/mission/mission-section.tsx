"use client";

import { invariant, isNotNil } from "es-toolkit";
import { useCallback } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  ErrorMessage,
  Field,
  Input,
  Label,
  Legend,
  Text,
  Textarea,
  toast,
} from "@/components/base";
import {
  SettingFieldGroup,
  SettingSection,
  SettingSectionName,
} from "@/components/feature";
import { useMission, useMissionMutation } from "@/swr";

import type { Mission } from "@prisma";

export function MissionSection({ id }: { id: Mission["id"] }) {
  const { data: mission, isLoading } = useMission({ id });
  const { trigger, isMutating } = useMissionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: mission?.title,
      description: mission?.description,
      readinessTime: mission?.readinessTime,
      operationTime: mission?.operationTime,
    },
  });

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ title, description, readinessTime, operationTime }) => {
      try {
        invariant(isNotNil(mission), `Not Nil expected but ${mission}`);
        const updatedMission = await trigger({
          missionId: mission.id,
          title,
          description,
          readinessTime,
          operationTime,
        });
        toast.success({
          title: "저장 성공",
          description: updatedMission.updatedAt.toString(),
        });
      } catch (error) {
        toast.error({
          title: "저장 실패",
          description: error,
        });
      }
    },
    [mission, trigger],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SettingSection className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
        <SettingSectionName>
          <Legend>미션 설정</Legend>
          <Text>Description</Text>
        </SettingSectionName>
        <SettingFieldGroup className="grid grid-cols-2 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
          <Field className="col-span-full">
            <Label>팀명</Label>
            <Input disabled value={mission?.organization.name ?? ""} />
          </Field>
          <Field className="col-span-full">
            <Label>미션명</Label>
            <Input
              disabled={isLoading || isMutating}
              invalid={!!errors.title}
              {...register("title", { required: "미션명을 입력해주세요." })}
            />
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </Field>
          <Field className="col-span-full">
            <Label>설명</Label>
            <Textarea
              disabled={isLoading || isMutating}
              invalid={!!errors.description}
              {...register("description", {
                required: "설명을 입력해주세요",
                minLength: { value: 10, message: "10자 이상 입력해주세요" },
              })}
            />
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </Field>
          <Field className="col-span-1 sm:col-span-3">
            <Label>역할 분담 시간</Label>
            <Input
              disabled={isLoading || isMutating}
              type="time"
              invalid={!!errors.readinessTime}
              {...register("readinessTime", { required: "시간을 정해주세요" })}
            />
            {errors.readinessTime && (
              <ErrorMessage>{errors.readinessTime.message}</ErrorMessage>
            )}
          </Field>
          <Field className="col-span-1 sm:col-span-3">
            <Label>작전 개시 시간</Label>
            <Input
              disabled={isLoading || isMutating}
              type="time"
              invalid={!!errors.operationTime}
              {...register("operationTime", { required: "시간을 정해주세요" })}
            />
            {errors.operationTime && (
              <ErrorMessage>{errors.operationTime.message}</ErrorMessage>
            )}
          </Field>
          <Button
            disabled={isMutating}
            type="submit"
            className="not-sm:col-span-full"
          >
            저장
          </Button>
        </SettingFieldGroup>
      </SettingSection>
    </form>
  );
}

type Inputs = {
  title: string;
  description: string;
  readinessTime: string;
  operationTime: string;
};
