import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();

    if (!pin) {
      return NextResponse.json(
        { success: false, error: 'PIN is required' },
        { status: 400 }
      );
    }

    // Get PIN from environment variable
    const correctPin = process.env.ADMIN_PIN;

    if (!correctPin) {
      console.error('ADMIN_PIN not set in environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify PIN
    if (pin === correctPin) {
      return NextResponse.json({
        success: true,
        message: 'Authentication successful',
      });
    } else {
      // Log failed attempt (optional - for security monitoring)
      console.warn('Failed PIN attempt:', {
        timestamp: new Date().toISOString(),
        ip: request.headers.get('x-forwarded-for') || 'unknown',
      });

      return NextResponse.json(
        { success: false, error: 'Invalid PIN' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('PIN verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
