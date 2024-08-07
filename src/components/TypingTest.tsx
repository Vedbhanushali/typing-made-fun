import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const card = [
  `She sells seashells by the seashore, and the shells she sells are surely seashells. This tongue-twister has been a popular phrase for generations, often used to improve pronunciation and diction. As you type, envision a bustling beach market where vendors are calling out to passersby, trying to sell their wares. The sound of waves crashing in the background adds to the seaside ambiance, making the exercise feel like a mini-vacation.`,
  `In a quiet village nestled in the hills, the townspeople go about their daily routines. Children play in the fields, farmers tend to their crops, and shopkeepers greet customers with friendly smiles. The simplicity of village life is reflected in the rhythmic tapping of the keyboard as you type. Each word is like a step in a well-rehearsed dance, bringing the peaceful village scene to life through your fingertips.`,
  `The rain in Spain stays mainly in the plain, but in Hartford, Hereford, and Hampshire, hurricanes hardly ever happen. This classic phrase from the musical "My Fair Lady" is a fun way to practice typing while also enjoying a bit of theater history. Picture yourself in a grand theater, with the spotlight shining on you as you type out the lines. The rhythmic pattern of the words helps to create a smooth typing flow, making practice sessions both entertaining and productive.`,
];

export default function TypingTest() {
  const [currentCard, setCurrentCard] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0); // position of cursor in current card
  const [testStatus, setTestStatus] = useState(0); //0: not started, 1: started, 2: ended
  const [startTime, setStartTime] = useState<number | null>(null);
  const [correctTyped, setcorrectTyped] = useState<number>(0);
  const [totalTypedChar, setTotalTypedChar] = useState<number>(0);
  useEffect(() => {
    let selectedTheme = "mechanical_keyboard"; //default theme
    const handleKeyPress = (event: KeyboardEvent) => {
      if (testStatus == 0 || testStatus == 2) return;

      const key = event.key;
      playSound(selectedTheme, key);

      let relCursorPos = cursorPosition;
      let relCurrentCard = currentCard;

      if (isValidKey(key)) setTotalTypedChar(totalTypedChar + 1);
      if (key == card[currentCard][cursorPosition]) {
        setcorrectTyped(correctTyped + 1);
        setCursorPosition(cursorPosition + 1);
        relCursorPos += 1;
      }

      if (relCursorPos >= card[currentCard].length) {
        setCurrentCard(currentCard + 1);
        setCursorPosition(0);
        relCurrentCard += 1;
        relCursorPos = 0;
      }

      if (relCurrentCard >= card.length) {
        setTestStatus(2);
        return;
      }
    };

    chrome.storage.local.get(["theme"], (data) => {
      if (data.theme) {
        selectedTheme = data.theme;
      }
    });
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [testStatus, totalTypedChar, correctTyped, currentCard, cursorPosition]);

  const renderTextWithCursor = () => {
    return (
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader>
          <CardDescription className="max-w-lg w-full font-mono text-balance leading-relaxed text-justify">
            <span className="text-foreground">
              {currentCard < card.length &&
                card[currentCard]
                  .split("")
                  .filter((x, index) => index < cursorPosition)
                  .map((char) => char)}
            </span>
            <span className="blinking-cursor"></span>
            <span className="text-untyped">
              {currentCard < card.length &&
                card[currentCard]
                  .split("")
                  .filter((char, index) => index >= cursorPosition)
                  .map((char) => char)}
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  };

  const renderKeyboardUI = () => {
    const keyboard = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {keyboard.map((keys) => (
          <div
            className="grid gap-2 mt-2"
            style={{
              gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))`,
            }}
          >
            {keys.split("").map((key) => (
              <div
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded shadow",
                  currentCard < card.length &&
                    cursorPosition < card[currentCard].length &&
                    key === card[currentCard][cursorPosition].toUpperCase()
                    ? "bg-primary"
                    : "bg-gray-300"
                )}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between h-full max-h-screen">
      {testStatus == 0 && (
        <>
          {renderTextWithCursor()}
          <Card x-chunk="dashboard-02-chunk-0" className="rounded-md">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Typing test</CardTitle>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button
                size="default"
                className="w-full"
                onClick={() => {
                  setTestStatus(1);
                  setStartTime(Date.now());
                }}
              >
                Start
              </Button>
            </CardContent>
          </Card>
        </>
      )}
      {testStatus == 1 && (
        <>
          {renderTextWithCursor()}
          {renderKeyboardUI()}
          <div className="w-full flex justify-end border-t border-foreground pt-4">
            <Button
              size="default"
              className="w-auto"
              onClick={() => {
                setTestStatus(2);
              }}
            >
              End
            </Button>
          </div>
        </>
      )}
      {testStatus == 2 && (
        <Card x-chunk="dashboard-02-chunk-0" className="rounded-md w-[350px]">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Typing Test Over</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            Do you still want to continue ?
          </CardContent>
          <CardFooter className="flex justify-between px-4 py-4 pb-4">
            <Button
              variant="outline"
              size="default"
              onClick={() => {
                setTestStatus(1);
                setCurrentCard(0);
                setCursorPosition(0);
              }}
            >
              Continue
            </Button>
            <Button
              size="default"
              onClick={() => {
                //local storage speed and accuracy storing
                const endTime = Date.now();
                const timeTakenInSec = (endTime - startTime!) / 1000;
                const speed = Math.round(
                  correctTyped / 5 / (timeTakenInSec / 60)
                );
                const accuracy = calculateAccuracy(
                  correctTyped,
                  totalTypedChar
                );
                chrome.storage.local.get(["analysis"], (data) => {
                  let analysis: {
                    date: string;
                    speed: number;
                    accuracy: number;
                  }[] = [];
                  const currentDate = getCurrentDate();
                  if (data.analysis) {
                    analysis = data.analysis;
                  }
                  if (analysis.length > 0) {
                    const lastAnalysis = analysis[analysis.length - 1];
                    if (lastAnalysis.date == currentDate) {
                      analysis.pop();
                    }
                  }
                  analysis.push({
                    date: currentDate,
                    speed,
                    accuracy,
                  });
                  chrome.storage.local.set({ analysis }, () => {});
                });

                // reset
                setTestStatus(0);
                setCurrentCard(0);
                setCursorPosition(0);
                setStartTime(null);
                setcorrectTyped(0);
                setTotalTypedChar(0);
              }}
            >
              End
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

function playSound(theme: string, key: string) {
  let baseURL = chrome.runtime.getURL("assets/sounds/");

  const getRandomIndex = (mini: number, maxi: number) => {
    return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
  };

  const playTheme = (mini: number, maxi: number) => {
    baseURL += `${theme}/`;
    if (key == " ") {
      baseURL += "space.wav";
    } else if (key == "Enter") {
      baseURL += "enter.wav";
    } else if (key == "Backspace") {
      baseURL += "backspace.wav";
    } else {
      baseURL += `${getRandomIndex(mini, maxi)}.wav`;
    }
  };

  switch (theme) {
    case "mechanical_keyboard":
      playTheme(0, 3);
      break;
    case "typewriter":
      playTheme(0, 3);
      break;
    case "numpad":
      playTheme(0, 3);
      break;
    case "chess":
      playTheme(0, 2);
      break;
    default:
      //default mechanical keyboard
      theme = "mechanical_keyboard";
      playTheme(0, 3);
  }
  new Audio(baseURL).play();
}

function getCurrentDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calculateAccuracy(correct: number, total: number): number {
  return Math.round((correct / total) * 100);
}

function isValidKey(key: string) {
  // numeric , alphabets case insensitive
  return key.match(/^[a-z0-9 ,.]$/i);
}
