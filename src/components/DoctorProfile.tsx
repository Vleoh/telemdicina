import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Award, Calendar, Stethoscope } from 'lucide-react';

interface ProfileModalProps {
  onClose: () => void;
}

export default function DoctorProfile({ onClose }: ProfileModalProps) {
  const { doctorProfile } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white rounded-xl shadow-xl max-w-md w-full relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative h-32 bg-gradient-to-r from-teal-500 to-teal-600">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img
              src={doctorProfile.avatar}
              alt="Doctor profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Dr. {doctorProfile.name} {doctorProfile.lastName}
            </h2>
            <p className="text-teal-600 font-medium">{doctorProfile.specialty}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Award className="h-5 w-5 text-teal-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Matrícula Nacional</p>
                <p className="text-sm text-gray-600">{doctorProfile.license}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Stethoscope className="h-5 w-5 text-teal-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Especialidad</p>
                <p className="text-sm text-gray-600">{doctorProfile.specialty}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-teal-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Fecha de Inicio</p>
                <p className="text-sm text-gray-600">{doctorProfile.startDate}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="bg-teal-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}