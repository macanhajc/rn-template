import { useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { LockIcon, MailIcon } from "lucide-react-native";
import { router } from "expo-router";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Text } from "../ui";
import TextInputForm from "../ui/Inputs/Form/TextInputForm";

export const signInSchema = zod.object({
  email: zod.string({}).email(),
  password: zod.string({}).min(6),
});

export type SignInSchema = zod.infer<typeof signInSchema>;

interface SignInFormProps {
  loading?: boolean;
  error?: string;
  onSubmit: (form: SignInSchema) => void;
}

export default function SignInForm({
  onSubmit,
  loading,
  error,
}: SignInFormProps) {
  const { control, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  return (
    <View className="gap-4">
      <View className="gap-4">
        <TextInputForm
          name="email"
          control={control}
          disabled={loading}
          prefix={<MailIcon />}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
        />
        <TextInputForm
          name="password"
          control={control}
          disabled={loading}
          prefix={<LockIcon />}
          placeholder="Password"
          secureTextEntry
        />

        {error ? <Text className="text-red-500 -mb-4">{error}</Text> : null}

        <Button
          text="Sign in"
          loading={loading}
          containerClassName="mt-4"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Pressable
        className="mt-4"
        onPress={() => router.push("/auth/signUp")}
        disabled={loading}
      >
        <Text className="text-lg self-center">
          Dont have an account?{" "}
          <Text weight="Medium" className="!text-primary text-xl">
            Register
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}
