import Image from "next/image";
import styles from "./EventCard.module.scss";
import { CardDTO } from "@/types/index";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import EventDetail from "@/app/event/[id]/page";

interface Props {
  event: CardDTO;
}

export default function EventCard({ event }: Props) {
  const router = useRouter();
  const moveToDetail = () => {
    <EventDetail event={event} />;
    router.push(`/event/${event.id}`);
  };

  return (
    <div className={styles.card} onClick={moveToDetail}>
      <div className="max-w-sm bg-white shadow-lg rounded-t-2xl overflow-hidden">
        {event.imageUrls && event.imageUrls.length > 0 ? (
          <Image
            src={event.imageUrls[0]}
            alt={event.title}
            width={784}
            height={476}
            className="w-full h-52 object-cover rounded-t-2xl"
          />
        ) : null}
      </div>
      <div className="p-5 space-y-3">
        <p className="text-sm font-semibold text-orange-600">
          {format(event.date, "d MMM yyyy")}
        </p>
        <h3 className="text-xl font-bold text-orange-600 mt-2">
          {event.title}
        </h3>
        <p className="text-md font-semibold text-gray-600 mt-2">
          {event.summary}
        </p>
      </div>
    </div>
  );
}
