"use client";

import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { deleteMember, getMember } from "@/actions";

import type { Member, Organization, User } from "@prisma";

import { SWR_KEY_ORGANIZATIONS } from "./use-organizations";

async function fetchMember([, userId, organizationId, memberId]: ReturnType<
  typeof SWR_KEY_MEMBER
>) {
  if (userId && organizationId) {
    return await getMember({ userId, organizationId });
  } else if (memberId) {
    return await getMember({ memberId });
  } else {
    return null;
  }
}

async function deleteMemberFetcher(
  _: ReturnType<typeof SWR_KEY_MEMBER>,
  { arg: { userId, organizationId, memberId } }: { arg: Props },
) {
  let member: Member | undefined;
  if (userId && organizationId) {
    member = await deleteMember({ userId, organizationId });
  } else if (memberId) {
    member = await deleteMember({ memberId });
  }

  if (member) {
    mutate(SWR_KEY_ORGANIZATIONS(member.userId));
  }
  return member ?? null;
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

export function useMemberLazy(props: Props) {
  return useSWRMutation(SWR_KEY_MEMBER(props), fetchMember);
}

export function useMemberDelete(props: Props) {
  return useSWRMutation(SWR_KEY_MEMBER(props), deleteMemberFetcher);
}
