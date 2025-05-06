"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { now } from "es-toolkit/compat";
import { useCallback, useEffect, useState } from "react";

import {
  BadgeButton,
  Button,
  Field,
  Input,
  Label,
  Legend,
  Loading,
  Text,
  toast,
} from "@/components/base";
import { ColorPicker } from "@/components/feature";
import {
  SettingFieldGroup,
  SettingSection,
  SettingSectionName,
} from "@/components/feature/settings";
import { useMission } from "@/swr";
import { useRolesMutation } from "@/swr/use-roles";

import type { Mission } from "@prisma";

type PartialRole = Pick<
  NonNullable<ReturnType<typeof useMission>["data"]>["roles"][0],
  "id" | "name" | "color" | "badgeColor"
>;

export function RoleSection({ id }: { id: Mission["id"] }) {
  const { trigger, isMutating } = useRolesMutation({ missionId: id });
  const { data: mission } = useMission({ id });

  const [roles, setRoles] = useState<PartialRole[]>([]);
  const [color, setColor] =
    useState<NonNullable<typeof mission>["roles"][0]["badgeColor"]>("zinc");
  const [name, setName] = useState("");

  const onRulePush = useCallback(() => {
    setRoles((roles) => [
      ...roles,
      {
        id: now().toString(),
        name,
        color,
        badgeColor: color,
      },
    ]);
    setName("");
  }, [color, name]);

  const onRulePop = useCallback(
    (id: (typeof roles)[0]["id"]) =>
      setRoles((roles) => roles.filter((r) => r.id !== id)),
    [],
  );

  const onButtonClick = useCallback(
    async (roles: PartialRole[]) => {
      try {
        const result = await trigger({ roles });
        toast.success({
          title: "변경 성공",
          description: `${result.length}개 역할 변경 완료`,
        });
      } catch (error) {
        toast.error({
          title: "변경 실패",
          description: error,
        });
      }
    },
    [trigger],
  );

  useEffect(() => {
    if (mission?.roles) {
      setRoles(mission.roles);
    }
  }, [mission?.roles, setRoles]);

  return (
    <SettingSection>
      <SettingSectionName>
        <Legend>역할 설정</Legend>
        <Text>Description</Text>
      </SettingSectionName>
      <SettingFieldGroup>
        <Field className="col-span-full">
          <Label>역할 추가</Label>
          <div data-slot="control" className="flex gap-1">
            <ColorPicker value={color} onChange={setColor} />
            <Input
              value={name}
              disabled={isMutating}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              className="shrink-0"
              outline
              disabled={isMutating}
              onClick={onRulePush}
            >
              추가
            </Button>
          </div>
        </Field>
        <Field className="col-span-full">
          <Label>역할 목록</Label>
          <div data-slot="control" className="flex flex-wrap gap-1 sm:gap-2">
            {roles ? (
              roles.map((role) => (
                <BadgeButton
                  key={role.id}
                  color={role.badgeColor}
                  onClick={() => onRulePop(role.id)}
                >
                  {role.name}
                  <XMarkIcon />
                </BadgeButton>
              ))
            ) : (
              <Loading />
            )}
          </div>
        </Field>
        <Button onClick={() => onButtonClick(roles)}>저장</Button>
      </SettingFieldGroup>
    </SettingSection>
  );
}
