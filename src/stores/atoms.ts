import { atom } from "jotai";
import { Events } from "@/components/board/columns";
import { Event } from "@/types";
import { User } from "@supabase/supabase-js";

export const eventsAtom = atom<Events[]>([]);
export const eventAtom = atom<Event | null>(null);

export const emailAtom = atom<string>("");
export const passwordAtom = atom<string>("");

export const loggedInUserAtom = atom<User | null>(null);

export const searchAtom = atom<string>("");
