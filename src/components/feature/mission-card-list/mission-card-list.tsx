"use client";

import { useMissions } from "@/swr";

import { MissionCard } from "./mission-card";
import { MissionCreateButton } from "./mission-create-button";

export function MissionCardList() {
  const { data: missions } = useMissions();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {missions?.map(({ id }) => (
        <MissionCard key={id} id={id} />
      ))}
      <MissionCreateButton />
    </div>
  );
}
