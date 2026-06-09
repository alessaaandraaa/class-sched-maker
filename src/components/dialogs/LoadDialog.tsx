import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";

type LoadProps = {
  onLoad: () => void;
};

export default function LoadDialog({ onLoad }: LoadProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-black mt-4">Load</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Load saved schedule?</AlertDialogTitle>
          <AlertDialogDescription>
            This will replace your current calendar with your last saved version. Any unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onLoad}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}