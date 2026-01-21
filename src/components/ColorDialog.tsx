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
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "./ui/select";

type DialogProps = {
  onAddStyle: (style: calendarStyles) => void;
  onAddHours: (hrs: String[]) => void;
};

export default function ColorDialog({ onAddStyle, onAddHours }: DialogProps) {
  const form = useForm<z.infer<typeof ColorSchema>>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      wrapper_color: "#83a485",
      day_color: "#83a485",
      grid_color: "#090c1b",
      minHour: 7,
      minMinute: "00",
      maxHour: 18,
      maxMinute: "00",
    },
  });

  const generateHours = (
    minHour: number,
    minMinute: string,
    maxHour: number,
    maxMinute: string,
  ) => {
    let hoursArr = [];

    const startMin = parseInt(minMinute, 10);
    const endMin = parseInt(maxMinute, 10);

    let current = minHour * 60 + startMin;
    const end = maxHour * 60 + endMin;

    while (current <= end) {
      let h = Math.floor(current / 60);
      let m = current % 60;

      let displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;

      let displayM = m.toString().padStart(2, "0");

      hoursArr.push(`${displayH}:${displayM}`);
      current += 30;
    }
    return hoursArr;
  };

  function onSubmit(data: z.infer<typeof ColorSchema>) {
    const { minHour, minMinute, maxHour, maxMinute, ...rest } = data;

    const stylePayload = { ...rest };
    onAddStyle(stylePayload);

    const hoursPayload = generateHours(minHour, minMinute, maxHour, maxMinute);
    onAddHours(hoursPayload);
  }

  console.log("Form Errors:", form.formState.errors);

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
          <DialogTitle>Calendar Options</DialogTitle>
        </DialogHeader>
        <form id="form-calendar-colors" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-5">
            <FieldGroup className="flex align-middle gap-2">
              <Controller
                name="wrapper_color"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <FieldLabel htmlFor="form-rhf-demo-bgcol">
                      Wrapper
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
            <FieldGroup className="flex align-middle gap-2">
              <FieldLabel>Min Hour</FieldLabel>
              <div className="flex gap-2">
                {" "}
                <Controller
                  name="minHour"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={23}
                      className="w-16 text-center"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
                <p>:</p>
                <Controller
                  name="minMinute"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="00">00</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <FieldLabel>Max Hour</FieldLabel>
              <div className="flex gap-2">
                <Controller
                  name="maxHour"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={23}
                      className="w-16 text-center"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
                <p>:</p>
                <Controller
                  name="maxMinute"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="00">00</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </FieldGroup>
          </div>
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
        <DialogFooter>
          <p className="text-[13px] text-gray-500">
            Note: Please input times in 24-hour format.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/*minutes = [00, 30]
   if minMinute = 00, j = 0
   if minMinute = 30, j = 1

for (int i = startHr, ndx = 0; ndx < jumps; ndx++, i++) {
   for (int j = 0; j  <= 1; j++) { 
        hoursArr.push({i}:{minutes[i]});
   }

  if i == 12 { i = 1 };
}
 (end - start) * 2; 
7:30 - 9:00 4 jumps

  i = 7
  ndx = 0
  
  7:30
  8:00
  8:30
  9:00
 */
