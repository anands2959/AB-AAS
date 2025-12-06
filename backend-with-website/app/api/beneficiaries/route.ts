import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('asaas'); // Database name from your connection string
    
    // Fetch all documents from the beneficiaries collection
    const beneficiaries = await db
      .collection('beneficiaries')
      .find({})
      .toArray();

    // Transform MongoDB documents to match your NgoData interface
    const formattedData = beneficiaries.map((doc) => ({
      name: doc.name || '',
      phoneNumber: doc.phoneNumber || '',
      dob: doc.dob || '',
      address: doc.address || '',
      disabilityType: doc.disabilityType || '',
      disabilityPercentage: doc.disabilityPercentage || '',
      maritalStatus: doc.maritalStatus || '',
      comments: doc.comments || '',
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('MongoDB Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from MongoDB' },
      { status: 500 }
    );
  }
}
