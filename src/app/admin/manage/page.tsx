"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import Image from "next/image";
import { useAtom } from "jotai";
import { eventsAtom } from "@/stores/atoms";
import { EventsTable } from "@/components/board/event-table";
import { columns } from "@/components/board/columns";
import { useEffect } from "react";
import Loading from "@/components/Loading";
import { getEvents } from "@/lib/getEvents";

export default function ManagePage() {
  const router = useRouter();
  const [events, setEvents] = useAtom(eventsAtom);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();

      setEvents(data);
    };
    fetchEvents();
  }, [events.length, setEvents]);

  // useEffect(() => {
  //   router.prefetch("/manage");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!events) return <Loading />;

  if (events.length === 0) {
    setTimeout(() => {
      return (
        <div className="flex">
          <div className={styles.container}>
            <div className={styles.container__onBoard}>
              <div className={styles.container__onBoard__title}>
                There are no events yet
              </div>
              <div className={styles.container__onBoard__subTitle}>
                Click the button to create a event
              </div>
              <button
                className={styles.container__onBoard__button}
                onClick={() => router.push("/admin/create")}
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
    }, 1000);
  }

  return <EventsTable columns={columns} data={events} />;
}
