import type { eventType } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
type eventListProps = {
  events: eventType[];
};

export default function EventsList({ events }: eventListProps) {
  return (
    <Card className="w-full min-w-xs max-w-xs gap-0.5">
      <CardHeader>
        <CardTitle>LIST OF CLASSES</CardTitle>
      </CardHeader>
      <CardContent>
        {events.map((e) => (
          <div key={e.id}>
            <p>
              {e.class_code} - {e.name}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
