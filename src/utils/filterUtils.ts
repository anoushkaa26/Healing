import { Doctor, FilterState } from '../types';

export const applyFilters = (doctors: Doctor[], filterState: FilterState): Doctor[] => {
  console.log('Applying filters with state:', filterState);
  let filteredDoctors = [...doctors];
  
  // Filter by search query
  if (filterState.searchQuery) {
    const searchLower = filterState.searchQuery.toLowerCase();
    filteredDoctors = filteredDoctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchLower)
    );
    console.log('After search filter:', filteredDoctors.length, 'doctors');
  }
  
  // Filter by consultation type
  if (filterState.consultationType) {
    filteredDoctors = filteredDoctors.filter(doctor => {
      if (!doctor.mode) return false;
      return doctor.mode.some(mode => 
        mode.toLowerCase() === filterState.consultationType.toLowerCase()
      );
    });
    console.log('After consultation filter:', filteredDoctors.length, 'doctors');
  }
  
  // Filter by specialties (multi-select)
  if (filterState.specialties.length > 0) {
    filteredDoctors = filteredDoctors.filter(doctor => 
      (doctor.specialty && filterState.specialties.some(specialty => 
        doctor.specialty.includes(specialty)
      )) ||
      (doctor.specialities?.some(specialty => 
        filterState.specialties.includes(specialty)
      ))
    );
    console.log('After specialty filter:', filteredDoctors.length, 'doctors');
  }
  
  // Sort doctors
  if (filterState.sortBy === 'fees') {
    filteredDoctors.sort((a, b) => {
      const feesA = a.fees || 0;
      const feesB = b.fees || 0;
      return feesA - feesB;
    });
    console.log('Sorted by fees (low to high)');
  } else if (filterState.sortBy === 'fees-desc') {
    filteredDoctors.sort((a, b) => {
      const feesA = a.fees || 0;
      const feesB = b.fees || 0;
      return feesB - feesA;
    });
    console.log('Sorted by fees (high to low)');
  } else if (filterState.sortBy === 'experience') {
    filteredDoctors.sort((a, b) => {
      const expA = a.experience || 0;
      const expB = b.experience || 0;
      return expB - expA;
    });
    console.log('Sorted by experience');
  }
  
  console.log('Final filtered doctors:', filteredDoctors);
  return filteredDoctors;
};

export const getSearchSuggestions = (doctors: Doctor[], searchQuery: string): Doctor[] => {
  if (!searchQuery) return [];
  
  const searchLower = searchQuery.toLowerCase();
  const matchingDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchLower)
  );
  
  return matchingDoctors.slice(0, 3);
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtySet = new Set<string>();
  
  doctors.forEach(doctor => {
    // Check specialty field
    if (doctor.specialty && Array.isArray(doctor.specialty)) {
      doctor.specialty.forEach(specialty => {
        if (specialty) specialtySet.add(specialty);
      });
    }
    // Check specialities field
    if (doctor.specialities && Array.isArray(doctor.specialities)) {
      doctor.specialities.forEach(specialty => {
        if (specialty) specialtySet.add(specialty);
      });
    }
  });
  
  return Array.from(specialtySet).sort();
};