import { db } from '@/config/firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';

export interface UserData {
  phoneNumber: string;
  fullName: string;
  dob: string;
  disabilityType: string;
  disabilityPercentage: string;
  gender?: string;
  alternateMobile?: string;
  pinCode?: string;
  state?: string;
  district?: string;
  address?: string;
  aadharNumber?: string;
  monthlyIncome?: string;
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Check if user exists by phone number
 */
export const checkUserExists = async (phoneNumber: string): Promise<boolean> => {
  try {
    const userRef = doc(db, 'users', phoneNumber);
    const userSnap = await getDoc(userRef);
    return userSnap.exists();
  } catch (error) {
    console.error('Error checking user existence:', error);
    throw error;
  }
};

/**
 * Get user data by phone number
 */
export const getUserData = async (phoneNumber: string): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'users', phoneNumber);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

/**
 * Create new user
 */
export const createUser = async (userData: UserData): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userData.phoneNumber);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Update existing user
 */
export const updateUser = async (phoneNumber: string, userData: Partial<UserData>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', phoneNumber);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Register or update user
 * If user exists, fetch and return their data
 * If user doesn't exist, create new user
 */
export const registerUser = async (userData: UserData): Promise<{ isNewUser: boolean; userData: UserData }> => {
  try {
    const exists = await checkUserExists(userData.phoneNumber);
    
    if (exists) {
      // User exists, fetch their data
      const existingData = await getUserData(userData.phoneNumber);
      return {
        isNewUser: false,
        userData: existingData || userData,
      };
    } else {
      // User doesn't exist, create new user
      await createUser(userData);
      return {
        isNewUser: true,
        userData,
      };
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
