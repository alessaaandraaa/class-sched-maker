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

    const PIXELS_PER_MIN = 18 / 30;
    const heightPx = durationMin * PIXELS_PER_MIN;

    return {
      top: `${startMin * PIXELS_PER_MIN}px`,
      heightPx,
    };
  };

  return (
    <>
      {events
        .filter((e) => e.day.includes(currentDay))
        .map((e) => {
          const { top, heightPx } = getEventStyle(e.start, e.end);

          // Dynamic font sizes
          const mainFontSize = Math.max(6, heightPx * 0.15); // class code + name
          const secondaryFontSize = Math.max(5, heightPx * 0.12); // group/classroom + time

          return (
            <div
              key={`${e.name}-${e.start}-${e.day}`}
              style={{
                top,
                height: `${heightPx}px`,
                backgroundColor: e.bg_color,
                color: e.text_color,
              }}
              className={`absolute w-[95%] left-[2.5%] rounded p-1 flex flex-col justify-center items-center text-center leading-tight shadow-sm z-10 ${e.text_color}`}
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
