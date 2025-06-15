import React, { useState } from 'react';
import { useAppContext } from '../context/ContextProvider';
import { set } from 'mongoose';

function Options() {
  const [punctuation, setPunctuation] = useState(false);
  const {setSelectedMode,selectedMode} = useAppContext();
  const { wordCount, setWordCount,timeCount,setTimeCount } = useAppContext();

  
  const wordOptions = [10, 25, 50, 100];
  const timeOptions = [15, 30, 60, 120];

  return (
    <div className="w-full max-w-3xl bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
      <div className="flex flex-wrap justify-center gap-3 text-sm">
        {/* Mode selector */}
        <div className="flex justify-center mb-4 w-full">
          <div className="inline-flex bg-gray-700 rounded-md overflow-hidden">
            <button 
              className={`px-6 py-2 text-sm font-medium transition-colors ${selectedMode === 'words' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setSelectedMode('words')}
            >
              Words
            </button>
            <button 
              className={`px-6 py-2 text-sm font-medium transition-colors ${selectedMode === 'time' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setSelectedMode('time')}
            >
              Time
            </button>
          </div>
        </div>

        {/* Options based on mode */}
        <div className="flex justify-center w-full">
          {selectedMode === 'words' && (
            <div className="inline-flex rounded-md overflow-hidden shadow-sm">
              {wordOptions.map(option => (
                <button
                  key={option}
                  onClick={() => setWordCount(option)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    wordCount === option 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          
          {selectedMode === 'time' && (
            <div className="inline-flex rounded-md overflow-hidden shadow-sm">
              {timeOptions.map(option => (
                <button
                  key={option}
                  onClick={() => {setTimeCount(option)}}
                  className={`px-4 py-2 text-sm transition-colors ${
                    timeCount === option
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                >
                  {option}s
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Options;
