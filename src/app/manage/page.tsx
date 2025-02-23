import styles from "./page.module.scss";
import { Button } from "@/components/ui/button";

export default function ManagePage() {
  return (
    <div className={styles.container}>
      <div className={styles.container}>Create a event</div>
      <Button
        variant={"outline"}
        className="w-full bg-transparent text-orange-500 border-orange-400 hover:bg-orange-50"
      >
        Button
      </Button>
    </div>
  );
}
