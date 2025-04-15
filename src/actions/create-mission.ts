"use server";

import { prisma } from "@/utilities";

export async function createMission({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const mission = await prisma.mission.create({ data: { title, description } });
  return mission;
}
