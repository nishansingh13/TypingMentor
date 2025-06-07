import React, { useState } from 'react';
import { useAppContext } from '../context/ContextProvider';

function Options() {
  const [punctuation, setPunctuation] = useState(false);
 const {wordCount, setWordCount} = useAppContext();
  const [timeLimit, setTimeLimit] = useState();
  
  const wordOptions = [10, 25, 50, 100];
  const timeOptions = [15, 30, 60, 120];

  return (
    <div className="w-full max-w-3xl bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        {/* Words option */}
        <div className="flex flex-col items-center">
          <span className="text-gray-400 mb-2">Words</span>
          <div className="flex gap-2">
            {wordOptions.map(option => (
              <button
                key={option}
                onClick={() => setWordCount(option)}
                className={`px-3 py-1 rounded-md ${
                  wordCount === option 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* <div className="flex flex-col items-center">
          <span className="text-gray-400 mb-2">Time (seconds)</span>
          <div className="flex gap-2">
            {timeOptions.map(option => (
              <button
                key={option}
                onClick={() => setTimeLimit(option)}
                className={`px-3 py-1 rounded-md ${
                  timeLimit === option 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div> */}

      
      </div>
    </div>
  );
}

export default Options;
