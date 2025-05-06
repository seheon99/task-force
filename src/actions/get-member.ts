"use server";

import { prisma } from "@/utilities/server-only";

import type { Member } from "@prisma";

export async function getMember({ id }: { id: Member["id"] }) {
  return await prisma.member.findUnique({ where: { id } });
}
