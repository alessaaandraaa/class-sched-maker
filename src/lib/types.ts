import * as z from "zod";

export const formSchema = z.object({
  class_code: z.string().min(2, "Class code is too short."),
  name: z.string(),
  group: z.number(),
  classroom: z.string(),
  day: z.string(),
  start: z.iso.time({ precision: -1 }),
  end: z.iso.time({ precision: -1 }),
  bg_color: z.string().regex(/^#[0-9a-f]{6}$/i, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
  text_color: z.string().regex(/^#[0-9a-f]{6}$/i, {
    message:
      "Invalid color format. Must be a 7-character hex code (e.g., #RRGGBB).",
  }),
});
