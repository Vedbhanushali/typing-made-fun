import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function BlockList() {
  return (
    <div className="grid w-full gap-2">
      <Textarea
        placeholder="Enter Domain example -&#10;google.com&#10;youtube.com"
        className="text-foreground"
      />
      <Button>Save</Button>
    </div>
  );
}
