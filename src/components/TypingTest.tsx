import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
  const [currentCard, setCurrentCard] = useState(2); // number of cards
  const [cursorPosition, setCursorPosition] = useState(card[2].length - 2); // position of cursor in current card
  const [testStatus, setTestStatus] = useState(0); //0: not started, 1: started, 2: ended

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (testStatus == 0 || testStatus == 2) return;
      const key = event.key;
      if (currentCard >= card.length) return;
      if (cursorPosition >= card[currentCard].length) return;

      if (key == card[currentCard][cursorPosition]) {
        setCursorPosition(cursorPosition + 1);
      }
    };
    if (currentCard == card.length) {
      setTestStatus(2);
    }
    if (cursorPosition >= card[currentCard].length) {
      setCurrentCard(currentCard + 1);
      setCursorPosition(0);
    }
    if (currentCard == card.length) {
      setTestStatus(2);
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [testStatus, currentCard, cursorPosition]);
  const renderTextWithCursor = () => {
    return (
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        test
        <CardHeader>
          <CardDescription className="max-w-lg text-balance leading-relaxed text-justify">
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
        <Card x-chunk="dashboard-02-chunk-0" className="rounded-md">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Typing Test Over</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            Want to retry
            <Button
              size="default"
              className="w-full"
              onClick={() => {
                setTestStatus(0);
                setCurrentCard(0);
                setCursorPosition(0);
              }}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
