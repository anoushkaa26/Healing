import { useCallback, useEffect, useRef } from 'react';
import { FilterState } from '../types';

export const useUrlParams = (
  filterState: FilterState,
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
) => {
  const isInitialLoad = useRef(true);
  const isUpdatingFromUrl = useRef(false);

  // Update URL when filters change
  useEffect(() => {
    if (isUpdatingFromUrl.current) {
      isUpdatingFromUrl.current = false;
      return;
    }

    const params = new URLSearchParams();
    
    if (filterState.searchQuery) {
      params.set('search', filterState.searchQuery);
    }
    
    if (filterState.consultationType) {
      params.set('consultation', filterState.consultationType);
    }
    
    if (filterState.specialties.length > 0) {
      params.set('specialties', filterState.specialties.join(','));
    }
    
    if (filterState.sortBy) {
      params.set('sortBy', filterState.sortBy);
    }
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }, [filterState]);

  // Load filters from URL on initial render
  const loadFiltersFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilterState: FilterState = {
      searchQuery: '',
      consultationType: '',
      specialties: [],
      sortBy: ''
    };
    
    if (params.has('search')) {
      newFilterState.searchQuery = params.get('search') || '';
    }
    
    if (params.has('consultation')) {
      newFilterState.consultationType = params.get('consultation') || '';
    }
    
    if (params.has('specialties')) {
      const specialtiesParam = params.get('specialties') || '';
      newFilterState.specialties = specialtiesParam ? specialtiesParam.split(',') : [];
    }
    
    if (params.has('sortBy')) {
      const sortByParam = params.get('sortBy');
      if (sortByParam === 'fees' || sortByParam === 'fees-desc' || sortByParam === 'experience') {
        newFilterState.sortBy = sortByParam;
      }
    }
    
    isUpdatingFromUrl.current = true;
    setFilterState(newFilterState);
  }, [setFilterState]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      loadFiltersFromUrl();
    };

    window.addEventListener('popstate', handlePopState);
    
    // Load filters from URL on initial render
    if (isInitialLoad.current) {
      loadFiltersFromUrl();
      isInitialLoad.current = false;
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [loadFiltersFromUrl]);
};