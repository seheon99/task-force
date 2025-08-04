"use client";

import type { Mission } from "@taskforce/database";

import { Divider, Loading } from "@/components/base";
import { useMission } from "@/swr";


import { MissionSection } from "./mission-section";
import { ParticipantSection } from "./participant-section";
import { RoleSection } from "./role-section";

export function Mission({ id }: { id: Mission["id"] }) {
  const { data: mission } = useMission({ id });

  if (!mission) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8 sm:gap-16">
      <MissionSection id={id} />
      <Divider />
      <RoleSection id={id} />
      <Divider />
      <ParticipantSection id={id} />
    </div>
  );
}
