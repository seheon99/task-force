import { invariant, isString } from "es-toolkit";
import useSWRMutation from "swr/mutation";

import { createMember, createOrganization } from "@/actions/database";

import { Organization } from "@prisma";

import { SWR_KEY_ORGANIZATIONS } from "./use-organizations";
import { useUser } from "./use-user";

async function fetcher(
  [, uid]: ReturnType<typeof SWR_KEY_ORGANIZATIONS>,
  {
    arg: { name, description },
  }: {
    arg: {
      name: Organization["name"];
      description: Organization["description"];
    };
  },
) {
  invariant(isString(uid), `Invalid uid(${uid}) in organization creation`);

  const organization = await createOrganization({ name, description });
  await createMember({
    userId: uid,
    organizationId: organization.id,
    isLeader: true,
  });
  return organization;
}

export function useOrganizationCreation() {
  const { data: user } = useUser();
  return useSWRMutation(SWR_KEY_ORGANIZATIONS(user?.id), fetcher);
}
