"use server";

import { flatten } from "es-toolkit";

import { convertToPlainObject } from "@/utilities";
import { prisma } from "@/utilities/server-only";

import type { Mission, Role } from "@prisma";

export async function updateRoles({
  missionId,
  roles,
}: {
  missionId: Mission["id"];
  roles: Pick<Role, "id" | "name" | "color">[];
}) {
  const currentRoles = await prisma.role.findMany({ where: { missionId } });

  const deleteTargets = currentRoles.filter(
    (role) => !roles.find((r) => r.id === role.id),
  );
  const createTargets = roles.filter(
    (role) => !currentRoles.find((r) => r.id === role.id),
  );

  return convertToPlainObject(
    flatten(
      await Promise.all([
        ...deleteTargets.map((target) =>
          prisma.role.delete({
            where: {
              id: target.id,
            },
          }),
        ),
        prisma.role.createManyAndReturn({
          data: createTargets.map(({ name, color }) => ({
            missionId,
            name,
            color,
          })),
        }),
      ]),
    ),
  );
}
