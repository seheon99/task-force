"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

const _deleteDevice = createProtection(
  async (user: User, props?: { id?: string }) => {
    if (props?.id) {
      const { id } = props;
      return await prisma.device.delete({ where: { id } });
    } else {
      return await prisma.device.deleteMany({ where: { userId: user.id } });
    }
  },
);

export async function deleteDevice(...args: Parameters<typeof _deleteDevice>) {
  return await _deleteDevice(...args);
}
