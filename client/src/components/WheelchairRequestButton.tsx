import { Button } from "./ui/button";
import { Accessibility } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WheelchairRequestButton() {
  const { toast } = useToast();

  const handleRequest = () => {
    toast({
      title: "Wheelchair Requested",
      description: "A staff member will be with you shortly to provide assistance.",
    });
  };

  return (
    <Button
      variant="secondary"
      className="w-full h-24 text-xl font-bold flex items-center gap-4"
      onClick={handleRequest}
      data-testid="button-wheelchair-request"
    >
      <Accessibility className="h-8 w-8" />
      <span>Request Wheelchair</span>
    </Button>
  );
}
