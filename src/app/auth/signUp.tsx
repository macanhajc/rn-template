import { SignUpType, signUpWithCredentials } from "@/api/auth/signUp.api";
import SignUpForm, { SignUpSchema } from "@/components/forms/signUp.form";
import { Screen, Text } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { View } from "react-native";

export default function AuthSingUp() {
  const {
    mutate: signUp,
    isPending,
    error,
  } = useMutation<SignUpType, Error, SignUpSchema>({
    mutationFn: signUpWithCredentials,
    onSuccess: () => {
      router.push("/main");
    },
  });

  return (
    <Screen>
      <View className="px-6 flex-grow gap-8 pb-8 justify-center  my-16">
        <Text weight="Medium" className="text-5xl" style={{ lineHeight: 50 }}>
          Create your {"\n"}account
        </Text>
        <SignUpForm
          onSubmit={signUp}
          loading={isPending}
          error={error?.message}
        />
      </View>
    </Screen>
  );
}
