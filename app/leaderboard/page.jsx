"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar';
import { useAppContext } from '../context/ContextProvider';
import axios from 'axios';
import { get, set } from 'mongoose';
import { Loader2 } from 'lucide-react';

function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMode, setSelectedMode] = useState('words');
  const { wordCount, setWordCount,timeCount,setTimeCount } = useAppContext();

    
    const wordOptions = [10, 25, 50, 100];
    const timeOptions = [15, 30, 60, 120];
  useEffect(()=>{
    getResults();
  },[selectedMode,wordCount,timeCount])
  const getResults = async () => {
    setLoading(true);
    try {
      const result = await axios.get('/api/users/getResults');
      const resultsData = result.data.results;
  
      const filteredResults = resultsData.filter((result) => {
        if (selectedMode === 'words') {
          return result.typeOfTest === 'WordBased' && result.wordCount == wordCount;
        } else {
          return result.typeOfTest === 'TimeBased' && result.timeCount == timeCount;
        }
      });
      
  
      // Map to store highest netWpm per user
      const userMaxMap = new Map();
  
      filteredResults.forEach((res) => {
        const userId = res.uid; // or `res.user._id` depending on your structure
        if (!userMaxMap.has(userId) || res.netWpm > userMaxMap.get(userId).netWpm) {
          userMaxMap.set(userId, res); // store the highest one
        }
      });
  
      // Convert map values to array
      const topResultsPerUser = Array.from(userMaxMap.values());
  
      setLeaderboardData(topResultsPerUser.map((result, index) => ({
        id: result._id,
        rank: index + 1,
        username: result.username ,
        wpm: result.netWpm,
        accuracy: result.accuracy.toFixed(2),
        level: (result.netWpm >= 120 ? 'Expert' :
                result.netWpm >= 90 ? 'Advanced' :
                result.netWpm >= 60 ? 'Intermediate' : 'Beginner'),
      })));
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() =>{
    getResults();
  },[])
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Navbar/>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[80vh]">
          <Loader2 className="h-12 w-12 text-emerald-400 animate-spin" />
          <span className="mt-4 text-gray-400 font-medium">Loading leaderboard data...</span>
        </div>
      ) : (
        <div className="container max-w-5xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-400 mb-2">Leaderboard</h1>
          </div>
          
          {/* Word/Time selector - centered with margin bottom */}
          <div className="w-full mx-auto mb-8 flex justify-center">
            <div className="w-full max-w-md bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
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
                            timeCount===option
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
          </div>

          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
            {/* Table header */}
            <div className="grid grid-cols-12 p-5 border-b border-gray-700 text-gray-400 text-sm font-medium uppercase tracking-wider">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-2 text-center">WPM</div>
              <div className="col-span-2 text-center">Accuracy</div>
              <div className="col-span-2 text-center">Level</div>
            </div>
            
            {/* Show "No data" message when leaderboard is empty */}
            {leaderboardData.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <div className="text-lg font-medium mb-2">No data available</div>
                <div className="text-sm">No results found for the selected criteria</div>
              </div>
            ) : (
              /* Table rows */
              leaderboardData.map((entry) => (
                <div 
                  key={entry.id} 
                  className="grid grid-cols-12 p-5 border-b border-gray-700 items-center transition-colors duration-200 hover:bg-gray-700/50"
                >
                  <div className="col-span-1 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold ${
                      entry.rank === 1 ? 'bg-gray-800 text-emerald-400 border border-emerald-500' :
                      entry.rank === 2 ? 'bg-gray-800 text-blue-400 border border-blue-500' :
                      entry.rank === 3 ? 'bg-gray-800 text-amber-400 border border-amber-500' :
                      'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {entry.rank}
                    </span>
                  </div>
                  <div className="col-span-4 flex items-center">
                    <div className="font-medium text-white">{entry.username}</div>
                  </div>
                  <div className="col-span-2 text-center text-emerald-400 font-semibold">{entry.wpm}</div>
                  <div className="col-span-2 text-center">{entry.accuracy}%</div>
                  <div className="col-span-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      entry.level === 'Expert' ? 'bg-yellow-900 text-yellow-400' :
                      entry.level === 'Advanced' ? 'bg-blue-900 text-blue-400' :
                      'bg-green-900 text-green-400'
                    }`}>
                      {entry.level}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeaderboardPage