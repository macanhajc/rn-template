import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

/**
 * Custom hook to listen for application state changes and execute a callback.
 *
 * - Subscribes to changes in the app's state (e.g., "active", "inactive", or "background").
 * - Automatically cleans up the event listener on component unmount.
 *
 * @param {function(AppStateStatus): void} onChange - Callback function to execute whenever the app state changes.
 */
export function useAppState(onChange: (status: AppStateStatus) => void) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, [onChange]);
}
