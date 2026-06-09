import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {eventType, calendarStyles} from "@/lib/types";

type ShareProps = {
  events: eventType[];
  styles: calendarStyles;
};

export default function ShareDialog({ events, styles }: ShareProps) {
  const [shortURL, setShortURL] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const payload = {
        events,
        styles,
      };
      const encoded = btoa(JSON.stringify(payload));
      const longUrl = `${window.location.origin}?schedule=${encoded}`;

      console.log("EVENTS: ", events);
      console.log("STYLES: ", styles);
      console.log("LONG URL: ", longUrl);

     const res = await fetch("https://pdf-parser-backend-eta.vercel.app/shorten", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ url: longUrl }),
    });

      const data = await res.json();
      console.log("DATA: ", data);
      setShortURL(data.shortURL);

      console.log("SHORT URL: ", data.shortURL);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL);
  };

  return (
    <Dialog onOpenChange={(open) => { if (open) handleShare(); }}>
      <DialogTrigger asChild>
        <Button className="mt-4 px-4 py-2 rounded text-white !bg-indigo-800">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Schedule</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          {loading ? (
            <p className="text-sm text-gray-400">Generating link...</p>
          ) : (
            <>
              <p className="text-sm text-gray-400">Anyone with this link can view your schedule.</p>
              <div className="flex gap-2">
                <Input value={shortURL} readOnly className="text-black" />
                <Button onClick={handleCopy} className="text-black shrink-0">
                  Copy
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}