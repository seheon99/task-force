"use client";

import { useMissionFilterStore } from "@/stores";
import { useMissions } from "@/swr";

import { MissionCard } from "./mission-card";
import { MissionCreateButton } from "./mission-create-button";
import { MissionFilter } from "./mission-filter";

export function MissionCardList() {
  const { data: missions } = useMissions();
  const { selectedOrganizationId } = useMissionFilterStore();
  return (
    <div className="flex flex-col gap-4">
      <MissionFilter />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {missions
          ?.filter((m) =>
            selectedOrganizationId
              ? m.organizationId === selectedOrganizationId
              : true,
          )
          .map(({ id }) => <MissionCard key={id} id={id} />)}
        <MissionCreateButton />
      </div>
    </div>
  );
}
