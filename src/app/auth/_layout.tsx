import { useURL } from "expo-linking";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import Toast from "react-native-toast-message";
import {
  createSessionFromUrl,
  CreateSessionType,
} from "@/api/auth/session.api";
import { useMutation } from "@tanstack/react-query";

export default function AuthLayout() {
  const url = useURL();

  const { mutate: createSession } = useMutation<
    CreateSessionType,
    Error,
    Record<string, string>
  >({
    mutationFn: createSessionFromUrl,
    onSuccess: () => {
      router.push("/main");
    },
    onError: (err) => {
      Toast.show({ type: "error", text1: err.message });
    },
  });

  const handleSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) {
      Toast.show({ type: "error", text1: `Unable to proceed: ${errorCode}` });
    }

    if (params) {
      createSession(params);
    }
  };

  useEffect(() => {
    if (url) handleSessionFromUrl(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <Stack screenOptions={{ headerShown: false, animation: "simple_push" }}>
      <Stack.Screen name="signIn" />
      <Stack.Screen name="signUp" />
    </Stack>
  );
}
