import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { LockIcon, MailIcon, UserIcon } from "lucide-react-native";
import { router } from "expo-router";
import zod from "zod";

import TextInputForm from "../ui/Inputs/Form/TextInputForm";
import { Button, Text } from "../ui";


export const signUpSchema = zod.object({
  name: zod.string({}).min(6),
  email: zod.string({}).email(),
  pass: zod
    .object({
      password: zod.string({}).min(6),
      confirm: zod.string({}).min(6),
    })
    .superRefine(({ password, confirm }, ctx) => {
      if (confirm !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirm"],
        });
      }
    }),
});

export type SignUpSchema = zod.infer<typeof signUpSchema>;

interface SignUpFormProps {
  loading?: boolean;
  error?: string;
  onSubmit: (form: SignUpSchema) => void;
}

export default function SignUpForm({
  onSubmit,
  loading,
  error,
}: SignUpFormProps) {
  const { control, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <View className="gap-4">
      <View className="gap-4">
        <TextInputForm
          name="name"
          control={control}
          disabled={loading}
          prefix={<UserIcon />}
          placeholder="Your name"
        />
        <TextInputForm
          name="email"
          control={control}
          disabled={loading}
          prefix={<MailIcon />}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter your email"
        />
        <TextInputForm
          name="pass.password"
          control={control}
          disabled={loading}
          prefix={<LockIcon />}
          placeholder="Password"
          secureTextEntry
        />
        <TextInputForm
          name="pass.confirm"
          control={control}
          disabled={loading}
          prefix={<LockIcon />}
          placeholder="Confirm password"
          secureTextEntry
        />

        {error ? <Text className="!text-red-500">{error}</Text> : null}

        <Button
          text="Sign up"
          containerClassName="mt-4"
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Pressable
        className="mt-4"
        onPress={() => router.back()}
        disabled={loading}
      >
        <Text className="text-lg self-center">
          Already have an accout?{" "}
          <Text weight="Medium" className="!text-primary">
            Login
          </Text>
        </Text>
      </Pressable>
    </View>
  );
}
