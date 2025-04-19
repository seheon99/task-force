"use client";

import { useMissions } from "@/hooks";

import { MissionCard, MissionCreateButton } from "./";

export function MissionCardList() {
  const { data: missions, isLoading } = useMissions();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {isLoading && (
        <div className="flex h-20 items-center justify-center text-gray-400">
          Loading...
        </div>
      )}
      {missions && (
        <>
          {missions?.map(({ id }) => (
            <MissionCard key={id} id={id} />
          ))}
          <MissionCreateButton />
        </>
      )}
    </div>
  );
}
