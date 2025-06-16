import { Award, BarChart2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/ContextProvider';
import RecentTasksSkeleton from './RecentTasksSkeleton';

function RecentTasks({userData}) {
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const {selectType} = useAppContext();
  
  useEffect(() => {
    if (userData && userData.recentTests) {
      setLoading(false);
    }
  }, [userData]);
  
  if (loading || !userData || !userData.recentTests) {
    return <RecentTasksSkeleton />;
  }
  
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
                  <th className="pb-2 text-gray-400">NetWpm</th>
                  <th className="pb-2 text-gray-400">WPM</th>
                  <th className="pb-2 text-gray-400">Accuracy</th>
                  {selectType === 'All' && (
                    <th className="pb-2 text-gray-400">Type</th>
                  )}
            
                </tr>
              </thead>
              <tbody>
              {userData.recentTests.length === 0 ? (
                <tr>
                  <td colSpan={selectType === 'All' ? 5 : 4} className="py-3 text-center text-emerald-500">No recent tests found</td>
                </tr>
              ) : null}

            {(showAll ? userData.recentTests : userData.recentTests.slice(0, 4)).map((test, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-3">{new Date(test.createdAt).toLocaleDateString()}</td>
                <td className="py-3 text-emerald-400 font-medium">{test.netWpm}</td>
                <td className="py-3 text-emerald-400 font-medium">{test.wpm}</td>
                <td className="py-3">{test.accuracy}%</td>
                {selectType === 'All' && (
                  <td className="py-3">{test.typeOfTest === 'WordBased' ? test.wordCount + " Words" : "Time"}</td>
                )}
              </tr>
            ))}


              </tbody>
            </table>
          </div>
          
          <button className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm flex items-center cursor-pointer  " onClick={() => setShowAll(!showAll)} >
            <span>{!showAll?"View all tests":"Show Less"}</span>
            <Award className="h-4 w-4 ml-2" />
          </button>
        </div>
  )
}

export default RecentTasks
