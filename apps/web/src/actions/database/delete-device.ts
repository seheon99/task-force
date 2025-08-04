"use server";

import { prisma } from "@taskforce/database";
import { User } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";

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
