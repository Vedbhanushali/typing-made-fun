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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

function App() {
  const [startApplication, setStartApplication] = useState(false);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    chrome.storage.local.get(
      ["startClicked", "theme", "wpm", "accuracy"],
      (data) => {
        if (data.startClicked) {
          setStartApplication(data.startClicked);
        }
        if (data.theme) {
          setSelectedTheme(data.theme);
        }
        if (data.wpm) {
          setWpm(data.wpm);
        }
        if (data.accuracy) {
          setAccuracy(data.accuracy);
        }
      }
    );
  }, []);

  const toggleStartApplication = () => {
    const newValue = !startApplication;
    setStartApplication(newValue);
    chrome.storage.local.set({ startClicked: newValue }, () => {});
  };

  const handleThemeChange = (theme: string) => {
    chrome.storage.local.set({ theme }, () => {});
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Card className="w-[350px] mx-auto">
        <CardFooter className="justify-between mt-4 mb-4 ml-4 mr-3">
          <CardTitle className="space-y-1">Typing Made Fun</CardTitle>
          <div className="flex items-center">
            <div className="p-3">
              <Switch
                onCheckedChange={toggleStartApplication}
                checked={startApplication}
              />
            </div>
            <ModeToggle />
          </div>
        </CardFooter>
        <CardContent
          className={`flex ${
            accuracy != 0 ? "justify-between" : "justify-center"
          } px-8`}
        >
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button size={"sm"}>WPM : {wpm}</Button>
              </TooltipTrigger>
              <TooltipContent>
                <TooltipArrow />
                <p>Word per minute</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {accuracy != 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={"sm"}>Accuracy : {accuracy}%</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Accuracy from typing test</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardContent>
        <CardFooter className="flex justify-between px-3 pt-2">
          <Button variant="outline">Advance</Button>
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
                <CommandInput placeholder="Select music theme..." />
                <CommandList>
                  <CommandEmpty>No theme found</CommandEmpty>
                  <CommandGroup
                    style={{
                      maxHeight: "68px",
                      overflowY: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {themes.map((theme) => (
                      <CommandItem
                        key={theme.value}
                        value={theme.value}
                        onSelect={(currentValue) => {
                          setSelectedTheme(
                            currentValue === selectedTheme ? "" : currentValue
                          );
                          setOpenCombobox(false);
                          handleThemeChange(
                            currentValue === selectedTheme ? "" : currentValue
                          );
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
        <small className="flex justify-center items-center p-3 text-sm font-medium leading-none">
          © 2024 typing made fun. All rights reserved.
        </small>
      </Card>
    </ThemeProvider>
  );
}

export default App;

const themes = [
  {
    value: "mechanical_keyboard",
    label: "mechanical keyboard",
  },
  {
    value: "typewriter",
    label: "typewriter",
  },
  {
    value: "chess",
    label: "chess",
  },
];
