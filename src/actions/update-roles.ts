"use server";

import { isNotNil } from "es-toolkit";

import { prisma } from "@/utilities/server-only";

import type { Mission, Role } from "@prisma";

export async function updateRoles({
  missionId,
  roles,
}: {
  missionId: Mission["id"];
  roles: Pick<Role, "id" | "name" | "color">[];
}) {
  const resolved = await Promise.all(
    roles.map(async (r) =>
      (await prisma.role.findUnique({
        where: {
          id: r.id,
        },
      }))
        ? null
        : r,
    ),
  );
  const unregisted = resolved.filter(isNotNil);
  return await prisma.role.createMany({
    data: unregisted.map(({ name, color }) => ({
      missionId,
      name,
      color,
    })),
  });
}
