import { XMarkIcon } from "@heroicons/react/16/solid";
import { uniqBy } from "es-toolkit";
import { useCallback, useEffect, useState } from "react";

import {
  Button,
  Field,
  Label,
  Legend,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  toast,
} from "@/components/base";
import {
  SettingFieldGroup,
  SettingSection,
  SettingSectionName,
  UsersCombobox,
} from "@/components/feature";
import { useMission, useParticipantsMutation } from "@/swr";

import type { Mission, User } from "@prisma";

export function ParticipantSection({ id }: { id: Mission["id"] }) {
  const [invitedUser, setInvitedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const { data: mission } = useMission({ id });
  const { trigger, isMutating } = useParticipantsMutation({ missionId: id });

  const onUserInvited = useCallback((invitedUser: User) => {
    setUsers((users) => uniqBy([...users, invitedUser], (u) => u.id));
    setInvitedUser(null);
  }, []);

  const onUserEjected = useCallback((ejectedUser: User) => {
    setUsers((users) => users.filter((user) => user.id !== ejectedUser.id));
  }, []);

  const onButtonClick = useCallback(
    async (users: User[]) => {
      try {
        const result = await trigger({ userIds: users.map((user) => user.id) });
        toast.success({
          title: "변경 성공",
          description: result[0].updatedAt.toString(),
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
    if (mission?.participants) {
      setUsers(mission.participants.map((p) => p.user));
    }
  }, [mission?.participants]);

  return (
    <SettingSection className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
      <SettingSectionName>
        <Legend>팀원 설정</Legend>
        <Text>Description</Text>
      </SettingSectionName>
      <SettingFieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
        <Field className="col-span-full">
          <Label>팀원 추가</Label>
          <div data-slot="control" className="flex gap-1">
            <UsersCombobox
              disabled={isMutating}
              value={invitedUser}
              onChange={setInvitedUser}
            />
            <Button
              outline
              disabled={isMutating}
              className="shrink-0"
              onClick={() => invitedUser && onUserInvited(invitedUser)}
            >
              추가
            </Button>
          </div>
        </Field>
        <Field className="col-span-full">
          <Label>팀원 목록</Label>
          <div data-slot="control">
            <Table
              bleed
              className="[--gutter:--spacing(6)] sm:[--gutter:--spacing(8)]"
            >
              <TableHead>
                <TableRow>
                  <TableHeader>소속</TableHeader>
                  <TableHeader>계급</TableHeader>
                  <TableHeader>이름</TableHeader>
                  <TableHeader className="w-0">
                    <span className="sr-only">actions</span>
                  </TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.unit}</TableCell>
                    <TableCell>{user.rank}</TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>
                      <Button plain className="-mx-3 -my-1.5 sm:-mx-2.5">
                        <XMarkIcon onClick={() => onUserEjected(user)} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Field>
        <Button disabled={isMutating} onClick={() => onButtonClick(users)}>
          저장
        </Button>
      </SettingFieldGroup>
    </SettingSection>
  );
}
