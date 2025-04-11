"use server";

import { prisma } from "@/utilities";

export async function getUser({ id }: { id: string }) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      participants: {
        include: {
          mission: true,
        },
      },
    },
  });
}
