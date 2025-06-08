"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

const _deleteDevice = createProtection(async (user: User) => {
  return await prisma.device.deleteMany({ where: { userId: user.id } });
});

export async function deleteDevice(...args: Parameters<typeof _deleteDevice>) {
  return await _deleteDevice(...args);
}
