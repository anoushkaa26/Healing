import React from 'react';
import { FilterPanelProps } from '../types';
import { ArrowUpDown, Video, MapPin } from 'lucide-react';

const FilterPanel: React.FC<FilterPanelProps> = ({
  specialties,
  filterState,
  setFilterState,
}) => {
  const handleSortChange = (value: string) => {
    setFilterState(prev => ({
      ...prev,
      sortBy: prev.sortBy === value ? '' : value
    }));
  };

  const handleConsultationChange = (value: string) => {
    console.log('Consultation type changed to:', value);
    setFilterState(prev => ({
      ...prev,
      consultationType: prev.consultationType === value ? '' : value
    }));
  };

  const handleSpecialtyChange = (specialty: string) => {
    console.log('Specialty changed:', specialty);
    setFilterState(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const getTestId = (specialty: string) => {
    try {
      return `filter-specialty-${specialty.toLowerCase().replace(/\s+/g, '-').replace('/', '-')}`;
    } catch (e) {
      return `filter-specialty-unknown`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-blue-100 h-full overflow-hidden">
      {/* Sort Section */}
      <div className="p-4 border-b border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <ArrowUpDown size={18} className="text-blue-600" />
          Sort By
        </h3>
        <div className="space-y-2">
          <label
            className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filterState.sortBy === 'fees'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={filterState.sortBy === 'fees'}
              onChange={() => handleSortChange('fees')}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
            />
            Fees: Low to High
          </label>
          <label
            className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filterState.sortBy === 'fees-desc'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={filterState.sortBy === 'fees-desc'}
              onChange={() => handleSortChange('fees-desc')}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
            />
            Fees: High to Low
          </label>
          <label
            className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filterState.sortBy === 'experience'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={filterState.sortBy === 'experience'}
              onChange={() => handleSortChange('experience')}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
            />
            Experience
          </label>
        </div>
      </div>

      {/* Consultation Type Section */}
      <div className="p-4 border-b border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Video size={18} className="text-blue-600" />
          Consultation Type
        </h3>
        <div className="space-y-2">
          <label
            className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filterState.consultationType === 'Video Consult'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={filterState.consultationType === 'Video Consult'}
              onChange={() => handleConsultationChange('Video Consult')}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
            />
            Video Consultation
          </label>
          <label
            className={`flex items-center w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filterState.consultationType === 'In Clinic'
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <input
              type="checkbox"
              checked={filterState.consultationType === 'In Clinic'}
              onChange={() => handleConsultationChange('In Clinic')}
              className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mr-3"
            />
            In-Clinic Visit
          </label>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin size={18} className="text-blue-600" />
          Specialties
        </h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {specialties.map((specialty) => (
            <label
              key={specialty}
              className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filterState.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {specialty}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;