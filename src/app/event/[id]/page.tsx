import { supabase } from "@/utils/supabase/supabase";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default async function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const eventId = (await params).id;

  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("id", eventId);

  const event = data[0];

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">Event not found.</div>;
  }

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
        <div className="px-6 py-10 space-y-6">
          {/* date */}
          <p className="text-2xl font-semibold text-orange-600">
            📅 {format(event.date, "d MMM yyyy")}
          </p>

          {/* time */}
          <div className="flex items-center gap-2 text-2xl font-semibold text-gray-700">
            <span>
              🕒 {event.time_start.split(":")[0]}:
              {event.time_start.split(":")[1]}
            </span>
            <span>to</span>
            <span>
              🕒 {event.time_end.split(":")[0]}:{event.time_end.split(":")[1]}
            </span>{" "}
          </div>

          {/* location */}
          <span className="flex align-center items-center gap-2">
            <MapPin />
            <p className="text-gray-700 leading-relaxed text-2xl font-semibold">
              {event.address}
            </p>
          </span>

          {/* sign up */}
          <div className="mt-10">
            <button className="inline-block px-6 py-3 text-white bg-orange-600 rounded-md shadow-md hover:bg-orange-700 transition">
              Sign Up Now
            </button>
          </div>
        </div>

        {/* FAQ & Additional Info */}
        <div className="bg-gray-100 py-10 px-6 mt-5 mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
          <p className="text-gray-700 mt-2">{event.description}</p>
          <p className="text-gray-700 mt-2">{event.description}</p>
          <p className="text-gray-700 mt-2">{event.description}</p>
        </div>
      </div>
    </div>
  );
}
