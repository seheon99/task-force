import "server-only";

import { BadgeColor, badgeColors } from "@/components/base";

import { PrismaClient } from "@prisma";

export const prisma = new PrismaClient().$extends({
  result: {
    role: {
      badgeColor: {
        needs: { color: true },
        compute(role) {
          if (role.color in Object.keys(badgeColors)) {
            return role.color as BadgeColor;
          } else {
            throw new Error("FATAL: Unknown color in Role Table");
          }
        },
      },
    },
  },
});
