/*"use client";

import { AddEventForm } from "./AddForm";
import EventsList from "./EventsList";
import type { eventType } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type formProps = {
  onAddEvent: (event: eventType) => void;
  events: eventType[];
};

export function FormTabs({ onAddEvent, events }: formProps) {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="add">Add</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <AddEventForm onAddEvent={onAddEvent} />
        </TabsContent>
        <TabsContent value="edit">
          <EventsList events={events} />
        </TabsContent>
      </Tabs>
    </div>
  );
}*/
