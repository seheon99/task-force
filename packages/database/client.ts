import "server-only"

import { PrismaClient } from "./generated/client";

const prismaClient = new PrismaClient();

const globalForPrisma = globalThis as typeof globalThis & { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? prismaClient;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}