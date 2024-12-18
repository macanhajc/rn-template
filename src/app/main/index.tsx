import { Button, Screen, Text } from "@/components/ui";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/libs/supabase";
import { router } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

export default function MainIndex() {
  const { data } = useUser();

  const doLogout = useCallback(() => {
    supabase.auth.signOut();
    router.dismissAll();
    router.replace("/auth/signIn");
  }, []);

  return (
    <Screen>
      <View className="p-6 gap-6">
        <Text>Hello</Text>
        <Text>{data?.user.email}</Text>
        <Button text="Logout" onPress={doLogout} />
      </View>
    </Screen>
  );
}
