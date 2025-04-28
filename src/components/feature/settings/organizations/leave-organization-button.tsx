"use client";

import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
  toast,
} from "@/components/base";
import { useMemberDelete, useMemberLazy } from "@/swr";

import type { Organization, User } from "@prisma";

export function LeaveOrganizationButton({
  user,
  organization,
}: {
  user: User;
  organization: Organization;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: member,
    isMutating: isLoadingMember,
    trigger: fetchMember,
  } = useMemberLazy({
    userId: user.id,
    organizationId: organization.id,
  });

  const { trigger: deleteMember } = useMemberDelete({
    userId: user.id,
    organizationId: organization.id,
  });

  useEffect(() => {
    if (isOpen) {
      fetchMember();
    }
  }, [fetchMember, isOpen]);

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
            disabled={isLoadingMember}
            onClick={async () => {
              if (member) {
                try {
                  await deleteMember({ memberId: member.id });
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
