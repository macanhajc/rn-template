import { supabase } from "@/libs/supabase";
import { useQuery } from "@tanstack/react-query";

const doGetUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (!data || error) {
    return null
  }

  return { user: data.user };
};

export function useUser() {
  const query = useQuery({
    queryKey: ["use-user"],
    queryFn: doGetUser,
    staleTime: 1 * 60 * 1000,
  });

  return query;
}
