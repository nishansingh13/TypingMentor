import { Award, BarChart2 } from 'lucide-react'
import React from 'react'

function RecentTasks({userData}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg w-full max-w-3xl">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-6 w-6 text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold">Recent Performance</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="pb-2 text-gray-400">Date</th>
                  <th className="pb-2 text-gray-400">WPM</th>
                  <th className="pb-2 text-gray-400">Accuracy</th>
            
                </tr>
              </thead>
              <tbody>
                {userData.recentTests.map((test, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3">{test.date}</td>
                    <td className="py-3 text-emerald-400 font-medium">{test.wpm}</td>
                    <td className="py-3">{test.accuracy}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm flex items-center">
            <span>View all tests</span>
            <Award className="h-4 w-4 ml-2" />
          </button>
        </div>
  )
}

export default RecentTasks
