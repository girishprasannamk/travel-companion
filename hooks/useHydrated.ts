import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true only after the component has mounted on the client. Use it to
 * gate rendering of persisted (localStorage-backed) state so server and client
 * markup match, avoiding hydration mismatches with zustand persist.
 *
 * Uses useSyncExternalStore with no external store — its getSnapshot returns
 * false on the server and true after mount, which is the React-recommended
 * pattern and avoids the setState-in-effect lint error.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
