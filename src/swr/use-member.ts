"use client";

import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { deleteMember, getMember } from "@/actions";

import type { Member } from "@prisma";

import { SWR_KEY_ORGANIZATION } from "./use-organization";
import { SWR_KEY_ORGANIZATIONS } from "./use-organizations";

async function fetcher([, id]: ReturnType<typeof SWR_KEY_MEMBER>) {
  if (!id) {
    return null;
  }
  return await getMember({ id });
}

async function deleteFetcher(
  _: ReturnType<typeof SWR_KEY_MEMBER>,
  { arg: { id } }: { arg: { id: Member["id"] } },
) {
  const member = await deleteMember({ id });
  if (member) {
    mutate(SWR_KEY_ORGANIZATIONS(member.userId));
    mutate(SWR_KEY_ORGANIZATION(id));
  }
  return member ?? null;
}

export const SWR_KEY_MEMBER = ({ id }: Props) => ["SWR_MEMBER", id];

export function useMember(props: Props) {
  return useSWR(SWR_KEY_MEMBER(props), fetcher);
}

export function useMemberLazy(props: Props) {
  return useSWRMutation(SWR_KEY_MEMBER(props), fetcher);
}

export function useMemberDeletion() {
  return useSWRMutation(SWR_KEY_MEMBER({}), deleteFetcher);
}

type Props = {
  id?: Member["id"];
};
