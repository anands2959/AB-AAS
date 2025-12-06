export interface NgoData {
  name: string;
  phoneNumber: string;
  dob: string;
  address: string;
  disabilityType: string;
  disabilityPercentage: string;
  maritalStatus: string;
  comments: string;
}

export async function fetchNgoData(): Promise<NgoData[]> {
  try {
    // Fetch data from MongoDB via our API route
    const response = await fetch('/api/beneficiaries');
    
    if (!response.ok) {
      // Handle the case where no data is found (404)
      if (response.status === 404) {
        const errorData = await response.json();
        if (errorData.message === 'No data found') {
          return []; // Return empty array when no data is found
        }
      }
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    throw error;
  }
}