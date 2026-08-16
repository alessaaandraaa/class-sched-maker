import type { eventType, calendarStyles, HourRange } from "./types";
import { useState } from "react";
import { hours } from "@/dates";

const defaultStyles: calendarStyles = {
  wrapper_color: "#83a485",
  day_color: "#83a485",
  grid_color: "#090c1b",
  calendarWidth: 800,
};

const defaultHourRange: HourRange = {
  minHour: 7,
  minMinute: "00",
  maxHour: 18,
  maxMinute: "00",
};

const getSharedPayload = () => {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get("schedule");
  if (!encoded) return null;
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
};

export function useCalendar() {
  const shared = getSharedPayload();

  const [hourList, setHourList] = useState<String[]>(
    shared?.hourList ??
      JSON.parse(localStorage.getItem("hourList") || JSON.stringify(hours)),
  );
  const [hourRange, setHourRange] = useState<HourRange>(
    shared?.hourRange ??
      JSON.parse(
        localStorage.getItem("hourRange") || JSON.stringify(defaultHourRange),
      ),
  );
  const [eventEdit, setEventEdit] = useState<eventType | null>(null);

  const [events, setEvents] = useState<eventType[]>(
    shared?.events ?? JSON.parse(localStorage.getItem("events") || "[]"),
  );

  const [styles, setStyles] = useState<calendarStyles>(
    shared?.styles ??
      JSON.parse(
        localStorage.getItem("styles") || JSON.stringify(defaultStyles),
      ),
  );

  const addEvent = (event: eventType) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const onSetEventEdit = (event: eventType) => {
    setEventEdit(event);
  };

  const editEvent = (editedEvent: eventType) => {
    setEvents(events.map((e) => (e.id === editedEvent.id ? editedEvent : e)));
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
  };

  const addHours = (hrs: String[], range: HourRange) => {
    setHourList(hrs);
    setHourRange(range);
  };

  const deleteEvent = (delEvent: eventType) => {
    setEvents(events.filter((e: eventType) => e.id !== delEvent.id));
    setEventEdit(null);
  };

  const saveToLocal = () => {
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("styles", JSON.stringify(styles));
    localStorage.setItem("hourList", JSON.stringify(hourList));
    localStorage.setItem("hourRange", JSON.stringify(hourRange));
    window.history.replaceState({}, "", window.location.pathname);
  };

  const loadFromLocal = () => {
    setEvents(JSON.parse(localStorage.getItem("events") || "[]"));
    setStyles(
      JSON.parse(
        localStorage.getItem("styles") || JSON.stringify(defaultStyles),
      ),
    );
    setHourList(
      JSON.parse(localStorage.getItem("hourList") || JSON.stringify(hours)),
    );
    setHourRange(
      JSON.parse(
        localStorage.getItem("hourRange") || JSON.stringify(defaultHourRange),
      ),
    );
    window.history.replaceState({}, "", window.location.pathname);
  };

  return {
    events,
    eventEdit,
    styles,
    hourList,
    hourRange,
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
  };
}
