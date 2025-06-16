import { User } from 'lucide-react'
import React from 'react'

function ProfileCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg w-full max-w-3xl animate-pulse">
  
      <div className="flex items-center mb-6">
        <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-emerald-400 mr-6">
          <User className="h-10 w-10 opacity-50" />
        </div>
        <div className="space-y-2">
          <div className="h-7 bg-gray-700 rounded-md w-36"></div>
          <div className="h-5 bg-gray-700 rounded-md w-48"></div>
          <div className="h-4 bg-gray-700 rounded-md w-40"></div>
        </div>
        <div className="ml-auto bg-gray-700 p-2 rounded-full h-9 w-9"></div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-700 rounded-md overflow-hidden">
            <div className="px-6 py-2 text-sm font-medium w-20 bg-gray-600"></div>
            <div className="px-6 py-2 text-sm font-medium w-20 bg-gray-700"></div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="inline-flex rounded-md overflow-hidden shadow-sm">
            {[1, 2, 3, 4].map((val) => (
              <div
                key={val}
                className="px-4 py-2 text-sm w-10 bg-gray-700 mx-0.5"
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-gray-700 p-4 rounded-lg text-center">
            <div className="h-7 bg-gray-600 rounded-md w-12 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-600 rounded-md w-24 mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileCardSkeleton
