import "server-only";

import { createRemoteJWKSet } from "jose";

export const JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com",
  ),
);
