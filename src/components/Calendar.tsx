import Wrapper from "./Wrapper";
import HGrid from "./HGrid";
import Event from "./Event";
import { hours, days } from "../dates";

const events = [
  {
    class_code: "CIS 2101",
    name: "Data Structs and Algos",
    group: 1,
    classroom: "LB446TC",
    day: "Tue",
    start: "7:30",
    end: "10:00",
    bg_color: "#3d4066",
    text_color: "#ffffff",
  },
];

export default function Calendar() {
  return (
    <>
      <div className="bg-[#83a485] p-8 rounded-3xl">
        <Wrapper>
          <div className="flex w-250">
            <div className="w-15" />
            <div className="flex-1 justify-around">
              <HGrid columns={6}>
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-white font-bold text-center text-[10px] bg-[#83a485] p-2 rounded-2xl mt-2 mb-2"
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
                  <div key={hour} className="h-4.5 text-white text-xs">
                    {hour}
                  </div>
                ) : (
                  <div key={hour} className="h-4.5"></div>
                )
              )}
            </div>

            <div className="grid grid-cols-6 relative border border-gray-700 pt-2 pl-2">
              {days.map((day) => (
                <div key={day} className="relative">
                  {hours.map((_, i) => (
                    <div
                      key={i}
                      className="h-4.5 border-b border-gray-700/30 w-full"
                    />
                  ))}

                  <Event events={events} currentDay={day} />
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </>
  );
}
