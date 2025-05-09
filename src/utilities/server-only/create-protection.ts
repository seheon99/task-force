import "server-only";

import { verifySession } from "@/utilities/server-only";

import { User } from "@prisma";

export function createProtection<Args extends unknown[], R>(
  fn: (user: User, ...args: Args) => R | Promise<R>,
): (...args: Args) => Promise<R> {
  return async (...args: Args): Promise<R> => {
    const user = await verifySession();
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await fn(user, ...args);
  };
}
