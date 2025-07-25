"use client";
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/ContextProvider';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navbar';
import { Trophy, BarChart2, ArrowLeft, Clock, Target } from 'lucide-react';
import axios from 'axios';
function Results() {
    const { wpm, netWpm, wordCount,timeCount } = useAppContext();
    const router = useRouter();
    const {selectedMode} = useAppContext();
    const typeOfTest = selectedMode === 'words' ? 'WordBased' : 'TimeBased';
    useEffect(() => {
      let tabPressed = false;
    
      const handleKeyDown = (event) => {
        if (event.key === "Tab") {
          event.preventDefault(); 
          tabPressed = true;
        }
    
        if (event.key === "Enter" && tabPressed) {
          event.preventDefault(); 
          router.push('/');
          
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
    }, [router]);
  
    const getWpmRating = (wpm) => {
      if (wpm >= 80) return "Excellent";
      if (wpm >= 60) return "Great";
      if (wpm >= 40) return "Good";
      if (wpm >= 20) return "Average";
      return "Beginner";
    };
  
    const accuracy = Math.max(0, Math.min(100, Math.round((netWpm / (wpm || 1)) * 100)));
    const hasSent = useRef(false); // <-- flag to track sending
  
    useEffect(() => {
      if (!hasSent.current) {
        hasSent.current = true;
        sendData();
        
      }
    }, []);
  const sendData = async ()=>{
    try{
      if(selectedMode === 'words'){
       const data = await axios.post('/api/users/sendData', {
        wpm: wpm,
        netWpm: netWpm,
        accuracy: accuracy,
        wordCount: wordCount,
        typeOfTest: typeOfTest
      })
    }
    else {
      const data = await axios.post('/api/users/sendData', {
        wpm: wpm,
        netWpm: netWpm,
        accuracy: accuracy,
        timeCount: timeCount,
        typeOfTest: typeOfTest
      })
  
    }
    
  
    }
    catch(error){
      console.error("Error sending data:", error);
      alert("An error occurred while sending your results. Please try again later.");
    }
     
  
  }
  return (
    <>
    <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
    {/* WPM Card */}
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
      <div className="flex items-center mb-4">
        <Trophy className="h-6 w-6 text-emerald-400 mr-3" />
        <h2 className="text-xl font-semibold">Words Per Minute</h2>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-5xl font-bold text-emerald-400">{wpm}</div>
        <div className="text-gray-400 text-lg">{getWpmRating(wpm)}</div>
      </div>
    </div>
    
    {/* Net WPM Card */}
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
      <div className="flex items-center mb-4">
        <BarChart2 className="h-6 w-6 text-blue-400 mr-3" />
        <h2 className="text-xl font-semibold">Net WPM</h2>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-5xl font-bold text-blue-400">{netWpm}</div>
        <div className="text-gray-400 text-lg">Adjusted for errors</div>
      </div>
    </div>
  </div>
  
  {/* Additional Stats */}
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg w-full max-w-3xl">
    <h2 className="text-xl font-semibold mb-4">Test Details</h2>
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center">
        <Target className="h-5 w-5 text-gray-400 mr-3" />
        <div>
          <div className="text-gray-400 text-sm">Accuracy</div>
          <div className="text-lg font-medium">{accuracy}%</div>
        </div>
      </div>
      <div className="flex items-center">
        <Clock className="h-5 w-5 text-gray-400 mr-3" />
        <div>
          <div className="text-gray-400 text-sm">{typeOfTest=="WordBased"?"Word Count":"Time"}</div>
          <div className="text-lg font-medium">{typeOfTest=="WordBased"?wordCount+" words":timeCount+" s"}</div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="flex gap-4 mt-4">
    <button 
      onClick={() => router.push('/')}
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
    >
      <ArrowLeft className="h-5 w-5" />
      Try Again
    </button>
  </div>
  
  <div className="text-gray-500 text-sm mt-8">
    Press Tab+Enter to restart the test
  </div>
  </>
  )
}

export default Results