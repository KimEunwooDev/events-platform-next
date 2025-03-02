"use client";
import { supabase } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import { AddToCalendarButton } from "add-to-calendar-button-react";

import { useGetEvent } from "@/hooks/apis/useGetEvent";
import { useGetUser } from "@/hooks/apis/useGetUser";
import { loggedInUserAtom } from "@/stores/atoms";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import Loading from "@/components/Loading";

export default function EventDetail() {
  const { id } = useParams();
  const { getEvent, event } = useGetEvent();
  const { getUser, loggedInUser } = useGetUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    getEvent(id).then(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loading />
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return notFound();
  }

  const handleSignup = async () => {
    const userId = loggedInUser?.id;
    const eventId = parseInt(event.id);

    if (!userId) {
      toast.error("You must be logged in to sign up!");
      return;
    }

    const { data, error } = await supabase
      .from("events_signups")
      .insert([{ user_id: userId, event_id: eventId }])
      .select();

    if (error) {
      if (error.code === "23505") {
        setIsSignedUp(true);
        toast.error("You are already signed up for this event.", {
          description: "You can cancel your sign-up in manage page.",
        });

        return;
      }
      toast.error("Failed to sign up for the event.");
      console.error(error);
      return;
    }
    if (data) {
      setIsSignedUp(true);
      toast.success("Successfully signed up for the event!");
    }
  };

  return (
    <div className="">
      {/* title & image  */}
      <div className="flex justify-items-start w-full h-[300px]">
        <div className="w-1/2 h-full ">
          {event.imageUrls && event.imageUrls.length > 0 && (
            <Image
              src={event.imageUrls[0]}
              alt={event.title}
              width={584}
              height={476}
              className="w-full  h-full"
            />
          )}
        </div>
        <div className="relative w-full flex items-center justify-center py-10">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500 to-amber-200 opacity-50"></div>
          <h1 className="relative text-gray-700 text-5xl font-bold text-center">
            {event.title}
          </h1>
        </div>
      </div>

      {/* event detail */}
      <div className="max-w-4xl mx-auto text-gray-900">
        <div className="px-6 mt-10 space-y-6">
          {/* date and time */}
          <div className="text-2xl mb-1 font-semibold text-orange-600">
            Date and time
          </div>
          <div className="flex items-center gap-2 text-xl font-semibold text-gray-700">
            {format(event.date, "d MMM yyyy")}
            <span>
              {event.time_start.split(":")[0]}:{event.time_start.split(":")[1]}
            </span>
            <span>to</span>
            <span>
              {event.time_end.split(":")[0]}:{event.time_end.split(":")[1]}
            </span>{" "}
          </div>

          {/* location */}
          <div className="text-2xl font-semibold text-orange-600 mb-1">
            Location
          </div>
          <span className="flex align-center items-center gap-2">
            <MapPin />
            <p className="text-gray-700 text-xl font-semibold">
              {event.address}
            </p>
          </span>

          {/* sign up */}
          <div className="flex my-10 gap-4">
            <Button
              onClick={handleSignup}
              disabled={isSignedUp}
              className="py-6 text-xl bg-orange-600 hover:bg-orange-700"
            >
              {isSignedUp ? "Already Signed Up" : "Sign Up for Event"}
            </Button>
            {isSignedUp && (
              <AddToCalendarButton
                name={event.title}
                options={["Google"]}
                location={event.address}
                startDate={event.date.toString()}
                endDate={event.date.toString()}
                startTime={event.time_start}
                endTime={event.time_end}
                timeZone="GMT+0"
              ></AddToCalendarButton>
            )}
          </div>
        </div>

        <div className="bg-gray-100 py-10 px-6 mt-5 mb-10">
          <h2 className="text-2xl font-bold text-gray-900">About this event</h2>
          <p className="text-gray-700 mt-2">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
