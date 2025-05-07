"use server";

import { prisma } from "@/utilities/server-only";

import type { Member } from "@prisma";

export async function deleteMember({ id }: { id: Member["id"] }) {
  return await prisma.member.delete({
    where: { id },
  });
}
