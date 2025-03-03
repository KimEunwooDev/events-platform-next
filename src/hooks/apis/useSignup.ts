import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function useSignup() {
  const [isSignedup] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const signup = async (email: string, password: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: "user" } },
    });

    if (error) {
      console.error("fail to create an account", error.message);
      setErrorMessages(error.message);
    } else {
      //   await supabase.auth.signOut();
      toast("Created successfully", {
        description: `We've created your account for ${email}. Please check your email to active your account!`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      redirect("/"); // 로그인 페이지로 이동
    }
  };
  return { signup, isSignedup, errorMessages };
}

export { useSignup };
