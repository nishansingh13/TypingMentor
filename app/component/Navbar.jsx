"use client"; // Mark this as a client component

import React from 'react';
import { Keyboard, BarChart3, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();


  return (
    <nav className='bg-gray-800 border-b border-gray-700 shadow-md h-[4rem] w-full flex justify-between items-center px-6 py-2'>
      <div className='flex items-center gap-4'>
        <h1 className='font-bold text-2xl text-emerald-400'>TypingMentor</h1>
        
        <div className='hidden sm:flex items-center gap-6 ml-4'>
          <div className='cursor-pointer flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors' onClick={() => router.push('/')}>
            <Keyboard className="h-5 w-5" />
            <span>Practice</span>
          </div>
          <a href="#" className='flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors'>
            <BarChart3 className="h-5 w-5" />
            <span>Scoreboard</span>
          </a>
          <a href="#" className='flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors'>
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </div>
      </div>
      
      <div>
        <div
        onClick={() => router.push('/account')} 
        className='flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-700 cursor-pointer' >
          <User className="h-5 w-5" />
          <span>Account</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
