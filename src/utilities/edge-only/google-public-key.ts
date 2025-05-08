import "server-only";

import { importX509 } from "jose";

export const googlePublicKey = async (kid: string) => {
  const keys = await fetch(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
  );
  const json = await keys.json();
  if (kid in json) {
    return await importX509(json[kid], "RS256");
  }
};
