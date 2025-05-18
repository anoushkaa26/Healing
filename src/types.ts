import React from 'react';

export interface FilterState {
  searchQuery: string;
  consultationType: string;
  specialties: string[];
  sortBy: string;
}

export interface FilterPanelProps {
  specialties: string[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
} 