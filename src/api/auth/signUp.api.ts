import { SignUpSchema } from "@/components/forms/signUp.form";
import { UnexpectedError } from "@/libs/error";
import { supabase } from "@/libs/supabase";
import { Session, User } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";

type SignUpType = {
  success: boolean;
  session: Session;
  user: User;
};

const redirectTo = makeRedirectUri();

async function signUpWithCredentials(form: SignUpSchema): Promise<SignUpType> {
  const { data, error } = await supabase.auth.signUp({
    email: form.email,
    password: form.pass.password,
    options: {
      emailRedirectTo: redirectTo,
      data: {
        full_name: form.name,
        email: form.email,
      },
    },
  });

  if (error || !data.session || !data.user) {
    throw new UnexpectedError(`Could not register: ${error?.message}`);
  }

  return {
    success: true,
    session: data.session,
    user: data.user,
  };
}

export { signUpWithCredentials, SignUpType };
