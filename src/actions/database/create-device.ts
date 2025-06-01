"use server";

import { prisma } from "@/utilities/server-only";

export async function registDevice(data: {
  userId: string;
  endpoint: string;
  auth: string;
  p256dh: string;
}) {
  return await prisma.device.create({ data });
}
