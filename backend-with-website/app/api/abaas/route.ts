import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - Fetch all beneficiaries or a single beneficiary by ID
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('asaas');
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // If ID is provided, fetch single beneficiary
    if (id) {
      const beneficiary = await db
        .collection('beneficiaries')
        .findOne({ _id: new ObjectId(id) });

      if (!beneficiary) {
        return NextResponse.json(
          { success: false, error: 'Beneficiary not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          id: beneficiary._id.toString(),
          name: beneficiary.name || '',
          phoneNumber: beneficiary.phoneNumber || '',
          dob: beneficiary.dob || '',
          address: beneficiary.address || '',
          disabilityType: beneficiary.disabilityType || '',
          disabilityPercentage: beneficiary.disabilityPercentage || '',
          maritalStatus: beneficiary.maritalStatus || '',
          comments: beneficiary.comments || '',
        },
      });
    }

    // Fetch all beneficiaries
    const beneficiaries = await db
      .collection('beneficiaries')
      .find({})
      .toArray();

    const formattedData = beneficiaries.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name || '',
      phoneNumber: doc.phoneNumber || '',
      dob: doc.dob || '',
      address: doc.address || '',
      disabilityType: doc.disabilityType || '',
      disabilityPercentage: doc.disabilityPercentage || '',
      maritalStatus: doc.maritalStatus || '',
      comments: doc.comments || '',
    }));

    return NextResponse.json({
      success: true,
      count: formattedData.length,
      data: formattedData,
    });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// POST - Create a new beneficiary
export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('asaas');
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.phoneNumber) {
      return NextResponse.json(
        { success: false, error: 'Name and phone number are required' },
        { status: 400 }
      );
    }

    const newBeneficiary = {
      name: body.name,
      phoneNumber: body.phoneNumber,
      dob: body.dob || '',
      address: body.address || '',
      disabilityType: body.disabilityType || '',
      disabilityPercentage: body.disabilityPercentage || '',
      maritalStatus: body.maritalStatus || '',
      comments: body.comments || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('beneficiaries').insertOne(newBeneficiary);

    return NextResponse.json(
      {
        success: true,
        message: 'Beneficiary created successfully',
        data: {
          id: result.insertedId.toString(),
          ...newBeneficiary,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create beneficiary' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing beneficiary
export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('asaas');
    const body = await request.json();

    // Validate ID
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Beneficiary ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only update fields that are provided
    if (body.name !== undefined) updateData.name = body.name;
    if (body.phoneNumber !== undefined) updateData.phoneNumber = body.phoneNumber;
    if (body.dob !== undefined) updateData.dob = body.dob;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.disabilityType !== undefined) updateData.disabilityType = body.disabilityType;
    if (body.disabilityPercentage !== undefined) updateData.disabilityPercentage = body.disabilityPercentage;
    if (body.maritalStatus !== undefined) updateData.maritalStatus = body.maritalStatus;
    if (body.comments !== undefined) updateData.comments = body.comments;

    const result = await db
      .collection('beneficiaries')
      .updateOne({ _id: new ObjectId(body.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Beneficiary not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Beneficiary updated successfully',
      data: { id: body.id, ...updateData },
    });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update beneficiary' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a beneficiary
export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('asaas');
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Beneficiary ID is required' },
        { status: 400 }
      );
    }

    const result = await db
      .collection('beneficiaries')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Beneficiary not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Beneficiary deleted successfully',
    });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete beneficiary' },
      { status: 500 }
    );
  }
}
