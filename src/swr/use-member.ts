"use client";

import useSWR from "swr";

import { getMember } from "@/actions";

import type { Member, Organization, User } from "@prisma";

async function fetchMember([, userId, organizationId, memberId]: ReturnType<
  typeof SWR_KEY_ORGANIZATIONS
>) {
  if (userId && organizationId) {
    return await getMember({ userId, organizationId });
  } else if (memberId) {
    return await getMember({ memberId });
  } else {
    return null;
  }
}

type Props =
  | {
      userId: User["id"];
      organizationId: Organization["id"];
      memberId?: never;
    }
  | {
      userId?: never;
      organizationId?: never;
      memberId: Member["id"];
    };

export const SWR_KEY_MEMBER = ({ userId, organizationId, memberId }: Props) => [
  "SWR_ORGANIZATIONS",
  userId,
  organizationId,
  memberId,
];

export function useMember(props: Props) {
  return useSWR(SWR_KEY_MEMBER(props), fetchMember);
}
