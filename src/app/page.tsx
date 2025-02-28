"use client";

import EventCard from "@/components/card/EventCard";
import styles from "./page.module.scss";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/searchbar/SearchBar";
import { useAtom, useAtomValue } from "jotai";
import { eventsAtom } from "@/stores/atoms";
import Loading from "@/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useAtom(eventsAtom);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data, error } = await supabase.from("events").select("*");
        if (error) throw error;
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("fetch error", error);
      }
    };
    getEvents();
  }, [setEvents]);

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>EventSplash</span>

            {/* 검색창 UI 부분 */}
            <SearchBar />
          </div>
        </div>
        {isLoading && <Loading />}
        <div className={styles.page__contents__listBox}>
          {events.map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
