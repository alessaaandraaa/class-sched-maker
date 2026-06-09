import { useRef } from "react";
import Calendar from "./Calendar";
import domtoimage from "dom-to-image";
import ColorDialog from "./dialogs/ColorDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import ShareDialog from "./dialogs/ShareDialog";
import PDFDialog from "./dialogs/PDFDialog";
import LoadDialog from "./dialogs/LoadDialog";
import { Button } from "./ui/button";
import { AddEventForm } from "./AddForm";
import { useCalendar } from "@/lib/useCalendar";
import { toast } from "sonner"

export default function Main() {
  const {
    events,
    styles,
    hourList,
    eventEdit,
    addEvent,
    editEvent,
    cancelEdit,
    onSetEventEdit,
    addStyle,
    addHours,
    deleteEvents,
    deleteEvent,
    saveToLocal,
    loadFromLocal,
  } = useCalendar();

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
    <div className="p-10 flex flex-col gap-4 select-none w-fit max-w-screen-2xl">
      <div className="flex gap-10 items-stretch">
        <div className="w-fit shrink-0 self-stretch">
          <AddEventForm
            onAddEvent={addEvent}
            onEditEvent={editEvent}
            onCancelEdit={cancelEdit}
            onDeleteEvent={deleteEvent}
            eventEdit={eventEdit}
          />
        </div>

        <div
          className=" flex flex-col gap-4"
          style={{ width: `${styles.calendarWidth}px` }}
        >
          <div ref={cardRef}>
            <Calendar
              events={events}
              styles={styles}
              onSetEvent={onSetEventEdit}
              hours={hourList}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            className="mt-4 bg-white text-black px-4 py-2 rounded text-sm"
          >
            Download as Image
          </Button>
          <ColorDialog onAddStyle={addStyle} onAddHours={addHours} />
          <PDFDialog onAddEvent={addEvent}></PDFDialog>
          <ShareDialog events={events} styles={styles} />
        </div>
        <div>
          <div className="flex gap-3">
            <Button onClick={() => { saveToLocal(); toast.success("Schedule saved!"); }} className="text-black mt-4">
            Save
          </Button>
            <LoadDialog onLoad={loadFromLocal} />
            <DeleteDialog onDeleteEvents={deleteEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}
