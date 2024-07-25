import { useState } from "react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function TypingTest() {
  const card = [
    `She sells seashells by the seashore, and the shells she sells are surely seashells. This tongue-twister has been a popular phrase for generations, often used to improve pronunciation and diction. As you type, envision a bustling beach market where vendors are calling out to passersby, trying to sell their wares. The sound of waves crashing in the background adds to the seaside ambiance, making the exercise feel like a mini-vacation.`,
    `In a quiet village nestled in the hills, the townspeople go about their daily routines. Children play in the fields, farmers tend to their crops, and shopkeepers greet customers with friendly smiles. The simplicity of village life is reflected in the rhythmic tapping of the keyboard as you type. Each word is like a step in a well-rehearsed dance, bringing the peaceful village scene to life through your fingertips.`,
    `The rain in Spain stays mainly in the plain, but in Hartford, Hereford, and Hampshire, hurricanes hardly ever happen. This classic phrase from the musical "My Fair Lady" is a fun way to practice typing while also enjoying a bit of theater history. Picture yourself in a grand theater, with the spotlight shining on you as you type out the lines. The rhythmic pattern of the words helps to create a smooth typing flow, making practice sessions both entertaining and productive.`,
  ];
  const [currentCard, setCurrentCard] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleKeyPress = (key: string) => {
    if (key === card[currentCard][cursorPosition]) {
      setCursorPosition(cursorPosition + 1);
    }
  };
  const renderTextWithCursor = () => {
    return (
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            <span className="text-foreground">
              {card[currentCard]
                .split("")
                .filter((x, index) => index < cursorPosition)
                .map((char) => char)}
            </span>
            <span className="text-secondary">
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
    const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return (
      <div className="grid grid-cols-10 gap-2 mt-2">
        {keys.map((key, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center rounded shadow ${
              key === card[currentCard][cursorPosition].toUpperCase()
                ? "bg-blue-500"
                : "bg-gray-200"
            }`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {renderTextWithCursor()}
      {renderKeyboardUI()}
    </div>
  );
}
/*
<div class="flex flex-col items-center justify-center h-full">
    <div class="grid grid-cols-14 gap-2">
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">Q</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">W</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">E</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">R</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">T</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">Y</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">U</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">I</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">O</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">P</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">[</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">]</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">\</div>
    </div>
    <div class="grid grid-cols-10 gap-2 mt-2">
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">A</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">S</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">D</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">F</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">G</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">H</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">J</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">K</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">L</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">;</div>
    </div>
    <div class="grid grid-cols-14 gap-2 mt-2">
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">Z</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">X</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">C</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">V</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">B</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">N</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">M</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">,</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">.</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">/</div>
    </div>
    <div class="flex mt-2">
        <div class="w-32 h-12 flex items-center justify-center bg-gray-300 rounded shadow">Space</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">Enter</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-200 rounded shadow">Caps Lock</div>
    </div>
</div>
*/

/*
<div class="flex flex-col items-center justify-center h-full">
    <div class="grid grid-cols-10 gap-2">
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">q</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">w</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">e</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">r</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">t</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">y</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">u</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">i</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">o</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">p</div>
    </div>
    <div class="grid grid-cols-9 gap-2 mt-2">
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">a</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">s</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">d</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">f</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">g</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">h</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">j</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">k</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">l</div>
    </div>
    <div class="grid grid-cols-7 gap-2 mt-2">
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">z</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">x</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">c</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">v</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">b</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">n</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">m</div>
    </div>
    <div class="flex mt-2">
        <div class="w-32 h-12 flex items-center justify-center bg-gray-400 rounded shadow">Space</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">Enter</div>
        <div class="w-12 h-12 flex items-center justify-center bg-gray-300 rounded shadow">Caps Lock</div>
    </div>
</div>
*/
