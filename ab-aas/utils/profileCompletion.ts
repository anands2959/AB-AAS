import { UserData } from '@/services/userService';

/**
 * Calculate profile completion percentage
 * @param userData - User data object
 * @returns Completion percentage (0-100)
 */
export const calculateProfileCompletion = (userData: UserData | null): number => {
  if (!userData) return 0;

  // Define all profile fields with their weights
  const fields = [
    // Required fields from registration (5 fields)
    { key: 'fullName', weight: 1 },
    { key: 'dob', weight: 1 },
    { key: 'phoneNumber', weight: 1 },
    { key: 'disabilityType', weight: 1 },
    { key: 'disabilityPercentage', weight: 1 },
    
    // Additional profile fields (8 fields)
    { key: 'gender', weight: 1 },
    { key: 'alternateMobile', weight: 1 },
    { key: 'pinCode', weight: 1 },
    { key: 'state', weight: 1 },
    { key: 'district', weight: 1 },
    { key: 'address', weight: 1 },
    { key: 'aadharNumber', weight: 1 },
    { key: 'monthlyIncome', weight: 1 },
  ];

  // Calculate filled fields
  let filledCount = 0;
  let totalWeight = 0;

  fields.forEach(field => {
    totalWeight += field.weight;
    const value = userData[field.key as keyof UserData];
    if (value && value !== '') {
      filledCount += field.weight;
    }
  });

  // Calculate percentage
  const percentage = Math.round((filledCount / totalWeight) * 100);
  return percentage;
};

/**
 * Get profile completion status message
 * @param percentage - Completion percentage
 * @returns Status message
 */
export const getProfileCompletionStatus = (percentage: number): string => {
  if (percentage === 100) return 'Complete';
  if (percentage >= 75) return 'Almost Done';
  if (percentage >= 50) return 'Half Way';
  if (percentage >= 25) return 'Getting Started';
  return 'Just Started';
};

/**
 * Get profile completion color
 * @param percentage - Completion percentage
 * @returns Color hex code
 */
export const getProfileCompletionColor = (percentage: number): string => {
  if (percentage === 100) return '#4CAF50'; // Green
  if (percentage >= 75) return '#8BC34A'; // Light Green
  if (percentage >= 50) return '#FFC107'; // Amber
  if (percentage >= 25) return '#FF9800'; // Orange
  return '#FF5722'; // Deep Orange
};

/**
 * Get missing profile fields
 * @param userData - User data object
 * @returns Array of missing field names
 */
export const getMissingFields = (userData: UserData | null): string[] => {
  if (!userData) return [];

  const fieldLabels: { [key: string]: string } = {
    fullName: 'Full Name',
    dob: 'Date of Birth',
    phoneNumber: 'Phone Number',
    disabilityType: 'Disability Type',
    disabilityPercentage: 'Disability Percentage',
    gender: 'Gender',
    alternateMobile: 'Alternate Mobile',
    pinCode: 'PIN Code',
    state: 'State',
    district: 'District',
    address: 'Address',
    aadharNumber: 'Aadhar Number',
    monthlyIncome: 'Monthly Income',
  };

  const missingFields: string[] = [];

  Object.keys(fieldLabels).forEach(key => {
    const value = userData[key as keyof UserData];
    if (!value || value === '') {
      missingFields.push(fieldLabels[key]);
    }
  });

  return missingFields;
};
