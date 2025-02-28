import { Events } from "@/components/board/columns";
import { atom } from "jotai";
import { User } from "@supabase/supabase-js";

export const eventsAtom = atom<Events[]>([]);

export const emailAtom = atom<string>("");
export const passwordAtom = atom<string>("");

export const loggedInUserAtom = atom<User | null>(null);
