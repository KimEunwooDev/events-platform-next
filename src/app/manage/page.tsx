"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import SideNavigation from "@/components/common/navigation/SideNavigation";
import Image from "next/image";

export default function ManagePage() {
  const router = useRouter();

  return (
    <div className="flex">
      <SideNavigation />
      <div className={styles.container}>
        <div className={styles.container__onBoard}>
          <div className={styles.container__onBoard__title}>
            There are no events yet
          </div>
          <div className={styles.container__onBoard__subTitle}>
            Click the button to create a event
          </div>
          <button
            className={styles.__onBoard__button}
            onClick={() => router.push("/create")}
          >
            <Image
              src="/assets/images/button-plus.svg"
              alt="button-plus"
              width={100}
              height={100}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
