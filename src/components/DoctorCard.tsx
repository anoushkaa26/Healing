import React, { useState } from 'react';
import { Doctor } from '../types';
import DoctorProfileModal from './DoctorProfileModal';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    name,
    photo,
    specialty,
    specialities,
    experience,
    fees,
    consultationType,
    mode
  } = doctor;

  const defaultImage = "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg";
  const specialtiesList = specialty || specialities || [];

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-start space-x-4">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              src={photo || defaultImage}
              alt={`Dr. ${name}`}
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-100"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImage;
              }}
            />
          </div>

          {/* Basic Info */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{`Dr. ${name}`}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {specialtiesList.slice(0, 2).map((spec, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                  {specialtiesList.length > 2 && (
                    <span className="px-2 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                      +{specialtiesList.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {consultationType}
              </span>
            </div>

            <div className="mt-3 flex items-center space-x-4">
              <span className="text-gray-600">{experience} years experience</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">₹{fees} consultation fee</span>
            </div>

            <div className="mt-4 flex gap-3">
              {mode?.includes('VIDEO') && (
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                  Video Consult
                </span>
              )}
              {mode?.includes('CLINIC') && (
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                  In Clinic
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <DoctorProfileModal
          doctor={doctor}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DoctorCard;