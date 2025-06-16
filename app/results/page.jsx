"use client";
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../context/ContextProvider';
import { useRouter } from 'next/navigation';
import Navbar from '../component/Navbar';
import { Trophy, BarChart2, ArrowLeft, Clock, Target } from 'lucide-react';
import axios from 'axios';
import ResultsSkeleton from '../component/ResultsSkeleton';
import dynamic from 'next/dynamic';
const Results = dynamic(() => import('../component/Results'), {
  ssr: false,
  loading: () => <ResultsSkeleton />
});

function ShowResults() {
 
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center">
      <Navbar />
     
      
      <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Test Complete!</h1>
          <p className="text-gray-400">Here's how you performed</p>
        </div>
        <Results/>

      </div>
    </div>
  );
}

export default ShowResults;
