export interface Doctor {
  id: string;
  name: string;
  nameInitials?: string;
  photo?: string;
  specialty: string[];
  specialities?: string[];
  experience: number;
  fees: number;
  mode: string[];
  consultationType: string;
  clinic?: {
    name: string;
    address: string;
    locality?: string;
    city?: string;
  };
  phone?: string;
  availability?: {
    days: string;
    hours: string;
  };
  rating?: number;
  reviewCount?: number;
}

export interface FilterState {
  searchQuery: string;
  consultationType: string;
  specialties: string[];
  sortBy: string;
}

export interface DoctorProfileModalProps {
  doctor: Doctor;
  onClose: () => void;
}