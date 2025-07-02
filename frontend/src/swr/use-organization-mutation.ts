import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { updateOrganization } from "@/actions/database";

import type { Organization } from "@prisma";

import { SWR_KEY_ORGANIZATION } from "./use-organization";
import { SWR_KEY_ORGANIZATIONS } from "./use-organizations";

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
  const result = await updateOrganization({ id, name, description });
  mutate(SWR_KEY_ORGANIZATIONS);
  return result;
}

export function useOrganizationMutation({ id }: { id: Organization["id"] }) {
  return useSWRMutation(SWR_KEY_ORGANIZATION(id), fetcher);
}
