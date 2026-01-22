import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { pdfFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { eventType } from "@/lib/types";

type PDFprops = {
  onAddEvent: (event: eventType) => void;
};

export default function PDFDialog({ onAddEvent }: PDFprops) {
  const form = useForm<z.infer<typeof pdfFormSchema>>({
    resolver: zodResolver(pdfFormSchema),
  });

  const fileRef = form.register("file");

  async function onSubmit(data: any) {
    const formData = new FormData();

    formData.append("schedule", data.file[0]);

    const response = await fetch(
      "https://pdf-parser-backend-eta.vercel.app/parse",
      {
        method: "POST",
        body: formData,
      },
    );

    const res = await response.json();
    console.log("Parsed Courses: ", res);

    res.forEach((c: any) => {
      const coursePayload: eventType = {
        class_code: c.courseCode,
        name: c.title,
        group: c.groupNo,
        classroom: c.schedules[0].room,
        day: c.schedules[0].days,
        start: c.schedules[0].start,
        end: c.schedules[0].end,
        bg_color: c.colors.bg_color,
        text_color: c.colors.text_color,
        id: crypto.randomUUID(),
      };

      onAddEvent(coursePayload);
    });
  }

  console.log("Form Errors:", form.formState.errors);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 bg-white text-black px-4 py-2 rounded"
        >
          Upload Study Load
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your Study Load Here</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" placeholder="shadcn" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" className="text-black">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
