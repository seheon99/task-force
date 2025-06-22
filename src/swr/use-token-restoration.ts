import useSWRMutation from "swr/mutation";

import { restoreToken } from "@/actions/auth";

const SWR_KEY_TOKEN = "SWR_TOKEN";

async function fetcher(
  _: unknown,
  {
    arg: { token },
  }: {
    arg: {
      token: string;
    };
  },
) {
  return await restoreToken(token);
}

export function useTokenRestoration() {
  return useSWRMutation(SWR_KEY_TOKEN, fetcher);
}
