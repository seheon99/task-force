"use server";

import { Temporal } from "temporal-polyfill";

import { createProtection, prisma } from "@/utilities/server-only";

import { User } from "@prisma";

const _createDevice = createProtection(
  async (
    user: User,
    {
      endpoint,
      auth,
      p256dh,
      expiredAt,
    }: {
      endpoint: string;
      auth: string;
      p256dh: string;
      expiredAt: Temporal.PlainDateTime;
    },
  ) => {
    return await prisma.device.create({
      data: {
        userId: user.id,
        expiredAt: expiredAt.toString(),
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
