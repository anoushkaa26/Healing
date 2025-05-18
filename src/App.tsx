import React, { useState, useEffect } from 'react';
import { fetchDoctors } from './services/api';
import { applyFilters, getAllSpecialties } from './utils/filterUtils';
import { Doctor, FilterState } from './types';
import Autocomplete from './components/Autocomplete';
import FilterPanel from './components/FilterPanel';
import DoctorsList from './components/DoctorsList';
import { useUrlParams } from './hooks/useUrlParams';
import { Stethoscope, RefreshCw, X, Users } from 'lucide-react';

function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    consultationType: '',
    specialties: [],
    sortBy: '',
  });

  useUrlParams(filterState, setFilterState);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        console.log('Starting to load doctors...');
        setIsLoading(true);
        setError(null);
        const data = await fetchDoctors();
        console.log('Doctors data loaded:', data);
        setDoctors(data);
        const specialtiesList = getAllSpecialties(data);
        console.log('Extracted specialties:', specialtiesList);
        setSpecialties(specialtiesList);
      } catch (err) {
        console.error('Error loading doctors:', err);
        setError('Failed to load doctors. Please check your internet connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const filteredDoctors = applyFilters(doctors, filterState);
  console.log('Current doctors state:', doctors);
  console.log('Current filtered doctors:', filteredDoctors);

  const handleSearchQueryChange = (query: string) => {
    setFilterState(prev => ({ ...prev, searchQuery: query }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm py-4 sticky top-0 z-10 border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity group"
              onClick={() => {
                setFilterState({
                  searchQuery: '',
                  consultationType: '',
                  specialties: [],
                  sortBy: '',
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              role="link"
              aria-label="Go to homepage"
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Stethoscope size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                HealNet
              </span>
            </div>
          </div>
          <div className="mt-4 max-w-2xl mx-auto">
            <Autocomplete 
              doctors={doctors} 
              searchQuery={filterState.searchQuery} 
              setSearchQuery={handleSearchQueryChange}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 font-medium">Loading doctors...</p>
          </div>
        ) : error ? (
          <div className="max-w-xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl relative">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
              <button 
                onClick={() => window.location.reload()}
                className="mt-3 bg-red-100 text-red-800 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors inline-flex items-center gap-2 font-medium"
              >
                <RefreshCw size={16} />
                Retry
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1 md:sticky md:top-[5.5rem] md:h-[calc(100vh-5.5rem)]">
              <FilterPanel 
                specialties={specialties}
                filterState={filterState}
                setFilterState={setFilterState}
              />
            </div>
            <div className="md:col-span-3">
              <div className="mb-6 bg-white rounded-xl shadow-md p-4 border border-blue-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'} Found
                  </h2>
                  {filterState.searchQuery || filterState.consultationType || filterState.specialties.length > 0 || filterState.sortBy ? (
                    <button
                      onClick={() => setFilterState({
                        searchQuery: '',
                        consultationType: '',
                        specialties: [],
                        sortBy: '',
                      })}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      <X size={16} />
                      Clear Filters
                    </button>
                  ) : null}
                </div>
              </div>
              <DoctorsList doctors={filteredDoctors} />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-md py-6 border-t border-blue-100 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-1.5 rounded-lg">
                <Stethoscope size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text">
                HealNet
              </span>
            </div>
            <div className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} HealNet. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;