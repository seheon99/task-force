"use server";

import { Temporal } from "temporal-polyfill";

import { prisma } from "@/utilities/server-only";

import type { Member } from "@prisma";

export async function deleteMember({ id }: { id: Member["id"] }) {
  return await prisma.member.update({
    data: { deletedAt: Temporal.Now.plainDateTimeISO().toString() },
    where: { id },
  });
}
