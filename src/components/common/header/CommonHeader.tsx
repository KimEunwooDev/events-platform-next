"use client";

import styles from "./CommonHeader.module.scss";
import logo from "../../../../public/assets/images/image-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// import { supabase } from "@/utils/supabase/supabase";
import { useAtom } from "jotai";
import { loggedInUserAtom } from "@/stores/atoms";
import ProfileDropdown from "@/components/ProfileDropdown";
import { supabase } from "@/utils/supabase/client";

export default function CommonHeader() {
  const [loggedInUser, setLoggedInUser] = useAtom(loggedInUserAtom);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!data) {
        if (error) {
          console.error(error);
        }
      }
      if (data?.user) {
        setLoggedInUser(data.user);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoggedInUser(session?.user || null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__logoBox} onClick={() => router.push("/")}>
        <Image src={logo} alt="logo-iamge" />
        <span className="text-lg font-bold">EventSplash</span>
      </div>
      <div className={styles.header__profileBox}>
        <Button variant="outline">Bookmark</Button>
        {!loggedInUser && (
          <>
            <Button
              variant="outline"
              className="text-orange-500 hover:bg-orange-50 hover:text-orange-500 border-orange-400"
              onClick={() => router.push("/auth/login")}
            >
              Log In
            </Button>
            <Button
              variant="outline"
              className=" bg-orange-500 text-white  hover:bg-amber-600 hover:text-white border-orange-400"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
          </>
        )}
        {loggedInUser && (
          <div className="flex justify-center items-center gap-2 cursor-pointer">
            <ProfileDropdown loggedInUser={loggedInUser} />
          </div>
        )}
      </div>
    </header>
  );
}
