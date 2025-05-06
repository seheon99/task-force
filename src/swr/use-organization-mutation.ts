import useSWRMutation from "swr/mutation";

import { updateOrganization } from "@/actions/database";

import type { Organization } from "@prisma";

import { SWR_KEY_ORGANIZATION } from "./use-organization";

async function fetcher(
  [, id]: ReturnType<typeof SWR_KEY_ORGANIZATION>,
  {
    arg: { name, description },
  }: {
    arg: {
      name: Organization["name"];
      description: Organization["description"];
    };
  },
) {
  return await updateOrganization({ id, name, description });
}

export function useOrganizationMutation({ id }: { id: Organization["id"] }) {
  return useSWRMutation(SWR_KEY_ORGANIZATION(id), fetcher);
}
