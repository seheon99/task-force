"use client";

import { useMissions } from "@/hooks/use-missions";

import type { Mission } from "@prisma";

export function useMission({ id }: { id: Mission["id"] }) {
  const swr = useMissions();
  return { ...swr, data: swr.data?.find((m) => m.id === id) };
}
