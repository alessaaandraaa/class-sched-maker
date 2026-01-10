import * as z from "zod";

export const formSchema = z.object({
  id: z.string(),
  class_code: z.string().min(2, "Class code is too short."),
  name: z.string(),
  group: z.number(),
  classroom: z.string(),
  day: z.array(z.string()).min(1, "Select at least one day"),
  startHour: z.number().int().min(7).max(18),
  startMinute: z.enum(["00", "30"]),
  endHour: z.number().int().min(7).max(18),
  endMinute: z.enum(["00", "30"]),
  bg_color: z.string().regex(/^#[0-9a-f]{6}$/i, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
  text_color: z.string().regex(/^#[0-9a-f]{6}$/i, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
});

export const ColorSchema = z.object({
  wrapper_color: z.string().regex(/^#[0-9a-f]{6}$/i, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
  day_color: z.string().regex(/^#[0-9a-f]{6}$/i, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
  grid_color: z.string().regex(/^#[0-9a-f]{6}$/i, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
});

export type calendarStyles = {
  wrapper_color: string;
  day_color: string;
  grid_color: string;
};

export type eventType = {
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
