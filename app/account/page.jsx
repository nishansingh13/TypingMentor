"use client";
import React, { use, useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import { User, BarChart2, Settings, Award, Clock, ArrowLeft, Edit2, LogOut, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import ProfileCard from '../component/ProfileCard';
import RecentTasks from '../component/RecentTasks';
import AccountSettings from '../component/AccountSettings';
import Others from '../component/Others';
import { useAppContext } from '../context/ContextProvider';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

function Account() {
  const {formData, setFormData} = useAppContext();
  const [averageWPM, setAverageWPM] = useState(0);
  const [highestWPM, setHighestWPM] = useState(0);
  const [data,setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const {selectType,setSelectType,selectedMode,setSelectedMode} = useAppContext();
  
  useEffect(()=>{
    getUser();
    getUserResults();
    
  },[])
  useEffect(() => {
    getUserResults();
  }
  , [selectType,selectedMode]);
  
  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/users/getuser');
      if (response.status === 200) {
        const userData = response.data[0];
      
        setData(userData);
    
      } else {
        console.error('Failed to fetch user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('An error occurred while fetching user data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  const getUserResults = async () => {
    try {
      const response = await axios.get('/api/users/getUserResults');
      if (response.status === 200) {
        const resultsData = response.data;
        
        const filteredResults = resultsData.filter((result) => {
          if (result.typeOfTest === 'WordBased' && selectType != 'All') {
          
            return result.wordCount == selectType;
          } else if (result.typeOfTest === 'TimeBased') {
            return result.timeCount == selectType;
          }
          return true;
        });
        
        setResults(filteredResults);
        
      
  
        let totalWPM = 0;
        let maxWPM = 0;
      
       
        filteredResults.forEach((result) => {
          totalWPM += result.netWpm;
          if (result.netWpm > maxWPM) {
            maxWPM = result.netWpm;
          }
        });
       
  
        setAverageWPM(filteredResults.length > 0 ? totalWPM / filteredResults.length : 0);
        setHighestWPM(maxWPM);
  
    
       
      } else {
        console.error('Failed to fetch results data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching results data:', error);
      toast.error('An error occurred while fetching results data. Please try again later.');
    }
  };
  
  

  


  const userData = {
    username: data ? data.username : "not found",
    email:data ? data.email : "not found",
    joinDate:data ? new Date(data.createdAt).toLocaleDateString() : "not found",
    testsCompleted: results.length,
    averageWPM: averageWPM.toFixed(0),
    highestWPM: highestWPM,
    recentTests: [...results].reverse()

  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center">
      <Navbar />
      <Toaster position="top-right" richColors/>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mb-4" />
            <p className="text-gray-400">Loading your profile data...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-emerald-400 mb-2">Your Account</h1>
              <p className="text-gray-400">Manage your profile and view your stats</p>
            </div>
            
            {/* Profile Card */}
            <ProfileCard userData={userData} results={results} />
            
            {/* Recent Tests */}
            <RecentTasks userData={userData}  />
            
            {/* Settings */}
            <AccountSettings userData={userData} />
            
            <Others/>
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
