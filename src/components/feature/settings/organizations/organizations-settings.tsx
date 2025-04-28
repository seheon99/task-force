"use client";

import {
  Button,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base";
import { useOrganizations } from "@/swr";

import { LeaveOrganizationButton } from "./leave-organization-button";

export function OrganizationsSettings() {
  const { data: organizations } = useOrganizations();

  return (
    <div>
      <div className="flex justify-between">
        <Heading>소속</Heading>
        <Button outline className="text-sm">
          새 팀 만들기
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>팀 이름</TableHeader>
            <TableHeader className="hidden sm:table-cell">멤버 수</TableHeader>
            <TableHeader className="hidden sm:table-cell">미션 수</TableHeader>
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
                <LeaveOrganizationButton organization={org} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
