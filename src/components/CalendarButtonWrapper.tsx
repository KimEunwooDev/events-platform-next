import { AddToCalendarButton } from "add-to-calendar-button-react";
import dynamic from "next/dynamic";

const CalendarButtonWrapper = ({ event }: { event: Event }) => {
  const DynamicAddToCalendarButton = dynamic(
    () =>
      import("add-to-calendar-button-react").then(
        (mod) => mod.AddToCalendarButton
      ),
    { ssr: false, loading: () => <div>Loading...</div> }
  );

  return (
    <DynamicAddToCalendarButton
      size="3"
      name={event?.title}
      options={["Google"]}
      location={event?.address}
      startDate={event?.date.toString()}
      endDate={event?.date.toString()}
      startTime={event?.time_start}
      endTime={event?.time_end}
      timeZone="GMT+0"
      buttonsList
      hideTextLabelButton
      buttonStyle="round"
      lightMode="bodyScheme"
      inline={true}
    ></DynamicAddToCalendarButton>
  );
};

export default CalendarButtonWrapper;
