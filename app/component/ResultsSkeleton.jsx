import React from 'react';
import { Trophy, BarChart2, Clock, Target } from 'lucide-react';

function ResultsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-8 animate-pulse">
      <div className="text-center mb-6">
        <div className="h-8 bg-gray-700 rounded-md w-48 mx-auto mb-2"></div>
        <div className="h-5 bg-gray-700 rounded-md w-36 mx-auto"></div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* WPM Card Skeleton */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center mb-4">
            <Trophy className="h-6 w-6 text-emerald-400 mr-3 opacity-50" />
            <div className="h-6 bg-gray-700 rounded-md w-40"></div>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-12 bg-gray-700 rounded-md w-20"></div>
            <div className="h-6 bg-gray-700 rounded-md w-24"></div>
          </div>
        </div>
        
        {/* Net WPM Card Skeleton */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-6 w-6 text-blue-400 mr-3 opacity-50" />
            <div className="h-6 bg-gray-700 rounded-md w-28"></div>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-12 bg-gray-700 rounded-md w-20"></div>
            <div className="h-6 bg-gray-700 rounded-md w-36"></div>
          </div>
        </div>
      </div>
      
      {/* Additional Stats Skeleton */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg w-full max-w-3xl">
        <div className="h-6 bg-gray-700 rounded-md w-32 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Target className="h-5 w-5 text-gray-400 mr-3 opacity-50" />
            <div>
              <div className="h-4 bg-gray-700 rounded-md w-16 mb-1"></div>
              <div className="h-6 bg-gray-700 rounded-md w-12"></div>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-3 opacity-50" />
            <div>
              <div className="h-4 bg-gray-700 rounded-md w-20 mb-1"></div>
              <div className="h-6 bg-gray-700 rounded-md w-16"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 mt-4">
        <div className="h-12 bg-gray-700 rounded-lg w-32"></div>
      </div>
      
      <div className="h-4 bg-gray-700 rounded-md w-48 mt-8"></div>
    </div>
  );
}

export default ResultsSkeleton;
