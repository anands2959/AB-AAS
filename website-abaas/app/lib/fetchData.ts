import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface AppliedBenefit {
  applicationId: string;
  appliedAt: string;
  benefitId: string;
  benefitTitle: string;
  status: string;
}

export interface NgoData {
  id?: string;
  fullName: string;
  phoneNumber: string;
  alternateMobile?: string;
  dob: string;
  gender: string;
  aadharNumber?: string;
  address: string;
  district: string;
  state: string;
  pinCode?: string;
  disabilityType: string;
  disabilityPercentage: string;
  monthlyIncome?: string;
  appliedBenefits?: AppliedBenefit[];
  pushTokens?: string[];
  createdAt?: any;
  updatedAt?: any;
  lastTokenUpdate?: any;
}

export async function fetchNgoData(): Promise<NgoData[]> {
  try {
    console.log('🔍 Fetching data from Firestore...');
    const beneficiariesRef = collection(db, 'users');
    const querySnapshot = await getDocs(beneficiariesRef);
    
    console.log(`📊 Found ${querySnapshot.size} documents in Firestore`);
    
    const data: NgoData[] = [];
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      console.log('📄 Document data:', doc.id, docData);
      data.push({
        id: doc.id,
        fullName: docData.fullName || '',
        phoneNumber: docData.phoneNumber || '',
        alternateMobile: docData.alternateMobile || '',
        dob: docData.dob || '',
        gender: docData.gender || '',
        aadharNumber: docData.aadharNumber || '',
        address: docData.address || '',
        district: docData.district || '',
        state: docData.state || '',
        pinCode: docData.pinCode || '',
        disabilityType: docData.disabilityType || '',
        disabilityPercentage: docData.disabilityPercentage || '',
        monthlyIncome: docData.monthlyIncome || '',
        appliedBenefits: docData.appliedBenefits || [],
        pushTokens: docData.pushTokens || [],
        createdAt: docData.createdAt,
        updatedAt: docData.updatedAt,
        lastTokenUpdate: docData.lastTokenUpdate,
      });
    });
    
    console.log(`✅ Successfully fetched ${data.length} beneficiaries`);
    return data;
  } catch (error) {
    console.error('❌ Error fetching data from Firebase:', error);
    throw error;
  }
}