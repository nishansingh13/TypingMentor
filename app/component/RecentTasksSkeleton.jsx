import { BarChart2 } from 'lucide-react'
import React from 'react'

function RecentTasksSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg w-full max-w-3xl animate-pulse">
      <div className="flex items-center mb-4">
        <BarChart2 className="h-6 w-6 text-blue-400 mr-3 opacity-50" />
        <div className="h-7 bg-gray-700 rounded-md w-48"></div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="pb-2"><div className="h-5 bg-gray-700 rounded-md w-20"></div></th>
              <th className="pb-2"><div className="h-5 bg-gray-700 rounded-md w-20"></div></th>
              <th className="pb-2"><div className="h-5 bg-gray-700 rounded-md w-20"></div></th>
              <th className="pb-2"><div className="h-5 bg-gray-700 rounded-md w-20"></div></th>
              <th className="pb-2"><div className="h-5 bg-gray-700 rounded-md w-20"></div></th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item} className="border-b border-gray-700">
                <td className="py-3"><div className="h-5 bg-gray-700 rounded-md w-24"></div></td>
                <td className="py-3"><div className="h-5 bg-gray-700 rounded-md w-16"></div></td>
                <td className="py-3"><div className="h-5 bg-gray-700 rounded-md w-16"></div></td>
                <td className="py-3"><div className="h-5 bg-gray-700 rounded-md w-16"></div></td>
                <td className="py-3"><div className="h-5 bg-gray-700 rounded-md w-20"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center">
        <div className="h-5 bg-gray-700 rounded-md w-32"></div>
      </div>
    </div>
  )
}

export default RecentTasksSkeleton
