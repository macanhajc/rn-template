import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import "react-native-reanimated";
import { useCallback, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { router } from "expo-router";

if (__DEV__) require("../../ReactotronConfig");

SplashScreen.preventAutoHideAsync();

export default function AppIndex() {
  const { isLoading, data } = useUser();

  Font.useFonts({
    "Poppins-Black": require("../../assets/fonts/poppins_black.ttf"),
    "Poppins-Bold": require("../../assets/fonts/poppins_bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/poppins_semibold.ttf"),
    "Poppins-Medium": require("../../assets/fonts/poppins_medium.ttf"),
    "Poppins-Regular": require("../../assets/fonts/poppins_regular.ttf"),
    "Poppins-Light": require("../../assets/fonts/poppins_light.ttf"),
    "Poppins-LightItalic": require("../../assets/fonts/poppins_lightItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (data?.user) {
      router.push("/main");
    } else {
      router.push("/auth/signIn");
    }

    SplashScreen.hideAsync();
  }, [data]);

  useEffect(() => {
    if (!isLoading) onLayoutRootView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return null;
}
