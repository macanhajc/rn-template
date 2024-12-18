import { SignInSchema } from "@/components/forms/signIn.form";
import { UnexpectedError } from "@/libs/error";
import { supabase } from "@/libs/supabase";
import { Session, User } from "@supabase/supabase-js";

type SignInType = {
  success: boolean;
  session: Session;
  user: User;
};

async function signInWithPassword(form: SignInSchema): Promise<SignInType> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (error) {
    throw new UnexpectedError(error.message ?? `Could not login`);
  }

  return {
    success: true,
    session: data.session,
    user: data.user,
  };
}

export { SignInType, signInWithPassword };
