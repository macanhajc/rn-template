import React from "react";
import { Platform } from "react-native";
import { onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";

/**
 * Custom hook to manage the online status for React Query.
 *
 * - Listens for network connectivity changes and updates the online status.
 * - React Query automatically supports auto-refetch on reconnect for web browsers, 
 *   so this is only applied to non-web platforms.
 *
 * @returns {void} This hook does not return a value.
 */
export function useOnlineManager() {
  React.useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== "web") {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null &&
          state.isConnected &&
          Boolean(state.isInternetReachable)
        );
      });
    }
  }, []);
}
