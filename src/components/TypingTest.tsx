import { useState } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function TypingTest() {
  const card = [
    `She sells seashells by the seashore, and the shells she sells are surely seashells. This tongue-twister has been a popular phrase for generations, often used to improve pronunciation and diction. As you type, envision a bustling beach market where vendors are calling out to passersby, trying to sell their wares. The sound of waves crashing in the background adds to the seaside ambiance, making the exercise feel like a mini-vacation.`,
    `In a quiet village nestled in the hills, the townspeople go about their daily routines. Children play in the fields, farmers tend to their crops, and shopkeepers greet customers with friendly smiles. The simplicity of village life is reflected in the rhythmic tapping of the keyboard as you type. Each word is like a step in a well-rehearsed dance, bringing the peaceful village scene to life through your fingertips.`,
    `The rain in Spain stays mainly in the plain, but in Hartford, Hereford, and Hampshire, hurricanes hardly ever happen. This classic phrase from the musical "My Fair Lady" is a fun way to practice typing while also enjoying a bit of theater history. Picture yourself in a grand theater, with the spotlight shining on you as you type out the lines. The rhythmic pattern of the words helps to create a smooth typing flow, making practice sessions both entertaining and productive.`,
  ];
  const [currentCard, setCurrentCard] = useState(0); // number of cards
  const [cursorPosition, setCursorPosition] = useState(0); // position of cursor in current card

  const handleKeyPress = (key: string) => {
    if (key === card[currentCard][cursorPosition]) {
      setCursorPosition(cursorPosition + 1);
    }
  };
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
            className={`grid gap-2 mt-2`}
            style={{
              gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))`,
            }}
          >
            {keys.split("").map((key) => (
              <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">
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
      {renderKeyboardUI()}
    </div>
  );
}
