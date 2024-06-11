import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Switch } from "@/components/ui/switch";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

function App() {
  const [startApplication, setStartApplication] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  console.log(startApplication, "startApplication value");
  useEffect(() => {
    chrome.storage.local.get("startClicked", (data) => {
      if (data.startClicked) {
        // console.log(data.startClicked, "value from storage");
        setStartApplication(data.startClicked || false);
      }
    });
  }, []);

  const toggleStartApplication = () => {
    const newValue = !startApplication;
    // console.log("initial value", startApplication);
    setStartApplication(newValue);
    // console.log(newValue, "setting in storage");
    chrome.storage.local.set({ startClicked: newValue }, () => {
      // console.log("Start button was clicked");
    });
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Card className="w-[350px]">
        <CardFooter className="justify-between m-3">
          <CardTitle className="space-y-1">Typing made fun</CardTitle>
          <ModeToggle />
        </CardFooter>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              onCheckedChange={toggleStartApplication}
              checked={startApplication}
            />
            <label>Start Application</label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* advance button */}
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCombobox}
                className="w-[200px] justify-between"
              >
                {selectedTheme
                  ? themes.find((theme) => theme.value === selectedTheme)?.label
                  : "Select music theme"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {themes.map((theme) => (
                      <CommandItem
                        key={theme.value}
                        value={theme.value}
                        onSelect={(currentValue) => {
                          setSelectedTheme(
                            currentValue === selectedTheme ? "" : currentValue
                          );
                          setOpenCombobox(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedTheme === theme.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {theme.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardFooter>
        <small className="flex justify-between text-sm font-medium leading-none">
          @typing-made-fun
        </small>
      </Card>
    </ThemeProvider>
  );
}

export default App;

const themes = [
  {
    value: "mechanical-keyboard",
    label: "mechanical keyboard",
  },
  {
    value: "typewritter",
    label: "typewritter",
  },
  {
    value: "animal",
    label: "animal",
  },
];
