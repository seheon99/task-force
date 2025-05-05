"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";

import {
  BadgeButton,
  Button,
  Divider,
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
import { useMission } from "@/swr";

import type { Mission } from "@prisma";

export function Mission({ id }: { id: Mission["id"] }) {
  const { data: mission } = useMission({ id });

  if (!mission) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-16">
      <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
        <div>
          <Legend>미션 설정</Legend>
          <Text>Description</Text>
        </div>
        <FieldGroup className="grid grid-cols-2 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
          <Field className="col-span-full">
            <Label>팀명</Label>
            <Input disabled value={mission.organization.name} />
          </Field>
          <Field className="col-span-full">
            <Label>미션명</Label>
            <Input disabled value={mission.title} />
          </Field>
          <Field className="col-span-full">
            <Label>설명</Label>
            <Textarea disabled value={mission.description} />
          </Field>
          <Field className="col-span-1 sm:col-span-3">
            <Label>역할 분담 시간</Label>
            <Input type="time" disabled value={mission.readinessTime} />
          </Field>
          <Field className="col-span-1 sm:col-span-3">
            <Label>작전 개시 시간</Label>
            <Input type="time" disabled value={mission.operationTime} />
          </Field>
          <Button className="not-sm:col-span-full">저장</Button>
        </FieldGroup>
      </Fieldset>

      <Divider />

      <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
        <div>
          <Legend>역할 설정</Legend>
          <Text>Description</Text>
        </div>
        <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
          <Field className="col-span-full">
            <Label>역할 목록</Label>
            <div data-slot="control" className="flex flex-wrap gap-1 sm:gap-2">
              {mission.roles.map((role) => (
                <BadgeButton key={role.id} color={role.badgeColor}>
                  {role.name}
                  <XMarkIcon />
                </BadgeButton>
              ))}
            </div>
          </Field>
          <Button>저장</Button>
        </FieldGroup>
      </Fieldset>

      <Divider />

      <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
        <div>
          <Legend>팀원 설정</Legend>
          <Text>Description</Text>
        </div>
        <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
          <Field className="col-span-full">
            <Label>팀명</Label>
            <Input disabled value={mission.organization.name} />
          </Field>
          <Button>저장</Button>
        </FieldGroup>
      </Fieldset>
    </div>
  );
}
