import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Doctor } from '../types';

interface AutocompleteProps {
  doctors: Doctor[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  doctors,
  searchQuery,
  setSearchQuery,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const suggestions = doctors
    .filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full px-4 py-3 pl-12 pr-10 bg-white rounded-xl border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800 placeholder-gray-400"
          placeholder="Search doctors by name or specialty..."
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showSuggestions && searchQuery && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden z-20"
        >
          {suggestions.map((doctor) => (
            <button
              key={doctor.id}
              className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 group"
              onClick={() => {
                setSearchQuery(doctor.name);
                setShowSuggestions(false);
              }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                {doctor.nameInitials || doctor.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-gray-900">{doctor.name}</div>
                <div className="text-sm text-gray-500">
                  {doctor.specialty.slice(0, 2).join(', ')}
                  {doctor.specialty.length > 2 && '...'}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;