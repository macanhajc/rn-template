import { SignInType, signInWithPassword } from "@/api/auth/signIn.api";
import SignInForm, { SignInSchema } from "@/components/forms/signIn.form";
import { Screen, Text } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { View } from "react-native";

export default function AuthSingIn() {
  const {
    mutate: signIn,
    isPending,
    error,
  } = useMutation<SignInType, Error, SignInSchema>({
    mutationFn: signInWithPassword,
    onSuccess: () => {
      router.push("/main");
    },
  });

  return (
    <Screen>
      <View className="px-6 flex-grow gap-8 pb-8 justify-center my-16">
        <Text weight="Medium" className="text-5xl" style={{ lineHeight: 50 }}>
          Login to your {"\n"}account
        </Text>

        <SignInForm
          loading={isPending}
          error={error?.message}
          onSubmit={signIn}
        />
      </View>
    </Screen>
  );
}
