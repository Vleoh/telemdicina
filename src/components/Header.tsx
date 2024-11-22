import React from 'react';
import { Stethoscope, Activity, Heart, Bell, LogOut } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext'; 

const Header: React.FC<{ showProfile: boolean; setShowProfile: (show: boolean) => void; logout: () => void; }> = ({ showProfile, setShowProfile, logout }) => {
  const { isOnline, toggleOnlineStatus, doctorProfile } = useAuth(); 

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-teal-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Portal Médico</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <span className="flex items-center text-teal-600">
                <Activity className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">12 Consultas hoy</span>
              </span>
              <span className="flex items-center text-teal-600">
                <Heart className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">98% Satisfacción</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Online status toggle */}
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-2">
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <button
                onClick={toggleOnlineStatus}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                  isOnline ? 'bg-teal-600' : 'bg-gray-200'
                }`}
              >
                <span className="sr-only">Toggle online status</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isOnline ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            <button
              onClick={() => setShowProfile(true)}
              className="p-2 rounded-full hover:bg-gray-100 relative flex items-center"
            >
              <img
                src={doctorProfile.avatar}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            </button>

            <button
              onClick={logout}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-7 w-7 mr-1" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;