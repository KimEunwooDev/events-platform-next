import { Events } from "@/components/board/columns";
import { supabase } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";
import { useGetEvents } from "./useGetEvents";
import { Event } from "@/types";

function useGetEventsByUser() {
  const [events, setEvents] = useState<any>([]);

  const getEventsByUser = useCallback(async (userId: string) => {
    try {
      const { data, status, error } = await supabase
        .from("events_signups")
        .select(
          `
          event_id,
          events (
            id,
            title,
            date,
            time_start,
            time_end,
            address,
            description,
            status,
            imageUrls
          )
        `
        )
        .eq("user_id", userId);

      if (data && status === 200) {
        console.log(data, "data in useGetEventsByUser");
        const eventsByUser = data.map((event) => event.events);
        console.log(eventsByUser, "eventsByUser in useGetEventsByUser");
        setEvents(eventsByUser);
      } else {
        console.log("Events not found.");
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { getEventsByUser, events };
}

export { useGetEventsByUser };
