import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export default function BlockList() {
  const [blocklist, setBlocklist] = useState<string[]>([]);
  useEffect(() => {
    //getting blocklist from localstorage
    chrome.storage.local.get(["blocklist"], (data) => {
      if (data.blocklist) {
        setBlocklist(data.blocklist);
      }
    });
  }, []);

  const saveBlocklist = () => {
    chrome.storage.local.set({ blocklist }, () => {});
  };

  const ProcessList = (data: string) => {
    let arr = data.split("\n");
    arr = arr.map((item) => item.trim());
    setBlocklist(arr);
  };
  return (
    <div className="grid w-full gap-2">
      <div className="text-center mb-4">
        <h1 className="text-4xl text-foreground font-bold">Block list</h1>
      </div>
      <p className="text-foreground text-sm">
        Enter the domains where you want to block sound effects.
      </p>
      <Textarea
        placeholder="Enter Domain example -&#10;google.com&#10;youtube.com"
        className="text-foreground"
        value={blocklist.join("\n")}
        onChange={(e) => ProcessList(e.target.value)}
      />
      <Button onClick={saveBlocklist}>Save</Button>
    </div>
  );
}
