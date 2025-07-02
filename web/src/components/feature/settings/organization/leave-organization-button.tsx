"use client";

import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
  toast,
} from "@/components/base";
import { useMemberDeletion } from "@/swr";

import type { Member, Organization } from "@prisma";

export function LeaveOrganizationButton({
  memberId,
  organization,
}: {
  memberId: Member["id"];
  organization: Organization;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { trigger: deleteMember } = useMemberDeletion();

  return (
    <>
      <Button
        outline
        className="text-sm !text-red-500"
        onClick={() => setIsOpen(true)}
      >
        나가기
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>팀을 떠나시겠습니까?</DialogTitle>
        <DialogDescription>
          {organization.name} 팀에서 떠나시겠습니까? 다시 초대되기 전까진 돌아올
          수 없습니다.
        </DialogDescription>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            남아있기
          </Button>
          <Button
            color="red"
            onClick={async () => {
              try {
                await deleteMember({ id: memberId });
                setIsOpen(false);
              } catch (error) {
                toast.error({
                  title: "떠나기 실패",
                  description:
                    error instanceof Error
                      ? error.message
                      : `알 수 없는 오류가 발생했습니다. (${error})`,
                });
              }
            }}
          >
            떠나기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
