import { mutate } from "swr";
import { create } from "zustand";

import {
  deleteAccessTokenCookie,
  restoreToken,
  setAccessTokenCookie,
} from "@/actions/auth";
import { ACCESS_TOKEN } from "@/constants";
import { SWR_KEY_ME, fetchUser } from "@/swr";

import { User } from "@prisma";

type UserSessionStore = {
  token: string | null;
  user: User | null;

  createSession: (token: string) => Promise<User | null>;
  refreshSession: () => Promise<string | null>;
  deleteSession: () => Promise<void>;
};

export const useUserSessionStore = create<UserSessionStore>()((set, get) => ({
  token: null,
  user: null,

  createSession: async (token: string) => {
    setAccessTokenCookie(token);
    localStorage.setItem(ACCESS_TOKEN, token);
    const user = (await mutate(SWR_KEY_ME, fetchUser)) ?? null;
    set({ user, token });
    return user;
  },
  refreshSession: async () => {
    const { deleteSession } = get();
    const token = get().token ?? localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      return null;
    }

    try {
      const newToken = await restoreToken(token);
      setAccessTokenCookie(newToken);
      localStorage.setItem(ACCESS_TOKEN, newToken);
      set({ token: newToken });
      return newToken;
    } catch {
      await deleteSession();
      return null;
    }
  },
  deleteSession: async () => {
    deleteAccessTokenCookie();
    localStorage.removeItem(ACCESS_TOKEN);
    set({ token: null, user: null });
    await mutate(SWR_KEY_ME, fetchUser);
  },
}));
