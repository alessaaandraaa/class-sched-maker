import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "../components/ui/field";
import { ColorSchema } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import z from "zod";
import type { calendarStyles } from "@/lib/types";

type DialogProps = {
  onAddStyle: (style: calendarStyles) => void;
};

export default function ColorDialog({ onAddStyle }: DialogProps) {
  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      wrapper_color: "#83a485",
      day_color: "#83a485",
      grid_color: "#090c1b",
    },
  });

  function onSubmit(data: z.infer<typeof ColorSchema>) {
    onAddStyle(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 bg-white text-black px-4 py-2 rounded"
        >
          Calendar Options
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Change Calendar Colors</DialogTitle>
        </DialogHeader>
        <form id="form-calendar-colors" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex align-middle gap-2">
            <Controller
              name="wrapper_color"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="form-rhf-demo-bgcol">Wrapper</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-3 p-2 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all"
                      >
                        <div
                          className="w-6 h-6 rounded shadow-inner border border-white/20"
                          style={{
                            backgroundColor: field.value || "#3b82f6",
                          }}
                        />
                        <span className="text-xs font-mono text-gray-300">
                          {field.value?.toUpperCase() || "#3B82F6"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3 bg-gray-900 border-gray-700">
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                      <div className="mt-3 flex gap-2">
                        <Input
                          className="h-8 text-xs"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <Controller
              name="day_color"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="form-rhf-demo-textcol">
                    Day Label Color
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-3 p-2 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all"
                      >
                        <div
                          className="w-6 h-6 rounded shadow-inner border border-white/20"
                          style={{
                            backgroundColor: field.value || "#3b82f6",
                          }}
                        />
                        <span className="text-xs font-mono text-gray-300">
                          {field.value?.toUpperCase() || "#3B82F6"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3 bg-gray-900 border-gray-700">
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                      <div className="mt-3 flex gap-2">
                        <Input
                          className="h-8 text-xs"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <Controller
              name="grid_color"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="form-rhf-demo-textcol">
                    Grid Color
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-3 p-2 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all"
                      >
                        <div
                          className="w-6 h-6 rounded shadow-inner border border-white/20"
                          style={{
                            backgroundColor: field.value || "#3b82f6",
                          }}
                        />
                        <span className="text-xs font-mono text-gray-300">
                          {field.value?.toUpperCase() || "#3B82F6"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-3 bg-gray-900 border-gray-700">
                      <HexColorPicker
                        color={field.value}
                        onChange={field.onChange}
                      />
                      <div className="mt-3 flex gap-2">
                        <Input
                          className="h-8 text-xs"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>

            <Button
              type="submit"
              form="form-calendar-colors"
              className="text-black"
            >
              Submit
            </Button>
          </Field>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
