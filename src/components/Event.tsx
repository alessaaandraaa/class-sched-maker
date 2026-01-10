type EventItem = {
  class_code: string;
  name: string;
  group: number;
  classroom: string;
  day: string[];
  start: string;
  end: string;
  bg_color: string;
  text_color: string;
};

type EventProps = {
  events: EventItem[];
  currentDay: string;
};

export default function EventComponent({ events, currentDay }: EventProps) {
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

  return (
    <>
      {events
        .filter((e) => e.day.includes(currentDay))
        .map((e) => {
          const { top, heightPx } = getEventStyle(e.start, e.end);

          const mainFontSize = clamp(heightPx * 0.16, 8, 17);
          const secondaryFontSize = clamp(heightPx * 0.12, 7, 13);

          return (
            <div
              key={`${e.name}-${e.start}-${e.day}`}
              style={{
                top,
                height: `${heightPx}px`,
                backgroundColor: e.bg_color,
                color: e.text_color,
                fontFamily: "Anton, sans-serif",
              }}
              className={`absolute w-[95%] left-[2.5%] flex flex-col justify-center items-center text-center leading-tight shadow-sm z-10 ${e.text_color}`}
            >
              {/* Main Info */}
              <div
                className="font-black"
                style={{ fontSize: `${mainFontSize}px` }}
              >
                {e.class_code}
              </div>
              <div
                className="font-black"
                style={{ fontSize: `${mainFontSize}px` }}
              >
                {e.name}
              </div>

              {/* Secondary Info */}
              <div style={{ fontSize: `${secondaryFontSize}px` }}>
                <p>
                  Grp. {e.group} - {e.classroom}
                </p>
                <p>
                  {e.start} - {e.end}
                </p>
              </div>
            </div>
          );
        })}
    </>
  );
}
