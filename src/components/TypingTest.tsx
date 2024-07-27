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
  const [currentCard, setCurrentCard] = useState(0); // number of cards
  const [cursorPosition, setCursorPosition] = useState(card[0].length - 2); // position of cursor in current card
  const [testStatus, setTestStatus] = useState(0); // 0 not started, 1 started, 2 finished

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (testStatus == 0 || testStatus == 2) return;

      const key = event.key;
      if (currentCard == card.length) {
        setTestStatus(2);
        return;
      }

      if (cursorPosition >= card[currentCard].length) {
        setCurrentCard(currentCard + 1);
        setCursorPosition(0);
      }
      if (key == card[currentCard][cursorPosition]) {
        setCursorPosition(cursorPosition + 1);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [testStatus, currentCard, cursorPosition]);

  const renderTextWithCursor = () => {
    return (
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader>
          <CardDescription className="max-w-lg text-balance leading-relaxed text-justify">
            <span className="text-foreground">
              {card[currentCard]
                .split("")
                .filter((x, index) => index < cursorPosition)
                .map((char) => char)}
            </span>
            <span className="blinking-cursor"></span>
            <span className="text-untyped">
              {card[currentCard]
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
      {renderTextWithCursor()}
      {testStatus == 0 && (
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
      )}
      {testStatus == 1 && renderKeyboardUI()}
      {testStatus == 2 && (
        <Card x-chunk="dashboard-02-chunk-0" className="rounded-md">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Typing test</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button
              size="default"
              className="w-full"
              onClick={() => {
                console.log("test ended");
              }}
            >
              End
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
