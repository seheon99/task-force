import "server-only";

export const environments = {
  VAPID_SUBJECT: process.env.VAPID_SUBJECT!,
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY!,
  VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_ISSUER: process.env.JWT_ISSUER!,
  DB_ACCESS_LOG_FILENAME: process.env.DB_ACCESS_LOG_FILENAME!,
};
