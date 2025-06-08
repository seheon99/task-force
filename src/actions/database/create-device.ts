"use server";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

const _createDevice = createProtection(
  async (
    user: User,
    {
      endpoint,
      auth,
      p256dh,
    }: {
      endpoint: string;
      auth: string;
      p256dh: string;
    },
  ) => {
    return await prisma.device.create({
      data: {
        userId: user.id,
        endpoint,
        auth,
        p256dh,
      },
    });
  },
);

export async function createDevice(...args: Parameters<typeof _createDevice>) {
  return await _createDevice(...args);
}
