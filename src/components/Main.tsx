import { useState, useRef } from "react";
import type { eventType } from "@/lib/types";
import Calendar from "./Calendar";
import { EventForm } from "./Form";
import domtoimage from "dom-to-image";
import ColorDialog from "./ColorDialog";
import DeleteDialog from "./DeleteDialog";
import { Button } from "./ui/button";
import type { calendarStyles } from "@/lib/types";

export default function Main() {
  const [events, setEvents] = useState<eventType[]>(() => {
    return JSON.parse(localStorage.getItem("events") || "[]");
  });

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
        <EventForm onAddEvent={addEvent} />
      </div>
      <div>
        <div>
          <div ref={cardRef}>
            <Calendar events={events} styles={styles} />
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
