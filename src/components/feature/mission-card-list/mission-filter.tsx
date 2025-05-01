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
      {organizations?.map((organization) => (
        <Badge
          className={clsx(
            "shrink-0 transition-opacity",
            selectedOrganizationId === null && "opacity-100",
            selectedOrganizationId === organization.id
              ? "opacity-100"
              : "opacity-50",
          )}
          key={organization.id}
          onClick={() =>
            selectOrganization(
              selectedOrganizationId === organization.id
                ? null
                : organization.id,
            )
          }
        >
          {organization.name}
        </Badge>
      ))}
    </div>
  );
}
