export const revalidate = 0;

import { supabase } from "@/utils/supabase/supabase";

export async function getEvents() {
  const { data, error } = await supabase.from("events").select();
  if (error) throw new Error(error.message);
  return data;
}
