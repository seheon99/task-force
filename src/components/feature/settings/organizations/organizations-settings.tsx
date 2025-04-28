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

export function OrganizationsSettings() {
  const { data: user } = useUser();
  const { data: organizations, isLoading } = useOrganizations();

  return (
    <div>
      {organizations && organizations.length === 0 && (
        <div className="flex w-full flex-col items-center gap-y-2">
          <ExclamationCircleIcon className="size-12 text-yellow-400" />
          <Strong className="mt-2">소속 없음</Strong>
          <Text>새로운 팀을 만들거나 기존 팀에 합류하세요</Text>
          <Button outline className="mt-2">
            <PlusIcon />새 팀 만들기
          </Button>
        </div>
      )}
      {organizations && organizations.length > 0 && (
        <>
          <div className="flex justify-between">
            <Heading>소속</Heading>
            <Button outline className="text-sm">
              새 팀 만들기
            </Button>
          </div>
          {isLoading && <Loading />}
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>팀 이름</TableHeader>
                <TableHeader className="hidden sm:table-cell">
                  멤버 수
                </TableHeader>
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
                <TableRow key={org.id}>
                  <TableCell>{org.name}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {org._count.Member}명 활동 중
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {org._count.Mission}개 미션 진행 중
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <Button outline className="text-sm">
                      설정
                    </Button>
                    {user && (
                      <LeaveOrganizationButton user={user} organization={org} />
                    )}
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
