import React from 'react'

function RanksSkeleton() {
  // Create an array of 6 items to represent loading rows
  return (
    <>
      {[1, 2, 3, 4].map((item) => (
        <div 
          key={item} 
          className="grid grid-cols-12 p-5 border-b border-gray-700 items-center animate-pulse"
        >
          <div className="col-span-1 text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-700 mx-auto"></div>
          </div>
          <div className="col-span-4 flex items-center">
            <div className="h-5 bg-gray-700 rounded-md w-32"></div>
          </div>
          <div className="col-span-2 text-center">
            <div className="h-5 bg-gray-700 rounded-md w-12 mx-auto"></div>
          </div>
          <div className="col-span-2 text-center">
            <div className="h-5 bg-gray-700 rounded-md w-16 mx-auto"></div>
          </div>
          <div className="col-span-2 text-center">
            <div className="h-6 bg-gray-700 rounded-full w-20 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  )
}

export default RanksSkeleton
