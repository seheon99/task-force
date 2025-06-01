import { Temporal } from "temporal-polyfill";
import { createLogger, transports } from "winston";

const logger = createLogger({
  transports: [new transports.File({ filename: "action.log" })],
});

export function logAction({ tag, payload }: { tag: string; payload: string }) {
  logger.info(`${Temporal.Now.plainDateTimeISO()} ${tag}: ${payload}`);
}

export function logError({ tag, payload }: { tag: string; payload: string }) {
  logger.error(`${Temporal.Now.plainDateTimeISO()} ${tag}: ${payload}`);
}
