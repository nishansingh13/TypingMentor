"use client";
import { useEffect, useState } from "react";
import { generate } from "random-words";
import Navbar from "./component/Navbar";
import Options from "./component/Options";
import { useAppContext } from "./context/ContextProvider";
import { useRouter } from "next/navigation";


function HomePage() {
  const router = useRouter();
  const [targetText, setTargettext] = useState("welcome to typingmentor lets start typing right away");
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [indexes, setIndexes] = useState([]);
  const [errors, setErrors] = useState(0);
  const {selectedMode, setSelectedMode} = useAppContext();
  const [timeLeft, setTimeLeft] = useState(null);
  const { wordCount,wpm,setWpm,netWpm,setNetWpm,timeCount,setTimeCount } = useAppContext();
  
  // Reset and initialize when coming back to this page
  useEffect(() => {
    // Reset all states on component mount or when returning to this page
    setTypedText("");
    setStartTime(null);
    setErrors(0);
    setIndexes([]);
    setWpm(0);
    setNetWpm(0);
    setTimeLeft(null);
    
    // Generate appropriate text based on current mode
    if (selectedMode === "words") {
      generateText();
    } else if (selectedMode === "time") {
      generateTimeText();
    }
  }, []);  // Empty dependency array means this runs once on mount

  // Update text when word count changes
  useEffect(() => {
    if (selectedMode === "words") {
      generateText();
    }
  }, [wordCount, selectedMode]);
  
 
  useEffect(() => {
    if (selectedMode === "time") {
      generateTimeText();
    }
  }, [timeCount, selectedMode]);
  

  useEffect(() => {
    if (selectedMode === "words") {
      generateText();
    } else if (selectedMode === "time") {
      generateTimeText();
    }
  }, [selectedMode]);

  const generateTimeText = () => {
    const count = (() => {
      if (timeCount === 15) return 30;
      else if (timeCount === 30) return 45;
      else if (timeCount === 60) return 70;
      else if (timeCount === 120) return 130;
      else return 10; 
    })();
    
    const arr = generate({minLength:2, maxLength:5, exactly: count });
    let string = "";
    arr.forEach((item, index) => {
      if (index !== arr.length - 1) {
        string += item + " ";
      } else {
        string += item;
      }
    });
    setTypedText("");
    setStartTime(null);
    setErrors(0);
    setIndexes([]);
    setWpm(0);
    setNetWpm(0);
    setTargettext(string);
  };
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
      event.preventDefault();
  
      // Reset all typing-related states
      setTypedText("");
      setStartTime(null);
      setErrors(0);
      setIndexes([]);
      setWpm(0);
      setNetWpm(0);
      setTimeLeft(null); // Important for time mode
  
      if (selectedMode === "words") {
        generateText();
      } else if (selectedMode === "time") {
        setTimeLeft(timeCount); // Reset the countdown
        generateTimeText();
      }
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
}, [generateText, generateTimeText, selectedMode, timeCount, wordCount]); // Add all dependencies


  // Timer effect - countdown when in time mode
  useEffect(() => {
    let timerId;
    
    // Only run if we're in time mode and typing has started
    if (selectedMode === 'time' && startTime && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [selectedMode, startTime, timeLeft]);

  // Handle timer reaching zero
  useEffect(() => {
    if (timeLeft === 0) {
      router.push("/results");
    }
  }, [timeLeft, router]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      
      if (typedText.length >= targetText.length && event.key !== "Backspace") {
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
          // Initialize timer when starting to type in time mode
          if (selectedMode === 'time') {
            setTimeLeft(timeCount);
          }
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
  }, [typedText, startTime, errors, targetText, indexes, selectedMode, timeCount]);

  return (
   <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        <Options selectedMode={selectedMode} setSelectedMode={setSelectedMode}/>
        
        {/* Display timer when in time mode */}
        {selectedMode === 'time' && (
          <div className="text-xl bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
            <span className="font-semibold text-yellow-400">Time left:</span> {timeLeft !== null ? timeLeft : timeCount} seconds
          </div>
        )}
        
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
