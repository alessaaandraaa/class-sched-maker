import { useState, useRef } from "react";
import type { eventType } from "@/lib/types";
import Calendar from "./Calendar";
import domtoimage from "dom-to-image";
import ColorDialog from "./ColorDialog";
import DeleteDialog from "./DeleteDialog";
import { Button } from "./ui/button";
import type { calendarStyles } from "@/lib/types";
//import { FormTabs } from "./FormTabs";
import { AddEventForm } from "./AddForm";

export default function Main() {
  const [events, setEvents] = useState<eventType[]>(() => {
    return JSON.parse(localStorage.getItem("events") || "[]");
  });
  const [eventEdit, setEventEdit] = useState<eventType | null>(null);

  const [styles, setStyles] = useState<calendarStyles>({
    wrapper_color: "#83a485",
    day_color: "#83a485",
    grid_color: "#090c1b",
  });

  const addEvent = (event: eventType) => {
    const next = [...events, event];
    setEvents(next);
    localStorage.setItem("events", JSON.stringify(next));
  };

  const onSetEventEdit = (event: eventType) => {
    setEventEdit(event);
  };

  const editEvent = (editedEvent: eventType) => {
    const nextEvents = events.map((e) =>
      e.id === editedEvent.id ? editedEvent : e
    );

    setEvents(nextEvents);
    localStorage.setItem("events", JSON.stringify(nextEvents));
    setEventEdit(null);
  };

  const cancelEdit = () => {
    setEventEdit(null);
  };

  const addStyle = (style: calendarStyles) => {
    setStyles(style);
  };

  const deleteEvents = () => {
    setEvents([]);
    localStorage.setItem("events", JSON.stringify([]));
  };

  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    if (!cardRef.current) return;

    const scale = 4;

    const node = cardRef.current;
    const width = node.offsetWidth;
    const height = node.offsetHeight;

    domtoimage
      .toPng(node, {
        width: width * scale,
        height: height * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${width}px`,
          height: `${height}px`,
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "schedule.png";
        link.click();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-10 flex gap-10 cursor-pointer group select-none">
      <div>
        <AddEventForm
          onAddEvent={addEvent}
          onEditEvent={editEvent}
          onCancelEdit={cancelEdit}
          eventEdit={eventEdit}
        />
      </div>
      <div>
        <div>
          <div ref={cardRef}>
            <Calendar
              events={events}
              styles={styles}
              onSetEvent={onSetEventEdit}
            />
          </div>

          <div className="flex gap-10 justify-between items-center">
            <div className="flex gap-3">
              <Button
                onClick={handleDownload}
                className="mt-4 bg-white text-black px-4 py-2 rounded"
              >
                Download as Image
              </Button>
              <ColorDialog onAddStyle={addStyle} />
            </div>
            <div>
              <DeleteDialog onDeleteEvents={deleteEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
