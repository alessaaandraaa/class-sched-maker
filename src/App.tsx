import Calendar from "./components/Calendar";
import { useRef } from "react";
import domtoimage from "dom-to-image";
import { EventForm } from "./components/Form";

export default function MyCalendar() {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = () => {
    if (!cardRef.current) return;
    domtoimage
      .toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "schedule.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };

  const initializeEvents = () => {
    if (!localStorage.getItem("events")) {
      localStorage.setItem("events", JSON.stringify([]));
    }
  };

  initializeEvents();

  return (
    <div className="p-10 flex gap-10 cursor-pointer group select-none">
      <div>
        <EventForm />
        <button
          onClick={handleDownload}
          className="mt-4 bg-white text-black px-4 py-2 rounded"
        >
          Download as Image
        </button>
      </div>
      <div>
        <div ref={cardRef}>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
