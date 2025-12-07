import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, message, imageUrl, userId } = await request.json();

    if (!title || !message) {
      return NextResponse.json(
        { success: false, error: 'Title and message are required' },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const messaging = getMessaging();

    // Get push tokens
    let tokens: string[] = [];

    if (userId) {
      // Send to specific user
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      tokens = userData?.pushTokens || [];
    } else {
      // Send to all users
      const usersSnapshot = await db.collection('users').get();
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.pushTokens && Array.isArray(userData.pushTokens)) {
          tokens.push(...userData.pushTokens);
        }
      });
    }

    // Remove duplicates
    tokens = [...new Set(tokens)];

    if (tokens.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No push tokens found' },
        { status: 404 }
      );
    }

    // Prepare notification payload
    const payload: any = {
      notification: {
        title,
        body: message,
      },
      data: {
        title,
        message,
        timestamp: new Date().toISOString(),
      },
    };

    if (imageUrl) {
      payload.notification.imageUrl = imageUrl;
      payload.data.imageUrl = imageUrl;
    }

    // Send notifications
    const results = await messaging.sendEachForMulticast({
      tokens,
      ...payload,
    });

    console.log(`Successfully sent ${results.successCount} notifications`);
    console.log(`Failed to send ${results.failureCount} notifications`);

    return NextResponse.json({
      success: true,
      sentCount: results.successCount,
      failedCount: results.failureCount,
      totalTokens: tokens.length,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
