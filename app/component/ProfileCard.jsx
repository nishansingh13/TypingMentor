import { Edit2, User } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { useAppContext } from '../context/ContextProvider';
import ProfileCardSkeleton from './ProfileCardSkeleton';

function ProfileCard({ userData ,results}) {
  const {selectType,setSelectType,selectedMode,setSelectedMode} = useAppContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userData && userData.username) {
      setLoading(false);
    }
  }, [userData]);
  
  if(userData.username=== undefined || loading) {
    return <ProfileCardSkeleton />;
  }
 
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
      
      <div className="mb-6">
       
        <div className="flex justify-center mb-4">
          <div className="inline-flex bg-gray-700 rounded-md overflow-hidden">
            <button 
              className={`px-6 py-2 text-sm font-medium transition-colors ${selectedMode === 'words' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setSelectedMode('words')}
            >
              Words
            </button>
            <button 
              className={`px-6 py-2 text-sm font-medium transition-colors ${selectedMode === 'time' ? 'bg-emerald-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setSelectedMode('time')}
            >
              Time
            </button>
          </div>
        </div>
        
      
        <div className="flex justify-center">
        {selectedMode === 'words' && (
                  <div className="inline-flex rounded-md overflow-hidden shadow-sm">
                    {['All','10', '25', '50' ].map((val) => (
                      <button

                        key={val}
                        onClick={() => setSelectType(val)}
                        className={`px-4 py-2 text-sm transition-colors cursor-pointer ${
                          selectType === val
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                )}

          
          {selectedMode === 'time' && (
            <div className="inline-flex rounded-md overflow-hidden shadow-sm">
            {['15','30','60','90'].map((val) => (
              <button
                key={val}
                onClick={() => setSelectType(val)}
                className={`px-4 py-2 text-sm transition-colors ${
                  selectType === val
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
          )}
        </div>
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
