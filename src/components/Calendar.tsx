import Wrapper from "./Wrapper";
import HGrid from "./HGrid";
import ClassEventsList from "./ClassEvents";
import { hours, days } from "../dates";
import type { eventType, calendarStyles } from "@/lib/types";

type eventProps = {
  events: eventType[];
  styles: calendarStyles;
  onSetEvent: (event: eventType) => void;
};

export default function Calendar({ events, styles, onSetEvent }: eventProps) {
  const {
    wrapper_color = "#83a485",
    day_color = "#83a485",
    grid_color = "#090c1b",
  } = styles;

  return (
    <>
      <div
        className="p-8 rounded-3xl"
        style={{ backgroundColor: wrapper_color }}
      >
        <Wrapper background_color={grid_color}>
          <div className="flex w-250">
            <div className="w-15" />
            <div className="flex-1 justify-around">
              <HGrid columns={6}>
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-white font-bold text-center text-[13px] p-2 rounded-2xl mt-2 mb-2"
                    style={{ backgroundColor: day_color }}
                  >
                    {day}
                  </div>
                ))}
              </HGrid>
            </div>
          </div>

          <div className="grid grid-cols-[50px_1fr]">
            <div className="flex flex-col pt-1">
              {hours.map((hour, index) =>
                index % 2 == 0 ? (
                  <div key={hour} className="h-5.5 text-white text-xs">
                    {hour}
                  </div>
                ) : (
                  <div key={hour} className="h-5.5"></div>
                )
              )}
            </div>

            <div className="grid grid-cols-6 relative border border-gray-700 pt-2 pl-2">
              {days.map((day) => (
                <div key={day} className="relative">
                  {hours.map((_, i) => (
                    <div
                      key={i}
                      className="h-5.5 border-b time-slot border-gray-700/30 w-full"
                    />
                  ))}

                  <ClassEventsList
                    events={events}
                    currentDay={day}
                    onSetEvent={onSetEvent}
                  />
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
