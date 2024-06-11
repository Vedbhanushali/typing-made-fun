import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import "./App.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [startApplication, setStartApplication] = useState(false);
  // console.log(startApplication, "startApplication value");
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
        <CardHeader>
          <CardTitle> Typing made fun</CardTitle>
          <ModeToggle />
        </CardHeader>
        <CardContent>
          <label>Start Application {startApplication}</label>
          <input
            type="checkbox"
            onChange={toggleStartApplication}
            checked={startApplication}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button> */}
          {/* <Button>Deploy</Button> */}
          advance button and sound selector combobox
          <small className="text-sm font-medium leading-none">
            @typing-made-fun
          </small>
        </CardFooter>
      </Card>
    </ThemeProvider>
  );
}

export default App;
