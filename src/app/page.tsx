import styles from "./page.module.scss";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container}>Home page</div>
        <div className={styles.container}>Events List</div>
        <Button variant="outline" className="w-full">
          Button
        </Button>
      </div>
    </>
  );
}
