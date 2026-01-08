import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { formSchema } from "../lib/types";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { HexColorPicker } from "react-colorful";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/ui/field";
import { Input } from "../components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../components/ui/input-group";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function EventForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class_code: "",
      name: "",
      group: 0,
      classroom: "",
      day: "",
      start: "7:30",
      end: "5:00",
      bg_color: "",
      text_color: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const events: (typeof data)[] = JSON.parse(
      localStorage.getItem("events") || "[]"
    );
    events.push(data);
    localStorage.setItem("events", JSON.stringify(events));
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
              name="start"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <FieldLabel className="flex-1 pr-1">Start</FieldLabel>

                  <Input
                    {...field}
                    type="time"
                    aria-invalid={fieldState.invalid}
                    className="flex-1"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="end"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  orientation="horizontal"
                >
                  <FieldLabel className="whitespace-nowrap">End</FieldLabel>

                  <Input
                    {...field}
                    type="time"
                    aria-invalid={fieldState.invalid}
                    className="flex-1"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
