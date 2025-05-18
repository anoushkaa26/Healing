import React from 'react';
import { X, Star } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorProfileModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({ doctor, onClose }) => {
  const {
    name,
    photo,
    experience,
    fees,
    specialty,
    specialities,
    clinic,
    mode
  } = doctor;

  const defaultImage = "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg";
  const specialtiesList = specialty || specialities || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto pt-10 px-4">
      <div className="bg-white rounded-xl w-full max-w-2xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold">Doctor Profile</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="flex gap-6">
            <img
              src={photo || defaultImage}
              alt={`Dr. ${name}`}
              className="w-32 h-32 rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImage;
              }}
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Dr. {name}</h3>
              <div className="flex items-center gap-2 mb-4">
                <Star className="text-yellow-400 fill-current" size={20} />
                <span className="text-gray-600">{experience} Years Experience</span>
              </div>
              <div className="flex gap-3">
                {mode?.includes('VIDEO') && (
                  <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm">
                    Video Consult
                  </span>
                )}
                {mode?.includes('CLINIC') && (
                  <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full text-sm">
                    In Clinic
                  </span>
                )}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-3xl font-bold">₹{fees}</div>
              <div className="text-gray-500">Consultation Fee</div>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              About
            </h4>
            <p className="text-gray-600">
              Dr. {name} has an Experience of {experience} Years of experience years
              {clinic && `, currently practising in ${clinic.name}, ${clinic.locality || ''} ${clinic.city || ''}`}.
            </p>
          </div>

          {/* Languages Section */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </span>
              Languages Spoken
            </h4>
            <div className="flex gap-3">
              <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full">English</span>
              <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full">हिन्दी</span>
              <span className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full">मराठी</span>
            </div>
          </div>

          {/* Specialties Section */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </span>
              Specialties
            </h4>
            <div className="flex flex-wrap gap-3">
              {specialtiesList.map((specialty, index) => (
                <span key={index} className="px-4 py-2 bg-purple-50 text-purple-600 rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Clinic Details */}
          {clinic && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                Clinic Details
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-lg">{clinic.name}</h5>
                <p className="text-gray-600 mt-1">{clinic.address}</p>
                {(clinic.locality || clinic.city) && (
                  <p className="text-gray-600">
                    {[clinic.locality, clinic.city].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Book Appointment Button */}
        <div className="p-6 border-t border-gray-100">
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;