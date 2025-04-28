"use server";

import { prisma } from "@/utilities";

import type { Organization } from "@prisma";

export async function getOrganization({ id }: { id: Organization["id"] }) {
  return await prisma.organization.findUnique({ where: { id } });
}
