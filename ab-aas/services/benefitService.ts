import { db } from '@/config/firebase';
import { 
  collection, 
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  serverTimestamp,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export interface BenefitApplication {
  id?: string;
  phoneNumber: string;
  benefitId: string;
  benefitTitle: string;
  benefitCategory: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt?: any;
  updatedAt?: any;
  approvedAt?: any;
  rejectedAt?: any;
  remarks?: string;
}

/**
 * Apply for a benefit
 * Saves application to benefitApplications collection
 * Also updates user's appliedBenefits array
 */
export const applyForBenefit = async (
  phoneNumber: string,
  benefitId: string,
  benefitTitle: string,
  benefitCategory: string
): Promise<string> => {
  try {
    // Check if user already applied for this benefit
    const existingApplication = await checkExistingApplication(phoneNumber, benefitId);
    
    if (existingApplication) {
      throw new Error('You have already applied for this benefit');
    }

    // Create benefit application
    const applicationData: BenefitApplication = {
      phoneNumber,
      benefitId,
      benefitTitle,
      benefitCategory,
      status: 'pending',
      appliedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'benefitApplications'), applicationData);

    // Update user's appliedBenefits array
    const userRef = doc(db, 'users', phoneNumber);
    await updateDoc(userRef, {
      appliedBenefits: arrayUnion({
        benefitId,
        benefitTitle,
        applicationId: docRef.id,
        appliedAt: new Date().toISOString(),
        status: 'pending',
      }),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error applying for benefit:', error);
    throw error;
  }
};

/**
 * Check if user already applied for a specific benefit
 */
export const checkExistingApplication = async (
  phoneNumber: string,
  benefitId: string
): Promise<boolean> => {
  try {
    const q = query(
      collection(db, 'benefitApplications'),
      where('phoneNumber', '==', phoneNumber),
      where('benefitId', '==', benefitId)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking existing application:', error);
    return false;
  }
};

/**
 * Get all benefit applications for a user
 */
export const getUserBenefitApplications = async (
  phoneNumber: string
): Promise<BenefitApplication[]> => {
  try {
    const q = query(
      collection(db, 'benefitApplications'),
      where('phoneNumber', '==', phoneNumber)
    );

    const querySnapshot = await getDocs(q);
    const applications: BenefitApplication[] = [];

    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      } as BenefitApplication);
    });

    return applications;
  } catch (error) {
    console.error('Error getting user benefit applications:', error);
    throw error;
  }
};

/**
 * Get user's applied benefits from user document
 */
export const getUserAppliedBenefits = async (
  phoneNumber: string
): Promise<string[]> => {
  try {
    const userRef = doc(db, 'users', phoneNumber);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const appliedBenefits = userData.appliedBenefits || [];
      return appliedBenefits.map((benefit: any) => benefit.benefitId);
    }

    return [];
  } catch (error) {
    console.error('Error getting user applied benefits:', error);
    return [];
  }
};
