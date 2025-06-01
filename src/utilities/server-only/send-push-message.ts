import "server-only";

import { isPlainObject } from "es-toolkit";
import * as webPush from "web-push";

import { deleteDevice, getDevices } from "@/actions/database";

import { logAction, logError } from "./logger";

const vapidKeys = {
  subject: process.env.VAPID_SUBJECT!,
  publicKey: process.env.VAPID_PUBLIC_KEY!,
  privateKey: process.env.VAPID_PRIVATE_KEY!,
};

webPush.setVapidDetails(
  vapidKeys.subject,
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

export async function sendPushMessage({
  userId,
  payload,
}: {
  userId: string;
  payload: string;
}) {
  const devices = await getDevices({ userId });
  return Promise.all(
    devices.map(async ({ id, endpoint, auth, p256dh }) => {
      try {
        await webPush.sendNotification(
          { endpoint, keys: { auth, p256dh } },
          payload,
        );
        logAction({ tag: "PUSH SUCCESS", payload: `${userId},${payload}` });
      } catch (error) {
        logError({ tag: "PUSH FAIL", payload: `${userId},${payload}` });
        if (
          isPlainObject(error) &&
          "statusCode" in error &&
          typeof error.statusCode === "number"
        ) {
          if (error.statusCode === 404 || error.statusCode === 410) {
            await deleteDevice({ id });
          }
        } else {
          throw error;
        }
      }
    }),
  );
}
