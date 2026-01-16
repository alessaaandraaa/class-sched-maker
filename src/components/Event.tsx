import type { eventType } from "@/lib/types";

type eventProps = {
  event: eventType;
  onSetEvent: (event: eventType) => void;
};

export default function Event({ event, onSetEvent }: eventProps) {
  const getMinutesFromStart = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m - 7 * 60;
  };

  const getEventStyle = (start: string, end: string) => {
    const startMin = getMinutesFromStart(start);
    const endMin = getMinutesFromStart(end);
    const durationMin = endMin - startMin;
    const slotHeight =
      document.querySelector(".time-slot")?.getBoundingClientRect().height ??
      22;

    const PIXELS_PER_MIN = slotHeight / 30;
    const heightPx = durationMin * PIXELS_PER_MIN;

    return {
      top: `${startMin * PIXELS_PER_MIN}px`,
      heightPx,
    };
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));
  const { top, heightPx } = getEventStyle(event.start, event.end);

  const mainFontSize = clamp(heightPx * 0.16, 8, 17);
  const secondaryFontSize = clamp(heightPx * 0.12, 7, 13);
  return (
    <div
      style={{
        top,
        height: `${heightPx}px`,
        backgroundColor: event.bg_color,
        color: event.text_color,
        fontFamily: "Anton, sans-serif",
      }}
      className={` hover:ring-2 absolute w-[95%] left-[2.5%] flex flex-col justify-center items-center text-center leading-tight shadow-sm z-10 ${event.text_color}`}
      onClick={() => onSetEvent(event)}
    >
      {/* Main Info */}
      <div className="font-black" style={{ fontSize: `${mainFontSize}px` }}>
        {event.class_code}
      </div>
      <div className="font-black" style={{ fontSize: `${mainFontSize}px` }}>
        {event.name}
      </div>

      {/* Secondary Info */}
      <div style={{ fontSize: `${secondaryFontSize}px` }}>
        <p>
          Grp. {event.group} - {event.classroom}
        </p>
        <p>
          {event.start} - {event.end}
        </p>
      </div>
    </div>
  );
}
