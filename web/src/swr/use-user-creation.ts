import useSWRMutation from "swr/mutation";

import { createUser } from "@/actions/database";

import { SWR_KEY_USERS } from "./use-users";

async function fetcher(
  _: unknown,
  { arg: { username } }: { arg: { username: string } },
) {
  return await createUser({ username });
}

export function useUserCreation() {
  return useSWRMutation(SWR_KEY_USERS, fetcher);
}
