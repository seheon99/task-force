import { Temporal } from "temporal-polyfill";
import { createLogger, transports } from "winston";

import { environments } from "./environments";

const logger = createLogger({
  transports: [
    new transports.File({ filename: environments.DB_ACCESS_LOG_FILENAME }),
  ],
});

export function logAction({ tag, payload }: { tag: string; payload: string }) {
  logger.info(`${Temporal.Now.plainDateTimeISO()} ${tag}: ${payload}`);
}

export function logError({ tag, payload }: { tag: string; payload: string }) {
  logger.error(`${Temporal.Now.plainDateTimeISO()} ${tag}: ${payload}`);
}
