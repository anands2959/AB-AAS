import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

// POST - Register or fetch existing beneficiary
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('asaas');
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.phoneNumber || !body.dob || !body.disabilityType || !body.disabilityPercentage) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required: name, phoneNumber, dob, disabilityType, disabilityPercentage',
        },
        { status: 400 }
      );
    }

    // Check if user already exists by phone number
    const existingBeneficiary = await db
      .collection('beneficiaries')
      .findOne({ phoneNumber: body.phoneNumber });

    // If user exists, return their details
    if (existingBeneficiary) {
      return NextResponse.json({
        success: true,
        message: 'User already registered',
        userExists: true,
        data: {
          id: existingBeneficiary._id.toString(),
          name: existingBeneficiary.name || '',
          phoneNumber: existingBeneficiary.phoneNumber || '',
          dob: existingBeneficiary.dob || '',
          address: existingBeneficiary.address || '',
          disabilityType: existingBeneficiary.disabilityType || '',
          disabilityPercentage: existingBeneficiary.disabilityPercentage || '',
          maritalStatus: existingBeneficiary.maritalStatus || '',
          comments: existingBeneficiary.comments || '',
          registeredAt: existingBeneficiary.createdAt || null,
        },
      });
    }

    // User doesn't exist, create new registration
    const newBeneficiary = {
      name: body.name,
      phoneNumber: body.phoneNumber,
      dob: body.dob,
      disabilityType: body.disabilityType,
      disabilityPercentage: body.disabilityPercentage,
      address: body.address || '',
      maritalStatus: body.maritalStatus || '',
      comments: body.comments || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('beneficiaries').insertOne(newBeneficiary);

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        userExists: false,
        data: {
          id: result.insertedId.toString(),
          name: newBeneficiary.name,
          phoneNumber: newBeneficiary.phoneNumber,
          dob: newBeneficiary.dob,
          address: newBeneficiary.address,
          disabilityType: newBeneficiary.disabilityType,
          disabilityPercentage: newBeneficiary.disabilityPercentage,
          maritalStatus: newBeneficiary.maritalStatus,
          comments: newBeneficiary.comments,
          registeredAt: newBeneficiary.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
