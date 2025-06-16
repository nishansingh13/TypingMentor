import React from 'react'

function Ranks({leaderboardData}) {
  return (
    <>
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
      </>
  )
}

export default Ranks