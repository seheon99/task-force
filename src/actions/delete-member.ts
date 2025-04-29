"use server";

import { prisma } from "@/utilities";

import type { Member } from "@prisma";

export async function deleteMember({ id }: { id: Member["id"] }) {
  return await prisma.member.delete({ where: { id } });
}
