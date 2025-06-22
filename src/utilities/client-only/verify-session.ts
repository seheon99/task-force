"use client";
import "client-only";

import { decodeJwt } from "jose";

import { ACCESS_TOKEN } from "@/constants";

export function verifySession() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) {
    return null;
  }

  const { sub } = decodeJwt(token);
  return sub;
}
