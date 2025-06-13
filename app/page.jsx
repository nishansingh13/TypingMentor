"use client";
import { useEffect, useState } from "react";
import { generate } from "random-words";
import Navbar from "./component/Navbar";
import Options from "./component/Options";
import { useAppContext } from "./context/ContextProvider";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();
  const [targetText, setTargettext] = useState("");
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [indexes, setIndexes] = useState([]);
  const [errors, setErrors] = useState(0);
  const { wordCount,wpm,setWpm,netWpm,setNetWpm } = useAppContext();
  
  useEffect(() => {
   generateText();
  }, [wordCount]);
  function generateText() {
     const arr = generate({minLength:2, maxLength:5, exactly: wordCount });
    let string = ""; 
    arr.forEach((item,index) => {
      if(index!=arr.length-1){
      string += item + " ";
      }
      else{
        string+=item;
      }
    });
    setTypedText("");
    setStartTime(null);
    setErrors(0);
    setIndexes([]);
    setWpm(0);
    setNetWpm(0);
    setTargettext(string);
  }
useEffect(() => {
  let tabPressed = false;

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); 
      tabPressed = true;
    }

    if (event.key === "Enter" && tabPressed) {
      event.preventDefault(); // prevent form submits or default behavior
      generateText(); 
    }

  
  };

  const handleKeyUp = (event) => {
    if (event.key === "Tab") {
      tabPressed = false;
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, [generateText]);


  useEffect(() => {
    const handleKeyPress = (event) => {
      
      if (typedText.length >= targetText.length && event.key !== "Backspace") {
      //  generateText();
      
      router.push("/results");
        return;
      }

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

        // Calculate WPM
        const elapsedTime = (Date.now() - startTime) / 60000; 
        const wordsTyped = newTypedText.length / 4;
        const rawWpm = Math.round(wordsTyped / elapsedTime);
        const netWpmValue = Math.max(0, Math.round(rawWpm - ((errors/4) / elapsedTime)));
        
        setWpm(rawWpm);
        setNetWpm(netWpmValue);

       
          // if (newTypedText.length === targetText.length) {
          //         alert(`Congratulations! You completed the text with ${errors} errors.`);
          // }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [typedText, startTime, errors, targetText, indexes]);

  return (
   <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        <Options/>
        
        <div className="text-2xl bg-gray-800 p-6 rounded-lg w-full max-w-3xl shadow-lg border border-gray-700">
          {targetText.split("").map((char, index) => {
            const typedChar = typedText[index] || "";
            const isWrong = typedChar !== char && typedChar !== "";
            const isUnderlined = typedText.length === index + 1;

            return (
              <span
                key={index}
                className={`${
                  isWrong ? "text-red-500" : 
                  typedChar ? "text-emerald-400" : "text-gray-500"
                } ${isUnderlined ? "border-b-2 border-blue-500" : ""} font-mono`}
              >
                {char}
              </span>
            );
          })}
        </div>
        
        <div className="flex gap-8 text-xl mt-4">
          <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
            <span className="font-semibold text-emerald-400">WPM:</span> {wpm}
          </div>
          <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
            <span className="font-semibold text-emerald-400">Net WPM:</span> {netWpm}
            
          </div>
         
        </div>
      </div>
         <div className="text-gray-500 text-sm mt-8">
          Press Tab+Enter to restart the test
        </div>
    </div>
  );
}

export default HomePage;
