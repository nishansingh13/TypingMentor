"use client";
import React, { use, useEffect, useState, useMemo } from 'react';
import Navbar from '../component/Navbar';
import { User, BarChart2, Settings, Award, Clock, ArrowLeft, Edit2, LogOut, Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
const ProfileCard = dynamic(() => import('../component/ProfileCard'), {
  ssr: false,
  loading: () => <ProfileCardSkeleton/>,
});
const RecentTasks = dynamic(() => import('../component/RecentTasks'), {
  ssr: false,
  loading: () => <RecentTasksSkeleton/>,
});

import AccountSettings from '../component/AccountSettings';
import Others from '../component/Others';
import { useAppContext } from '../context/ContextProvider';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import dynamic from 'next/dynamic';
import ProfileCardSkeleton from '../component/ProfileCardSkeleton';
import RecentTasksSkeleton from '../component/RecentTasksSkeleton';

function Account() {
  const [averageWPM, setAverageWPM] = useState(0);
  const [highestWPM, setHighestWPM] = useState(0);
  const [data,setData] = useState();
  const [results, setResults] = useState([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(true);
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
    setIsLoadingUser(true);
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
      setIsLoadingUser(false);
    }
  };
  
  const getUserResults = async () => {
    setIsLoadingResults(true);
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
    } finally {
      setIsLoadingResults(false);
    }
  };

  const userData = useMemo(() => ({
    username: data ? data.username : "",
    email: data ? data.email : "",
    joinDate: data ? new Date(data.createdAt).toLocaleDateString() : "",
    testsCompleted: results.length,
    averageWPM: averageWPM.toFixed(0),
    highestWPM: highestWPM,
    recentTests: [...results].reverse()
  }), [data, results, averageWPM, highestWPM]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center">
      <Navbar />
      <Toaster position="top-right" richColors/>
      <div className="container mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-emerald-400 mb-2">Your Account</h1>
          <p className="text-gray-400">Manage your profile and view your stats</p>
        </div>
        
        {/* Profile Card */}
        {isLoadingUser ? <ProfileCardSkeleton/> : <ProfileCard userData={userData} results={results} />}
        
        {/* Recent Tests */}
        {isLoadingResults ? <RecentTasksSkeleton/> : <RecentTasks userData={userData} />}
        
        {/* Settings */}
        <AccountSettings userData={userData} />
        
        <Others/>
      </div>
    </div>
  );
}

export default Account;
            
     