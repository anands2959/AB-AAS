import { db } from '@/config/firebase';
import { 
  collection, 
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore';

export interface SupportQuery {
  id?: string;
  phoneNumber?: string;
  message: string;
  status: 'pending' | 'in-progress' | 'resolved';
  createdAt?: any;
  updatedAt?: any;
  resolvedAt?: any;
  response?: string;
}

/**
 * Submit a new support query
 */
export const submitSupportQuery = async (
  phoneNumber: string | undefined,
  message: string
): Promise<string> => {
  try {
    const queryData: SupportQuery = {
      phoneNumber: phoneNumber || 'anonymous',
      message,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'supportQueries'), queryData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting support query:', error);
    throw error;
  }
};

/**
 * Get all support queries for a user
 */
export const getUserSupportQueries = async (
  phoneNumber: string
): Promise<SupportQuery[]> => {
  try {
    const q = query(
      collection(db, 'supportQueries'),
      where('phoneNumber', '==', phoneNumber),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const queries: SupportQuery[] = [];

    querySnapshot.forEach((doc) => {
      queries.push({
        id: doc.id,
        ...doc.data(),
      } as SupportQuery);
    });

    return queries;
  } catch (error) {
    console.error('Error getting user support queries:', error);
    throw error;
  }
};
