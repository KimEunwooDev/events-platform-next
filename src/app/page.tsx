"use client";

import EventCard from "@/components/card/EventCard";
import styles from "./page.module.scss";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/searchbar/SearchBar";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data, error } = await supabase.from("events").select("*");
        if (error) throw error;
        setEvents(data);
        console.log("✅ 이벤트 데이터 불러오기 성공:", data);
      } catch (error) {
        console.error("❌ fetch error", error);
      }
    };
    getEvents();
    console.log(events);
  }, [events]);

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
        <div className={styles.page__contents__listBox}>
          {events.map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
