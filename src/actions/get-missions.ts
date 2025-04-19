"use server";

import { prisma } from "@/utilities";
import { User } from "@prisma";

export async function getMissions({ uid }: { uid: User["id"] }) {
  return await prisma.mission.findMany({
    include: {
      participants: true,
    },
    where: {
      participants: {
        some: {
          userId: uid,
        },
      },
    },
  });
}
