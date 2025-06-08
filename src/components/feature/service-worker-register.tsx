"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/base";
import { vapidKeys } from "@/utilities/client-only";

export function ServiceWorkerRegister() {
  const [buttonText, setButtonText] = useState<"구독하기" | "구독 해지하기">(
    "구독하기",
  );

  const toggleSubscription = useCallback(async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      subscription.unsubscribe();
      setButtonText("구독하기");
    } else {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKeys.publicKey,
      });
      console.log("subscription = ", subscription.toJSON());
      setButtonText("구독 해지하기");
    }
  }, []);

  useEffect(() => {
    async function registServiceWorker() {
      const workerFile = "/service-worker.js";
      const registration = await navigator.serviceWorker.register(workerFile);
      const subscription = await registration.pushManager.getSubscription();
      setButtonText(subscription ? "구독 해지하기" : "구독하기");
    }
    registServiceWorker();
  }, []);

  return <Button onClick={toggleSubscription}>{buttonText}</Button>;
}
