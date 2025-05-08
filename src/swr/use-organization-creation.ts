import useSWRMutation from "swr/mutation";

import { createMember, createOrganization } from "@/actions/database";
import { UnauthorizedError } from "@/errors";
import { verifySession } from "@/utilities/client-only";

import { Organization } from "@prisma";

import { SWR_KEY_ORGANIZATIONS } from "./use-organizations";

async function fetcher(
  _: unknown,
  {
    arg: { name, description },
  }: {
    arg: {
      name: Organization["name"];
      description: Organization["description"];
    };
  },
) {
  const userId = verifySession();
  if (!userId) {
    throw new UnauthorizedError();
  }

  const organization = await createOrganization({ name, description });
  await createMember({
    userId,
    organizationId: organization.id,
    isLeader: true,
  });
  return organization;
}

export function useOrganizationCreation() {
  return useSWRMutation(SWR_KEY_ORGANIZATIONS, fetcher);
}
