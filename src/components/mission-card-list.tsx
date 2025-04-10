"use client";

import { useUser } from "@/hooks";

import { MissionCard, MissionCreateButton } from "./";

export function MissionCardList() {
  const { isLoading, data: user } = useUser();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {isLoading && (
        <div className="flex h-20 items-center justify-center text-gray-400">
          Loading...
        </div>
      )}
      {user?.participants.map(({ mission }) => (
        <MissionCard key={mission.id} id={mission.id} />
      ))}
      <MissionCreateButton />
    </div>
  );
}
