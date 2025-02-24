"use client";

import styles from "./CommonHeader.module.scss";
import logo from "../../../../public/assets/images/image-logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CommonHeader() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.header__logoBox} onClick={() => router.push("/")}>
        <Image src={logo} alt="logo-iamge" />
        <span className={styles.header__logoBox_title}>EventSplash</span>
      </div>
      <div className={styles.header__profileBox}>
        <Button variant="outline">Bookmark</Button>
        <Button variant="outline">Calender</Button>
        <Button
          variant="outline"
          className="text-orange-500 hover:bg-orange-50 hover:text-orange-500 border-orange-400"
        >
          Log In
        </Button>
        <Button
          variant="outline"
          className=" bg-orange-500 text-white  hover:bg-amber-600 hover:text-white border-orange-400"
        >
          Sign Up
        </Button>
        <span className={styles.header__profileBox__userName}>User34982</span>
      </div>
    </header>
  );
}
