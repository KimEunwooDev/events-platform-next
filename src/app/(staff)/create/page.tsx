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
import { supabase } from "@/utils/supabase/supabase";
import { toast } from "sonner";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: new Date(),
      time_start: new Date(),
      time_end: new Date(),
      address: "",
      summary: "",
      description: "",
      status: "",
      imageUrls: "",
    },
  });

  const [selectedImages, setselectedImages] = useState<string[]>([]);
  const [newfilesArray, setNewFilesArray] = useState<File[]>([]);

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e, " e in handleImages");
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const newselectedImages = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setselectedImages([...selectedImages, ...newselectedImages]);
      console.log(selectedImages, "selectedImages");

      setNewFilesArray([...newfilesArray, ...filesArray]);
    }
  };

  const storeImage = async (file: any) => {
    const { data, error } = await supabase.storage
      .from("event_images")
      .upload(`event_images/${uuidv4()}`, file);

    if (error) {
      console.log("error in storeImage", error);
      return null;
    }
    if (data) {
      const { data: publicUrlData, error } = supabase.storage
        .from("event_images")
        .getPublicUrl(data.path);

      console.log("1success in storeImage", publicUrlData);
      console.log("2publicUrl in storeImage", publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>, e) => {
    console.log(data, "data in handleSubmit");
    console.log(selectedImages, "selectedImages in handleSubmit");

    let imageUrls: (string | undefined)[] = [];

    if (newfilesArray.length > 0) {
      const uploadPromises = Array.from(newfilesArray).map(async (file) => {
        const url = await storeImage(file);
        return url;
      });
      imageUrls = await Promise.all(uploadPromises);
    }

    const timeStart = data.time_start.toISOString().split("T")[1];
    const timeEnd = data.time_end.toISOString().split("T")[1];

    console.log("imageurls in handlesubmit", imageUrls);

    const { error, status } = await supabase
      .from("events")
      .insert([
        {
          title: data.title,
          date: data.date,
          time_start: timeStart,
          time_end: timeEnd,
          address: data.address,
          summary: data.summary,
          description: data.description,
          status: data.status,
          imageUrls: imageUrls,
        },
      ])
      .select();

    if (error) {
      console.log("fail to create a event", error);
    }

    if (status === 201) {
      console.log("success");
      toast("Event has been created", {
        description: `📅 ${
          data.date.toISOString().split("T")[0]
        } from 🕒 ${format(data.time_start, "hh:mm aa")}`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.push("/manage");
    }
  };

  return (
    <div className={styles.container}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-1/2 space-y-8 flex flex-col m-6 justify-center "
        >
          {/* image input */}
          <FormField
            control={form.control}
            name="selectedImages"
            render={({ field: { onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="text-xl">Images</FormLabel>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input
                      id="images"
                      type="file"
                      accept="image/*"
                      onChange={handleImages}
                      multiple
                      {...fieldProps}
                    />
                  </div>
                </FormControl>
                <FormDescription>Upload images</FormDescription>
                {selectedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedImages.map((url, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 relative rounded-md"
                      >
                        <Image src={url} alt={`img-${index}`} layout="fill" />
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* title input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Event title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className="bg-white" />
                </FormControl>
                <FormDescription>This is your event name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex items-center justify-between flex-wrap sm:flex-nowrap">
            {/* date select */}
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
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* time select */}
            <div className="flex items-center flex-wrap sm:flex-nowrap gap-4">
              <FormField
                control={form.control}
                name="time_start"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">Start time</FormLabel>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time_end"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">End time</FormLabel>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
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
