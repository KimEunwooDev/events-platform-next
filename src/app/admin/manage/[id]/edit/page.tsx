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
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateTimePicker } from "@/components/ui/datetimepicker";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/utils/supabase/supabase";
import { toast } from "sonner";
import { ChangeEvent, use, useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function EditEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
      imageUrls: [],
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImages, setselectedImages] = useState<string[]>([]);
  const [newfilesArray, setNewFilesArray] = useState<File[]>([]);

  const { id } = use(params);

  useEffect(() => {
    const getEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select()
        .eq("id", id);

      if (!data) {
        console.error("❌ No events data found: data is null");
        return;
      }

      const event = data[0];

      if (error) {
        console.error("❌ Failed to fetch event:", error);
      } else {
        form.reset({
          title: event.title,
          date: new Date(event.date),
          time_start: new Date(`1970-01-01T${event.time_start}`),
          time_end: new Date(`1970-01-01T${event.time_end}`),
          address: event.address,
          summary: event.summary,
          description: event.description,
          status: event.status,
          imageUrls: event.imageUrls,
        });
        setselectedImages(event.imageUrls);
        setIsLoading(false);
      }
    };
    getEvent();
  }, [id, form]);

  const handleImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newselectedImages = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setselectedImages([...selectedImages, ...newselectedImages]);
      setNewFilesArray([...newfilesArray, ...filesArray]);
    }
  };

  const storeImage = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("event_images")
      .upload(`event_images/${uuidv4()}`, file);

    if (error) {
      console.log("error in storeImage", error);
      return null;
    }
    if (data) {
      const { data: publicUrlData } = supabase.storage
        .from("event_images")
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    let imageUrls: (string | null | undefined)[] = selectedImages;

    if (newfilesArray.length > 0) {
      const uploadPromises = newfilesArray.map(async (file) => {
        const url = await storeImage(file);
        return url;
      });
      const uploadedImages = await Promise.all(uploadPromises);
      imageUrls = [...selectedImages, ...uploadedImages];
    }

    const timeStart = data.time_start.toISOString().split("T")[1];
    const timeEnd = data.time_end.toISOString().split("T")[1];

    const { status, error } = await supabase
      .from("events")
      .update({
        title: data.title,
        date: data.date,
        time_start: timeStart,
        time_end: timeEnd,
        address: data.address,
        summary: data.summary,
        description: data.description,
        status: data.status,
        imageUrls: imageUrls,
      })
      .eq("id", id);

    if (error) {
      console.log("fail to update event", error);
    }
    if (status === 204) {
      toast("Event updated succesfully!", {
        description: `📅 ${data.date.toISOString().split("T")[0]}`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      router.push("/admin/manage");
    }
  };

  const deletePreview = (index: number) => {
    console.log(`delete ${index} nd file`);
    const newSelectedImages = [...selectedImages];
    const newNewFilesArray = [...newfilesArray];

    newSelectedImages.splice(index, 1);
    newNewFilesArray.splice(index, 1);
    setselectedImages(newSelectedImages);
    setNewFilesArray(newNewFilesArray);
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

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
                  <div className="flex gap-4">
                    {selectedImages.map((url, index) => (
                      <div
                        key={index}
                        className="w-20 h-20 relative rounded-md"
                      >
                        <Image src={url} alt={`img-${index}`} layout="fill" />
                        <X
                          className="absolute bg-white size-4"
                          onClick={() => deletePreview(index)}
                        />
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
          <div className="flex justify-center items-center gap-4">
            <Button
              className="bg-white text-balck border-1 "
              onClick={() => router.push("/admin/manage")}
            >
              Discard
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
