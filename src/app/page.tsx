"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import EventCard from "@/components/card/EventCard";
import styles from "./page.module.scss";
import { supabase } from "@/utils/supabase/supabase";
import { useEffect, useState } from "react";
import SearchBar from "@/components/common/searchbar/SearchBar";
import { useAtom, useAtomValue } from "jotai";
import { eventsAtom, searchAtom } from "@/stores/atoms";
import Loading from "@/components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useAtom(eventsAtom);

  const eventsPerPage = 8;
  const [, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(eventsPerPage);
  const search = useAtomValue(searchAtom);

  const getEvents = async () => {
    try {
      let query = supabase.from("events").select("*");

      if (search && search.length > 0) {
        setPageNumbers([]);
        query = supabase
          .from("events")
          .select("*")
          .ilike("title", `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      setEvents(data);
      setIsLoading(false);
    } catch (error) {
      console.error("fetch error", error);
    }
  };

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const totalPages = Math.ceil(events.length / 8);
    setTotalPages(totalPages);
    setPageNumbers(Array.from({ length: totalPages }, (_, i) => i + 1));
    setCurrentPage(1);
    setStartIndex(0);
  }, [events]);

  return (
    <div className={styles.page}>
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>EventSplash</span>
            {/* search bar section */}
            <SearchBar />
          </div>
        </div>
        {/* loader */}
        {isLoading && (
          <div className="mt-30">
            <Loading />
          </div>
        )}
        <div className={styles.page__contents__listBox}>
          {events.slice(startIndex, endIndex).map((event) => {
            return <EventCard event={event} key={event.id} />;
          })}
        </div>
        <Pagination className="m-2">
          <PaginationContent>
            {pageNumbers.map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  onClick={() => {
                    setCurrentPage(number);
                    setStartIndex((number - 1) * eventsPerPage);
                    setEndIndex(number * eventsPerPage);
                  }}
                  className={
                    currentPage === number
                      ? "bg-orange-600 text-white"
                      : "text-primary"
                  }
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
