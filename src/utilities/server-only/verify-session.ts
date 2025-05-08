import "server-only";

import { getUser } from "@/actions/database";
import { verifySession as verifySessionAndReturnUserId } from "@/utilities/edge-only";

export async function verifySession() {
  const id = await verifySessionAndReturnUserId();
  if (!id) {
    return null;
  }
  return await getUser({ id });
}
