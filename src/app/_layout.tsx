import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { AppStateStatus, Platform, StatusBar } from "react-native";
import {
  focusManager,
  onlineManager,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

import useColorScheme from "@/hooks/useColorScheme";
import "../global.css";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import { useAppState } from "@/hooks/useAppState";
import { supabase } from "@/libs/supabase";
import { toastConfig } from "@/libs/toast";

/**
 * Adding the behavior for auto refetch on reconnect.
 */
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

/**
 * Handles changes in the application's state and performs platform-specific actions.
 *
 * - Supabase: Manages authentication token auto-refresh based on app activity.
 * - React Query: Triggers query refetch when the app becomes active.
 *
 * @param {AppStateStatus} status - The current state of the application (e.g., "active", "inactive", or "background").
 */
function onAppStateChange(status: AppStateStatus) {
  if (status === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }

  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
  /**
   * Best way to display query errors is using a global cache-level callback
   * - https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#a-bad-api
   */
  queryCache: new QueryCache({
    onError: (error) => {
      Toast.show({ type: "error", text1: error.message });
    },
  }),
});

export default function RootLayout() {
  const { colors } = useColorScheme();

  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <QueryClientProvider client={queryClient}>
        <StatusBar backgroundColor={colors.background.z0} />
        <GestureHandlerRootView>
          <Stack
            screenOptions={{ headerShown: false, animation: "simple_push" }}
          ></Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>

      <Toast config={toastConfig} position="bottom" />
    </SafeAreaProvider>
  );
}
