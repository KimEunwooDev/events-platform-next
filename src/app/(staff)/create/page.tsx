"use client";

import styles from "./page.module.scss";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateTimePicker } from "@/components/ui/datetimepicker";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: "",
      time_start: "",
      time_end: "",
      address: "",
      summary: "",
      description: "",
      status: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <div className={styles.container}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-1/2 space-y-8 flex flex-col m-6 justify-center "
        >
          {/* title input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="bg-white" />
                </FormControl>
                <FormDescription>This is your event name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-between flex-wrap sm:flex-nowrap">
            {/* titme select */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xl">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[190px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="bg-white rounded-md border"
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center flex-wrap sm:flex-nowrap gap-4">
              <FormField
                control={form.control}
                name="date"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">Start time</FormLabel>
                    <DateTimePicker />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">End time</FormLabel>
                    <DateTimePicker />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* location */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Location</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* summary */}
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} className="bg-white" />
                </FormControl>
                <FormDescription>
                  Grab people{`'`}s attention with a short description about
                  your event.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} className="bg-white" />
                </FormControl>
                <FormDescription>
                  Add more details about your event and include what people can
                  expect if they attend.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
