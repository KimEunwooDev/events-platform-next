"use client";
import dynamic from "next/dynamic";

import { google } from "calendar-link";

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
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { eventsAtom } from "@/stores/atoms";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { set } from "date-fns";
import { atcb_action } from "add-to-calendar-button-react";
import { Event } from "@/types";
import CalendarButtonWrapper from "../CalendarButtonWrapper";

const AddToCalendarButton = dynamic(
  () =>
    import("add-to-calendar-button-react").then(
      (mod) => mod.AddToCalendarButton
    ),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export const EventAtcion = ({ event }: { event: Event }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isConfirmed, setIsComfirmed] = useState(false);

  const cancelSignUp = async () => {
    setOpen(false);
    setIsComfirmed(true);
    const { error } = await supabase
      .from("events_signups")
      .delete()
      .eq("event_id", event.id);
    if (error) {
      return toast("Failed to cancel sign up", { description: error.message });
    }
    if (!error) {
      toast("Successfully canceled sign up");
    }
  };

  const AddToCalendar = () => {
    const googleUrl = google(event);
    console.log(googleUrl);

    window.open(googleUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DropdownMenuItem onClick={() => router.push(`/event/${event.id}`)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={AddToCalendar}>
            Add to Google calendar
          </DropdownMenuItem>

          <DialogTrigger asChild>
            <DropdownMenuItem className="text-red-400">Cancel</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want to cancel?</DialogTitle>
          <DialogDescription>
            This will remove you from the event. You can't undo this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={cancelSignUp}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;
      return <EventAtcion event={event} />;
    },
  },
];
