import React from 'react';
import { Doctor } from '../types';
import DoctorCard from './DoctorCard';

interface DoctorsListProps {
  doctors: Doctor[];
}

const DoctorsList: React.FC<DoctorsListProps> = ({ doctors }) => {
  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-xl font-medium text-gray-700">No doctors found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorsList;