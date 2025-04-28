"use server";

import { prisma } from "@/utilities";

export async function createUser({
  id,
  soldierId,
  unit,
  name,
  birthday,
  enlistedAt,
}: {
  id: string;
  soldierId: string;
  unit: string;
  name: string;
  birthday: Date;
  enlistedAt: Date;
}) {
  const user = await prisma.user.create({
    data: { id, soldierId, unit, rank: "이병", name, birthday, enlistedAt },
  });
  return user;
}
