"use server";

import { prisma } from "@/utilities";

export async function createUser({
  id,
  unit,
  username,
  nickname,
  birthday,
  enlistedAt,
}: {
  id: string;
  unit: string;
  username: string;
  nickname: string;
  birthday: Date;
  enlistedAt: Date;
}) {
  const user = await prisma.user.create({
    data: { id, unit, username, nickname, rank: "이병", birthday, enlistedAt },
  });
  return user;
}
