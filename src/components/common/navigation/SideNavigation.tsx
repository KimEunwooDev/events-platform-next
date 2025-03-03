"use client";

import styles from "./SideNavigation.module.scss";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SideNavigation() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.container__searchBox}></div>
      <div className={styles.container__buttonBox}>
        <Button
          variant={"outline"}
          className="w-full text-orange-500 hover:bg-orange-50 hover:text-orange-500 border-orange-400 cursor-pointer"
          onClick={() => router.push("/admin/create")}
        >
          Create new events
        </Button>
      </div>
    </div>
  );
}
