"use client";
import { useEffect, useState } from "react";
import { generate } from "random-words";

function HomePage() {
  const [targetText, setTargettext] = useState("");
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [netWpm, setNetWpm] = useState(0);
  const [indexes, setIndexes] = useState([]);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const arr = generate({ maxLength:5, exactly: 10 });
    let string = "";
    arr.forEach((item,index) => {
      if(index!=arr.length-1){
      string += item + " ";
      }
      else{
        string+=item;
      }
    });

    setTargettext(string);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Backspace") {
        const lastIndex = typedText.length - 1;
        if (indexes.includes(lastIndex)) {
          setErrors((prev) => prev - 1);
        }
        setIndexes(indexes.filter((item) => item !== lastIndex));
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      if (event.key.length === 1) {
        if (!startTime) {
          setStartTime(Date.now());
        }

        const newTypedText = typedText + event.key;
        const targetChar = targetText[newTypedText.length - 1];

        if (event.key !== targetChar) {
          setIndexes((prev) => [...prev, newTypedText.length - 1]);
          setErrors((prev) => prev + 1);
        }

        setTypedText(newTypedText);

        const elapsedTime = (Date.now() - startTime) / 60000; 
        const wordsTyped = newTypedText.length / 5;
        const rawWpm = Math.round(wordsTyped / elapsedTime);
        
      
        const netWpmValue = Math.max(0, Math.round(rawWpm - (errors / elapsedTime)));
        
        setWpm(rawWpm);
        setNetWpm(netWpmValue);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [typedText, startTime, errors, targetText, indexes]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mb-6">
        <div className="text-2xl font-mono leading-relaxed tracking-wide">
          {targetText.split("").map((char, index) => {
            const typedChar = typedText[index] || "";
            const isWrong = typedChar !== char && typedChar !== "";
            const isUnderlined = typedText.length === index + 1;

            return (
              <span
                key={index}
                className={`${
                  isWrong ? "text-red-500" : 
                  typedChar ? "text-green-600" : "text-gray-400"
                } ${isUnderlined ? "border-b-2 border-blue-500" : ""}`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex gap-8 text-xl">
        <div className="bg-white px-6 py-3 rounded shadow">
          <span className="font-semibold">WPM:</span> {wpm}
        </div>
        <div className="bg-white px-6 py-3 rounded shadow">
          <span className="font-semibold">Net WPM:</span> {netWpm}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
