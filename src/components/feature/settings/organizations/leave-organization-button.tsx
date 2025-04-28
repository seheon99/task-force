"use client";

import { useEffect, useState } from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { deleteMember, getMember } from "@/actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogDescription,
  DialogTitle,
} from "@/components/base";
import { SWR_KEY_MEMBER, SWR_KEY_ORGANIZATIONS, useUser } from "@/swr";

import type { Organization } from "@prisma";

export function LeaveOrganizationButton({
  organization,
}: {
  organization: Organization;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useUser();
  const {
    data: member,
    isMutating: isLoadingMember,
    trigger: fetchMember,
  } = useSWRMutation(
    SWR_KEY_MEMBER({
      userId: user?.id ?? "",
      organizationId: organization.id,
    }),
    async ([, userId, organizationId]) =>
      await getMember({ userId: userId!, organizationId: organizationId! }),
  );

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
            onClick={() => {
              if (member) {
                deleteMember({ memberId: member.id });
                mutate(SWR_KEY_ORGANIZATIONS(user?.id));
                setIsOpen(false);
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
