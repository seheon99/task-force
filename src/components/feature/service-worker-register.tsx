"use client";

import { useEffect } from "react";

import { toast } from "@/components/base";
import { vapidKeys } from "@/utilities/client-only";

export function ServiceWorkerRegister() {
  useEffect(() => {
    async function registServiceWorker() {
      const workerFile = "/service-worker.js";
      const registration = await navigator.serviceWorker.register(workerFile);
      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: vapidKeys.publicKey,
        });
        if (!subscription) {
          toast.info({
            title: "푸시 알람 해제",
            description: "설정에서 언제든지 변경할 수 있습니다",
          });
        }
      }
    }
    registServiceWorker();
  }, []);

  return <></>;
}
