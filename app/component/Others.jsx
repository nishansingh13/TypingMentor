// "use client"
import axios from 'axios';
import { ArrowLeft, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, Toaster } from 'sonner';

function Others() {
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    
    const logout = async () => {
      setLoading(true); // Show loading state
      try {
        const res = await axios.post('/api/users/logout');
        if (res.status === 200) {
          // Redirect to login page instead of home
          window.location.href = '/account/login'; // Force full page reload
          // Don't use router.push here as it can cause race conditions
          toast.success('Logged out successfully!');
        } else {
          console.error('Failed to log out:', res.statusText);
          toast.error('An error occurred while logging out. Please try again later.');
        }
      } catch (err) {
        console.error('Error during logout:', err);
        toast.error('An error occurred while logging out. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <div className="flex gap-4 mt-4">
        <Toaster position="top-right" richColors/>
          <button 
           onClick={() => router.push('/')}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Practice
          </button>
          
          <button 
          onClick={logout}
          disabled={loading}
          className={`flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <span className="animate-pulse">Logging out...</span>
            </>
          ) : (
            <>
              <LogOut className="h-5 w-5" />
              Sign Out
            </>
          )}
        </button>
      </div>
    )
}

export default Others
