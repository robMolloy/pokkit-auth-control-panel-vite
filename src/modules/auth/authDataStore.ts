import PocketBase from "pocketbase";
import { useEffect } from "react";
import { create } from "zustand";
import { pocketbaseAuthStoreSchema, type TAuth } from "./dbAuthUtils";
import type { TSuperuser } from "@/modules/superusers/dbSuperusersUtils";

type TState = { authStatus: "loading" | "loggedOut" } | { authStatus: "loggedIn"; user: TAuth };

export const useUnverifiedIsLoggedInStore = create<{
  data: TState;
  setData: (x: TState) => void;
}>()((set) => ({
  data: { authStatus: "loading" },
  setData: (data) => set(() => ({ data })),
}));

export const useUnverifiedIsLoggedInSync = (p: { pb: PocketBase }) => {
  const isLoggedInStore = useUnverifiedIsLoggedInStore();
  useEffect(() => {
    console.log(`authDataStore.ts:${/*LL*/ 20}`, {});
    if (!p.pb.authStore.isValid) return isLoggedInStore.setData({ authStatus: "loggedOut" });

    const resp = pocketbaseAuthStoreSchema.safeParse(p.pb.authStore);
    isLoggedInStore.setData(
      resp.success ? { authStatus: "loggedIn", user: resp.data } : { authStatus: "loggedOut" },
    );
  }, []);

  useEffect(() => {
    console.log(`authDataStore.ts:${/*LL*/ 30}`, {});
    p.pb.authStore.onChange(() => {
      console.log(`authDataStore.ts:${/*LL*/ 32}`, p.pb.authStore);
      if (!p.pb.authStore.isValid) return isLoggedInStore.setData({ authStatus: "loggedOut" });

      console.log(`authDataStore.ts:${/*LL*/ 35}`, {});
      const resp = pocketbaseAuthStoreSchema.safeParse(p.pb.authStore);
      console.log(`authDataStore.ts:${/*LL*/ 35}`, { resp });
      isLoggedInStore.setData(
        resp.success ? { authStatus: "loggedIn", user: resp.data } : { authStatus: "loggedOut" },
      );
    });
  }, []);
};

type TCurrentUserState =
  | { authStatus: "loading" | "loggedOut" }
  | { authStatus: "loggedIn"; user: TSuperuser };

export const useCurrentUserStore = create<{
  data: TCurrentUserState;
  setData: (x: TCurrentUserState) => void;
}>()((set) => ({
  data: { authStatus: "loading" },
  setData: (data) => set(() => ({ data })),
}));
