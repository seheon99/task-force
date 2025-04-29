"use client";

import { ExclamationCircleIcon, PlusIcon } from "@heroicons/react/16/solid";

import {
  Button,
  Heading,
  Loading,
  Strong,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/base";
import { useOrganizations, useUser } from "@/swr";

import { LeaveOrganizationButton } from "./leave-organization-button";
import { NewTeamButton } from "./new-team-button";

export function OrganizationsSettings() {
  const { data: user } = useUser();
  const { data: organizations, isLoading } = useOrganizations();

  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      {organizations && organizations.length === 0 && (
        <div className="flex w-full flex-col items-center gap-y-2">
          <ExclamationCircleIcon className="size-12 text-yellow-400" />
          <Strong className="mt-2">팀 없음</Strong>
          <Text>새로운 팀을 만들거나 기존 팀에 합류하세요</Text>
          <NewTeamButton outline className="mt-2">
            <PlusIcon />새 팀 만들기
          </NewTeamButton>
        </div>
      )}
      {organizations && organizations.length > 0 && (
        <>
          <div className="flex justify-between">
            <Heading>팀</Heading>
            <NewTeamButton outline className="text-sm">
              새 팀 만들기
            </NewTeamButton>
          </div>
          {isLoading && <Loading />}
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>팀 이름</TableHeader>
                <TableHeader>멤버 수</TableHeader>
                <TableHeader className="hidden sm:table-cell">
                  미션 수
                </TableHeader>
                <TableHeader className="relative w-0">
                  <span className="sr-only">actions</span>
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations?.map((org) => (
                <TableRow
                  key={org.id}
                  href={`/settings/organizations/${org.id}`}
                >
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org._count.Member}명 활동 중</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {org._count.Mission}개 미션 진행 중
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <Button outline className="text-sm">
                      설정
                    </Button>
                    <LeaveOrganizationButton
                      memberId={
                        org.Member.find((m) => m.userId === user.id)!.id
                      }
                      organization={org}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}
