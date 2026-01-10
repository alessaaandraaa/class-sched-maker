import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { formSchema } from "../lib/types";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { HexColorPicker } from "react-colorful";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { days } from "@/dates";
import { Checkbox } from "./ui/checkbox";
import type { eventType } from "../lib/types";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import { InputGroup, InputGroupTextarea } from "../components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type formProps = {
  onAddEvent: (event: eventType) => void;
};

export function EventForm({ onAddEvent }: formProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class_code: "",
      name: "",
      group: 0,
      classroom: "",
      day: [],
      startHour: 0,
      startMinute: "00",
      endHour: 0,
      endMinute: "00",
      bg_color: "",
      text_color: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Submitting...");

    const { startHour, startMinute, endHour, endMinute, ...rest } = data;

    const payload = {
      ...rest,
      start: `${String(startHour).padStart(2, "0")}:${startMinute}`,
      end: `${String(endHour).padStart(2, "0")}:${endMinute}`,
    };

    onAddEvent(payload);
  }

  return (
    <Card className="w-full min-w-xs gap-0.5">
      <CardHeader>
        <CardTitle>ADD CLASS SCHEDULE</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex align-middle gap-2">
            <Controller
              name="class_code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Class Code
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-classcode"
                    aria-invalid={fieldState.invalid}
                    placeholder="CIS 2101"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Class Name
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-demo-name"
                      placeholder="Data Structures and Algorithms"
                      rows={6}
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="classroom"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Classroom
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-classcode"
                    aria-invalid={fieldState.invalid}
                    placeholder="LB445TC TC"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="group"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Group No.
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="form-rhf-demo-grpno"
                      type="number"
                      placeholder="0"
                      aria-invalid={fieldState.invalid}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="day"
              control={form.control}
              defaultValue={[]}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FieldLabel>Days</FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-3 p-2 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all text-black text-xs"
                      >
                        {field.value?.length > 0
                          ? field.value.join(", ")
                          : "Select Days"}
                      </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-48 p-3 bg-gray-900 border-gray-700 flex flex-col gap-3">
                      {days.map((dayName) => (
                        <div key={dayName} className="flex items-center gap-3">
                          <Checkbox
                            id={`check-${dayName}`}
                            className="data-[state=checked]:bg-blue-600 data-[state=checked]:text-white border-gray-500"
                            checked={field.value?.includes(dayName)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), dayName]
                                : field.value?.filter(
                                    (v: string) => v !== dayName
                                  );
                              field.onChange(newValue);
                            }}
                          />
                          <FieldLabel
                            htmlFor={`check-${dayName}`}
                            className={`text-xs cursor-pointer transition-colors ${
                              field.value?.includes(dayName)
                                ? "text-blue-400 font-bold" // Active state
                                : "text-gray-400 font-normal" // Inactive state
                            }`}
                          >
                            {dayName}
                          </FieldLabel>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            />
            <div className="flex gap-2">
              <FieldLabel>Start</FieldLabel>
              <Controller
                name="startHour"
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
                name="startMinute"
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
            <div className="flex gap-2">
              <FieldLabel>End</FieldLabel>
              <Controller
                name="endHour"
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
                name="endMinute"
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

            <Controller
              name="bg_color"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="form-rhf-demo-bgcol">
                    Background Color
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-3 p-2 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all"
                      >
                        <div
                          className="w-6 h-6 rounded shadow-inner border border-white/20"
                          style={{ backgroundColor: field.value || "#3b82f6" }}
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
              name="text_color"
              control={form.control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="form-rhf-demo-textcol">
                    Text Color
                  </FieldLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-3 p-2 rounded-md border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-all"
                      >
                        <div
                          className="w-6 h-6 rounded shadow-inner border border-white/20"
                          style={{ backgroundColor: field.value || "#3b82f6" }}
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
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo" className="text-black">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
