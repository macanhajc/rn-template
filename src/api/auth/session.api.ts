import { UnexpectedError } from "@/libs/error";
import { supabase } from "@/libs/supabase";
import { Session, User } from "@supabase/supabase-js";

type CreateSessionType = {
  success: true;
  session: Session;
  user: User;
  type: string;
};

async function createSessionFromUrl(
  params: Record<string, string>
): Promise<CreateSessionType> {
  const { access_token, refresh_token, type } = params;

  if (!access_token) throw new UnexpectedError("Unable to find access token");

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error || !data.session || !data.user) {
    throw new UnexpectedError("Unable to create session from token");
  }

  return {
    success: true,
    session: data.session,
    user: data.user,
    type,
  };
}

export { CreateSessionType, createSessionFromUrl };
