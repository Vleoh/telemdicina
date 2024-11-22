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
  { id: 101, date: "10/03/2024", doctor: "Dr. Juan Pérez", patient: "Carlos Ruiz", diagnosis: "Hipertensión", prescription: "Losartán 50mg", symptoms: "Dolor de cabeza, mareos" },
  { id: 102, date: "09/03/2024", doctor: "Dra. Ana López", patient: "Laura Torres", diagnosis: "Migraña", prescription: "Sumatriptán 50mg", symptoms: "Dolor de cabeza intenso, sensibilidad a la luz" },
  // Agrega más datos de ejemplo según sea necesario
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, isOnline, toggleOnlineStatus, doctorProfile } = useAuth();
  const [selectedConsultation, setSelectedConsultation] = useState<number | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOfflineModalOpen, setOfflineModalOpen] = useState(false);

  const filteredHistory = mockHistory.filter(item =>
    item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConsultationClick = (request: any) => {
    if (!isOnline) {
      setSelectedConsultation(request);
      setOfflineModalOpen(true);
    } else {
      setSelectedConsultation(request);
      setModalOpen(true);
    }
  };

  const handleConfirm = () => {
    if (selectedConsultation) {
      navigate(`/consultation/${selectedConsultation.id}`);
    }
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedConsultation(null);
  };

  const handleOfflineConfirm = () => {
    toggleOnlineStatus();
    setOfflineModalOpen(false);
    setModalOpen(true);
  };

  const handleOfflineCancel = () => {
    setOfflineModalOpen(false);
  };

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
          <div className={`health-card ${isOnline ? 'bg-teal-600' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${isOnline ? 'text-white' : 'text-gray-900'}`}>Consultas Pendientes</h2>
              <Clock className={`h-5 w-5 ${isOnline ? 'text-white' : 'text-teal-500'}`} />
            </div>
            <div className="space-y-4">
              {mockRequests.map((request) => (
                <div
                  key={request.id}
                  className="relative bg-white rounded-lg p-4 hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-teal-200"
                  onClick={() => handleConsultationClick(request)}
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

        {/* Tabla Histórica */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Historial de Consultas</h2>
          <input
            type="text"
            placeholder="Buscar por paciente o diagnóstico"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full md:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Fecha</th>
                  <th className="py-2 px-4 border-b">Doctor</th>
                  <th className="py-2 px-4 border-b">Paciente</th>
                  <th className="py-2 px-4 border-b">Diagnóstico</th>
                  <th className="py-2 px-4 border-b">Receta</th>
                  <th className="py-2 px-4 border-b">Síntomas</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map(item => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{item.id}</td>
                      <td className="py-2 px-4 border-b">{item.date}</td>
                      <td className="py-2 px-4 border-b">{item.doctor}</td>
                      <td className="py-2 px-4 border-b">{item.patient}</td>
                      <td className="py-2 px-4 border-b">{item.diagnosis}</td>
                      <td className="py-2 px-4 border-b">{item.prescription}</td>
                      <td className="py-2 px-4 border-b">{item.symptoms}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-2 px-4 text-center">No se encontraron resultados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de Confirmación */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">Confirmar Videollamada</h2>
              <p><strong>Paciente:</strong> {selectedConsultation?.patient}</p>
              <p><strong>Hora:</strong> {selectedConsultation?.time}</p>
              <p><strong>Diagnóstico:</strong> {selectedConsultation?.diagnosis}</p>
              <div className="flex justify-end mt-4">
                <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={handleClose}>Cancelar</button>
                <button className="px-4 py-2 text-white rounded" style={{ backgroundColor: '#14B8A6' }} onClick={handleConfirm}>Entrar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Offline */}
        {isOfflineModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">Modo Offline</h2>
              <p>Estás actualmente en modo offline. ¿Deseas pasar a modo online?</p>
              <div className="flex justify-end mt-4">
                <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={handleOfflineCancel}>Cancelar</button>
                <button className="px-4 py-2 text-white rounded" style={{ backgroundColor: '#14B8A6' }} onClick={handleOfflineConfirm}>Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}