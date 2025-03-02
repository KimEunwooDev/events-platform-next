export const revalidate = 0;

import { eventsAtom } from "@/stores/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { toast } from "sonner";

function useGetEvents() {
  const [events, setEvents] = useAtom(eventsAtom);
  const getEvents = async () => {
    try {
      const { data, status, error } = await supabase.from("events").select();
      if (data && status === 200) setEvents(data);
      if (error) {
        toast("There was an error fetching events", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast("Network Error", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };
  return { getEvents, events };
}

export { useGetEvents };
