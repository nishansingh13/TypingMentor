import { Edit2, User } from 'lucide-react'
import React from 'react'

function ProfileCard({ userData }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg w-full max-w-3xl">
  
      <div className="flex items-center mb-6">
        <div className="h-20 w-20 rounded-full bg-gray-700 flex items-center justify-center text-emerald-400 mr-6">
          <User className="h-10 w-10" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{userData.username}</h2>
          <p className="text-gray-400">{userData.email}</p>
          <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
        </div>
        <button className="ml-auto bg-gray-700 hover:bg-gray-600 p-2 rounded-full">
          <Edit2 className="h-5 w-5 text-emerald-400 cursor-pointer" />
        </button>
      </div>
      
      <div className="flex justify-center mb-4 text-xs">
        <button className="px-3 py-1.5 bg-emerald-600 text-white rounded-l-md hover:bg-emerald-700 transition-colors">10 words</button>
        <button className="px-3 py-1.5 bg-gray-600 text-gray-200 hover:bg-gray-500 transition-colors">20 words</button>
        <button className="px-3 py-1.5 bg-gray-600 text-gray-200 hover:bg-gray-500 transition-colors">50 words</button>
        <button className="px-3 py-1.5 bg-gray-600 text-gray-200 hover:bg-gray-500 rounded-r-md transition-colors">All</button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-emerald-400 text-xl font-bold">{userData.testsCompleted}</div>
          <div className="text-gray-400 text-sm">Tests Completed</div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-emerald-400 text-xl font-bold">{userData.averageWPM}</div>
          <div className="text-gray-400 text-sm">Average WPM</div>
        </div>
        
        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-emerald-400 text-xl font-bold">{userData.highestWPM}</div>
          <div className="text-gray-400 text-sm">Highest WPM</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
