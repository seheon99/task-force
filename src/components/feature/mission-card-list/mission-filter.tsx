"use client";

import clsx from "clsx";

import { Badge } from "@/components/base";
import { useMissionFilterStore } from "@/stores";
import { useOrganizations } from "@/swr";

export function MissionFilter() {
  const { data: organizations } = useOrganizations();

  const { selectedOrganizationId, selectOrganization } =
    useMissionFilterStore();

  return (
    <div className="flex gap-1 overflow-x-auto">
      {organizations?.map((o) => (
        <Badge
          className={clsx(
            "shrink-0 transition-opacity",
            selectedOrganizationId === null && "opacity-100",
            selectedOrganizationId === o.id ? "opacity-100" : "opacity-50",
          )}
          key={o.id}
          onClick={() =>
            selectOrganization(selectedOrganizationId === o.id ? null : o.id)
          }
        >
          {o.name}
        </Badge>
      ))}
    </div>
  );
}
