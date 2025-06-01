import "server-only";

import { PrismaClient } from "@prisma";

import { logAction } from "./logger";

export const prisma = new PrismaClient({
  log: [{ emit: "event", level: "query" }],
});

prisma.$on("query", (e) => {
  logAction({
    tag: "DATABASE QUERY",
    payload: `${e.duration}ms ${e.query} ${e.params}`,
  });
});
