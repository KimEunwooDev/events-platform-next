import { supabase } from "@/utils/supabase/supabase";

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

  console.log(data);

  const event = data[0];

  return (
    <div>
      <div>{event.title}</div>
      <div>{event.date}</div>
      <div>{event.time_start}</div>
      <div>{event.time_end}</div>
      <div>{event.description}</div>
    </div>
  );
}
