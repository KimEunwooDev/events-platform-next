/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { EventsTable } from "@/components/board/event-table";
import { columns } from "@/components/board/myevents-columns";
import { useEffect, useMemo, useState } from "react";
import Loading from "@/components/Loading";
import { useGetUser } from "@/hooks/apis/useGetUser";
import { useGetEventsByUser } from "@/hooks/apis/useGetEventsByUser";

export default function MyEventsPage() {
  const { getUser, loggedInUser } = useGetUser();
  const { getEventsByUser, events } = useGetEventsByUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await getUser();
      setIsUserLoaded(true);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (isUserLoaded && loggedInUser?.id) {
      console.log(loggedInUser, "loggedInUser in MyEventsPage");
      getEventsByUser(loggedInUser?.id);
    }
  }, [isUserLoaded, loggedInUser]);

  if (!events) return <Loading />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const memoizedEvents = useMemo(() => events, [events]);

  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold mt-10 ml-10 ">My Events</div>

      <div>
        {memoizedEvents && <EventsTable columns={columns} data={events} />};
      </div>
    </div>
  );
}
