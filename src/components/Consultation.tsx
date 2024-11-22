import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Video, Phone, MessageSquare, FileText } from 'lucide-react';
import Header from './Header'; // Importa el Header
export default function Consultation() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-gray-50">
       <Header showProfile={false} setShowProfile={() => {}} logout={() => { /* lógica de logout */ }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Video Call Header */}
          <div className="bg-indigo-600 p-4">
            <div className="flex justify-between items-center">
              <div className="text-white">
                <h2 className="text-xl font-semibold">Consultation #${id}</h2>
                <p className="text-indigo-200">Patient: María García</p>
              </div>
              <div className="flex space-x-4">
                <button className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white">
                  <MessageSquare className="h-6 w-6" />
                </button>
                <button className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white">
                  <Phone className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => navigate(`/consultation-form/${id}`)}
                  className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white"
                >
                  <FileText className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Video Call Area (Simulated) */}
          <div className="aspect-video bg-gray-900 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Connecting to video call...</p>
              </div>
            </div>
            {/* Patient Video Preview */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Your preview</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 bg-gray-50 border-t">
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center">
                End Call
              </button>
              <button 
                onClick={() => navigate(`/consultation-form/${id}`)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              >
                Complete Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}