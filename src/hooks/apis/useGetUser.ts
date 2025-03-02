import { loggedInUserAtom } from "@/stores/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";

function useGetUser() {
  const [loggedInUser, setLoggedInUser] = useAtom(loggedInUserAtom);

  const getUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (!data) {
        if (error) {
          console.error(error);
          throw new Error("User not found.");
        }
      }
      if (data?.user) {
        setLoggedInUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { getUser, loggedInUser };
}

export { useGetUser };
