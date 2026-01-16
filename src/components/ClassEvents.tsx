type EventProps = {
  events: eventType[];
  currentDay: string;
  onSetEvent: (event: eventType) => void;
};

import Event from "./Event";
import type { eventType } from "@/lib/types";

export default function ClassEventsList({
  events,
  currentDay,
  onSetEvent,
}: EventProps) {
  return (
    <>
      {events
        .filter((e) => e.day.includes(currentDay))
        .map((e) => {
          return (
            <div key={`${e.name}-${e.start}-${e.day}`}>
              <Event event={e} onSetEvent={onSetEvent} />
            </div>
          );
        })}
    </>
  );
}
