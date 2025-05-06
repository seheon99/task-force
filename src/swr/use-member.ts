"use client";

import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { createMember, deleteMember, getMember } from "@/actions/database";

import type { Member, Organization, User } from "@prisma";

import { SWR_KEY_ORGANIZATION } from "./use-organization";
import { SWR_KEY_ORGANIZATIONS } from "./use-organizations";

async function fetcher([, id]: ReturnType<typeof SWR_KEY_MEMBER>) {
  if (!id) {
    return null;
  }
  return await getMember({ id });
}

async function createFetcher(
  _: ReturnType<typeof SWR_KEY_MEMBER>,
  { arg }: { arg: { userId: User["id"]; organizationId: Organization["id"] } },
) {
  const member = await createMember(arg);
  mutate(SWR_KEY_ORGANIZATIONS(member.userId));
  mutate(SWR_KEY_ORGANIZATION(member.organizationId));
  return member;
}

async function deleteFetcher(
  _: ReturnType<typeof SWR_KEY_MEMBER>,
  { arg: { id } }: { arg: { id: Member["id"] } },
) {
  const member = await deleteMember({ id });
  mutate(SWR_KEY_ORGANIZATIONS(member.userId));
  mutate(SWR_KEY_ORGANIZATION(member.organizationId));
  return member;
}

export const SWR_KEY_MEMBER = ({ id }: { id?: string }) => ["SWR_MEMBER", id];

export function useMember({ id }: { id: string }) {
  return useSWR(SWR_KEY_MEMBER({ id }), fetcher);
}

export function useMemberLazy({ id }: { id: string }) {
  return useSWRMutation(SWR_KEY_MEMBER({ id }), fetcher);
}

export function useMemberCreation() {
  return useSWRMutation(SWR_KEY_MEMBER({}), createFetcher);
}

export function useMemberDeletion() {
  return useSWRMutation(SWR_KEY_MEMBER({}), deleteFetcher);
}
