"use client";

import { useCallback, useEffect, useState } from "react";

import { createDevice, deleteDevice } from "@/actions/database";
import { Loading, Switch, toast } from "@/components/base";
import { bufferToBase64, vapidKeys } from "@/utilities/client-only";

export function PushNotificationSwitch() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const subscribe = useCallback(async () => {
    setEnabled(true);
    setLoading(true);

    const registration = await navigator.serviceWorker.ready;
    if (await registration.pushManager.getSubscription()) {
      setLoading(false);
      return;
    }

    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKeys.publicKey,
      });

      const p256dhBuffer = subscription.getKey("p256dh");
      const authBuffer = subscription.getKey("auth");
      if (!p256dhBuffer || !authBuffer) {
        throw new Error(
          `empty subscription: ${JSON.stringify({ p256dhBuffer, authBuffer })}`,
        );
      }

      await createDevice({
        endpoint: subscription.endpoint,
        p256dh: bufferToBase64(p256dhBuffer),
        auth: bufferToBase64(authBuffer),
      });
    } catch (error) {
      setEnabled(false);
      toast.error({
        title: "알림 설정 실패",
        description: `관리자에게 문의해주세요: ${JSON.stringify(error)}`,
      });
    }
    setLoading(false);
  }, []);

  const unsubscribe = useCallback(async () => {
    setEnabled(false);
    setLoading(true);

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      setLoading(false);
      return;
    }
    await deleteDevice();
    subscription.unsubscribe();
    setLoading(false);
  }, []);

  useEffect(() => {
    async function checkPushSubscriptionStatus() {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setEnabled(!!subscription);
      setLoading(false);
    }
    checkPushSubscriptionStatus();
  }, []);

  return (
    <>
      <Switch
        checked={enabled}
        disabled={loading}
        onChange={(checked) => (checked ? subscribe() : unsubscribe())}
      />
      {loading && <Loading className="text-zinc-500" />}
    </>
  );
}
