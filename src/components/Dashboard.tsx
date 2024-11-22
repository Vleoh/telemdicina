import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, Calendar, Clock, Users, Stethoscope, Heart, Activity, UserCircle } from 'lucide-react';
import DoctorProfile from './DoctorProfile';

const mockRequests = [
  { id: 1, patient: "María García", age: 34, time: "10:00", status: "Pendiente", urgency: "Alta" },
  { id: 2, patient: "Juan Pérez", age: 45, time: "10:30", status: "Pendiente", urgency: "Media" },
  { id: 3, patient: "Ana López", age: 28, time: "11:00", status: "Pendiente", urgency: "Baja" },
];

const mockHistory = [
  { 
    id: 101, 
    patient: "Carlos Ruiz", 
    age: 52, 
    date: "10/03/2024", 
    diagnosis: "Hipertensión",
    symptoms: "Dolor de cabeza, mareos",
    prescription: "Losartán 50mg",
    nextAppointment: "24/03/2024"
  },
  { 
    id: 102, 
    patient: "Laura Torres", 
    age: 29, 
    date: "09/03/2024", 
    diagnosis: "Migraña",
    symptoms: "Dolor de cabeza intenso, sensibilidad a la luz",
    prescription: "Sumatriptán 50mg",
    nextAppointment: "23/03/2024"
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, isOnline, toggleOnlineStatus, doctorProfile } = useAuth();
  const [selectedConsultation, setSelectedConsultation] = useState<number | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-health-pattern">
      {showProfile && <DoctorProfile onClose={() => setShowProfile(false)} />}
      
      {/* Header */}
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
              {/* Online Status Toggle */}
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
                onClick={() => logout()}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-7 w-7 mr-1" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Consultations */}
          <div className="health-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Consultas Pendientes</h2>
              <Clock className="h-5 w-5 text-teal-500" />
            </div>
            <div className="space-y-4">
              {mockRequests.map((request) => (
                <div
                  key={request.id}
                  className="relative bg-white rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-teal-200"
                  onClick={() => navigate(`/consultation/${request.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.patient}</h3>
                      <p className="text-sm text-gray-500">Edad: {request.age} años</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${request.urgency === 'Alta' ? 'bg-red-100 text-red-800' :
                        request.urgency === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                      {request.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Programado: {request.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation History */}
          <div className="health-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Consultas Recientes</h2>
              <Users className="h-5 w-5 text-teal-500" />
            </div>
            <div className="space-y-4">
              {mockHistory.map((consultation) => (
                <div key={consultation.id}>
                  <div 
                    className={`relative bg-white rounded-lg p-4 cursor-pointer border transition-all duration-300
                      ${selectedConsultation === consultation.id 
                        ? 'border-teal-500 shadow-md' 
                        : 'border-gray-100 hover:border-teal-200 hover:shadow-sm'}`}
                    onClick={() => setSelectedConsultation(
                      selectedConsultation === consultation.id ? null : consultation.id
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{consultation.patient}</h3>
                        <p className="text-sm text-gray-500">Edad: {consultation.age} años</p>
                      </div>
                      <span className="text-sm text-gray-500">{consultation.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Diagnóstico: {consultation.diagnosis}</p>
                    
                    {selectedConsultation === consultation.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="space-y-3">
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Síntomas:</span>
                            <span className="text-gray-600 ml-2">{consultation.symptoms}</span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Prescripción:</span>
                            <span className="text-gray-600 ml-2">{consultation.prescription}</span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium text-gray-700">Próxima cita:</span>
                            <span className="text-gray-600 ml-2">{consultation.nextAppointment}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}