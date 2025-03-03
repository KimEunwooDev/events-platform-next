"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/utils/supabase/supabase";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { eventsAtom } from "@/stores/atoms";

export type Events = {
  id: string;
  title: string;
  status: string;
  date: string;
};

export const EventAtcion = ({ event }: { event: Events }) => {
  const router = useRouter();
  const [, setEvents] = useAtom(eventsAtom);

  const deleteEvent = async () => {
    const { error } = await supabase.from("events").delete().eq("id", event.id);
    if (error) {
      return toast("Failed to delete event", { description: error.message });
    } else {
      toast("Deleted successfully!");
      setEvents((prev: Events[]) => prev.filter((e) => e.id !== event.id));
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push(`/admin/manage/${event.id}/edit`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/event/${event.id}`)}>
          View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteEvent} className="text-red-400">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Events>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;
      return <EventAtcion event={event} />;
    },
  },
];
