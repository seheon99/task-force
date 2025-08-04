"use server";

import type { User } from "@taskforce/database";
import { prisma } from "@taskforce/database";

import { createProtection } from "@/utilities/server-only";

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
