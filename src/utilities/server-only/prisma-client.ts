import "server-only";

import { type BadgeColor, badgeColors } from "@/components/base";

import { PrismaClient } from "@prisma";

export const prisma = new PrismaClient().$extends({
  result: {
    role: {
      badgeColor: {
        needs: { color: true },
        compute(role) {
          if (role.color in badgeColors) {
            return role.color as BadgeColor;
          } else {
            return "zinc" as BadgeColor;
          }
        },
      },
    },
  },
});
