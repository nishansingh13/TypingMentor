"use client"
import { ArrowLeft, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

function Others() {
    const router = useRouter();
  return (
  <div className="flex gap-4 mt-4">
          <button 
           onClick={() => router.push('/')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Practice
          </button>
          
          <button 
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
  )
}

export default Others
