import { Settings } from 'lucide-react'
import React from 'react'

function AccountSettings() {
  return (
     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 shadow-lg w-full max-w-3xl">
          <div className="flex items-center mb-4">
            <Settings className="h-6 w-6 text-gray-400 mr-3" />
            <h2 className="text-xl font-semibold">Account Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <h3 className="font-medium">Update Password</h3>
                <p className="text-sm text-gray-400">Change your account password</p>
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm cursor-pointer">
                Change
              </button>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-400">Manage your email preferences</p>
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                Settings
              </button>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <h3 className="font-medium text-red-400">Delete Account</h3>
                <p className="text-sm text-gray-400">Permanently delete your account</p>
              </div>
              <button className="px-4 py-2 bg-red-900 hover:bg-red-800 text-red-200 rounded-lg text-sm cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
  )
}

export default AccountSettings
