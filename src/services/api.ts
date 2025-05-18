import { Doctor } from '../types';

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    console.log('Fetching doctors data...');
    const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
    
    if (!response.ok) {
      console.error('API response not OK:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API data length:', data.length);
    
    if (!Array.isArray(data)) {
      console.error('Invalid data format:', data);
      throw new Error('Invalid data format received from API');
    }
    
    const validatedData = data.map(doctor => {
      // Extract specialties from the specialities array
      const specialties = Array.isArray(doctor.specialities) 
        ? doctor.specialities.map((s: any) => s.name || s).filter(Boolean)
        : ['General Medicine'];
      
      // Format doctor introduction
      let formattedIntroduction = doctor.doctor_introduction || doctor.doctorIntroduction;
      if (formattedIntroduction) {
        // Remove any existing "Dr." prefix to avoid duplication
        formattedIntroduction = formattedIntroduction.replace(/^Dr\.\s+/i, '');
        // Add proper formatting
        formattedIntroduction = `Dr. ${doctor.name}, ${doctor.qualification || 'BDS'}, has an Experience of ${doctor.experience} years`;
        
        // Add education if available
        if (doctor.education) {
          formattedIntroduction += `, Graduated from ${doctor.education}`;
        }
        
        // Add clinic information if available
        if (doctor.clinic?.name && doctor.clinic?.address?.locality && doctor.clinic?.address?.city) {
          formattedIntroduction += `, currently practising in ${doctor.clinic.name}, ${doctor.clinic.address.locality}, ${doctor.clinic.address.city}`;
        }
      }
      
      console.log('Processing doctor:', doctor.name, 'Specialties:', specialties);
      
      return {
        id: doctor.id || Math.random(),
        name: doctor.name || 'Unknown Doctor',
        nameInitials: doctor.name_initials || doctor.nameInitials,
        photo: doctor.photo,
        doctorIntroduction: formattedIntroduction,
        specialty: specialties,
        specialities: specialties,
        experience: Number(doctor.experience?.replace(/[^0-9]/g, '') || 0),
        fees: Number(doctor.fees?.replace(/[^0-9]/g, '') || 500),
        languages: Array.isArray(doctor.languages) ? doctor.languages : undefined,
        clinic: doctor.clinic ? {
          name: doctor.clinic.name || '',
          address: doctor.clinic.address?.address_line1 || '',
          locality: doctor.clinic.address?.locality || '',
          city: doctor.clinic.address?.city || '',
          addressLine1: doctor.clinic.address?.address_line1 || '',
          location: doctor.clinic.address?.location ? {
            lat: Number(doctor.clinic.address.location.split(',')[1]),
            lng: Number(doctor.clinic.address.location.split(',')[0])
          } : { lat: 0, lng: 0 },
          logoUrl: doctor.clinic.address?.logo_url || doctor.clinic.logoUrl
        } : undefined,
        mode: [
          ...(doctor.video_consult ? ['Video Consult'] : []),
          ...(doctor.in_clinic ? ['In Clinic'] : [])
        ]
      };
    });

    console.log('Validated doctors count:', validatedData.length);
    return validatedData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};