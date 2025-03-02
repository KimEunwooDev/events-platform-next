import { eventAtom } from "@/stores/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom, useSetAtom } from "jotai";

function useGetEvent() {
  const [event, setEvent] = useAtom(eventAtom);

  const getEvent = async (id: any) => {
    try {
      const { data, status, error } = await supabase
        .from("events")
        .select()
        .eq("id", id);

      if (data && status === 200) {
        setEvent(data[0]);
      } else {
        console.error("Event not found.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { getEvent, event };
}

export { useGetEvent };
