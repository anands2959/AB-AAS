import { db } from '@/config/firebase';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';

export interface NotificationPayload {
  title: string;
  body: string;
  data?: any;
  type?: 'info' | 'success' | 'warning' | 'error';
}

/**
 * Send notification to a specific user by phone number
 */
export async function sendNotificationToUser(
  phoneNumber: string,
  notification: NotificationPayload
): Promise<string> {
  try {
    // Get user's push token
    const userRef = doc(db, 'users', phoneNumber);
    const userDoc = await getDocs(query(collection(db, 'users'), where('phoneNumber', '==', phoneNumber)));
    
    if (userDoc.empty) {
      throw new Error('User not found');
    }

    const userData = userDoc.docs[0].data();
    const pushTokens = userData.pushTokens || [];

    // Save notification to Firestore
    const notificationRef = await addDoc(collection(db, 'userNotifications'), {
      phoneNumber,
      title: notification.title,
      body: notification.body,
      data: notification.data || {},
      type: notification.type || 'info',
      isRead: false,
      createdAt: serverTimestamp(),
      targetType: 'specific', // Mark as targeted notification
    });

    // Send push notification to user's devices
    if (pushTokens.length > 0) {
      await sendPushNotifications(pushTokens, notification);
    }

    console.log(`✅ Notification sent to user ${phoneNumber}`);
    return notificationRef.id;
  } catch (error) {
    console.error('Error sending notification to user:', error);
    throw error;
  }
}

/**
 * Send notification to multiple specific users
 */
export async function sendNotificationToMultipleUsers(
  phoneNumbers: string[],
  notification: NotificationPayload
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  const batch = writeBatch(db);
  const pushTokens: string[] = [];

  try {
    // Get all users' push tokens
    for (const phoneNumber of phoneNumbers) {
      try {
        const userDoc = await getDocs(
          query(collection(db, 'users'), where('phoneNumber', '==', phoneNumber))
        );

        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          const userTokens = userData.pushTokens || [];
          pushTokens.push(...userTokens);

          // Add notification to Firestore
          const notificationRef = doc(collection(db, 'userNotifications'));
          batch.set(notificationRef, {
            phoneNumber,
            title: notification.title,
            body: notification.body,
            data: notification.data || {},
            type: notification.type || 'info',
            isRead: false,
            createdAt: serverTimestamp(),
            targetType: 'specific',
          });

          success++;
        } else {
          failed++;
        }
      } catch (error) {
        console.error(`Error processing user ${phoneNumber}:`, error);
        failed++;
      }
    }

    // Commit batch
    await batch.commit();

    // Send push notifications
    if (pushTokens.length > 0) {
      await sendPushNotifications(pushTokens, notification);
    }

    console.log(`✅ Notifications sent: ${success} success, ${failed} failed`);
    return { success, failed };
  } catch (error) {
    console.error('Error sending notifications to multiple users:', error);
    throw error;
  }
}

/**
 * Send notification to ALL users (broadcast)
 */
export async function sendBroadcastNotification(
  notification: NotificationPayload
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  try {
    // Get all users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const batch = writeBatch(db);
    const pushTokens: string[] = [];

    usersSnapshot.forEach((userDoc) => {
      try {
        const userData = userDoc.data();
        const phoneNumber = userData.phoneNumber;
        const userTokens = userData.pushTokens || [];
        pushTokens.push(...userTokens);

        // Add notification to Firestore for each user
        const notificationRef = doc(collection(db, 'userNotifications'));
        batch.set(notificationRef, {
          phoneNumber,
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          type: notification.type || 'info',
          isRead: false,
          createdAt: serverTimestamp(),
          targetType: 'broadcast', // Mark as broadcast notification
        });

        success++;
      } catch (error) {
        console.error('Error processing user:', error);
        failed++;
      }
    });

    // Commit batch (Firestore batch limit is 500, so we might need to split)
    const batchSize = 500;
    const batches = Math.ceil(success / batchSize);

    for (let i = 0; i < batches; i++) {
      await batch.commit();
    }

    // Send push notifications
    if (pushTokens.length > 0) {
      await sendPushNotifications(pushTokens, notification);
    }

    console.log(`✅ Broadcast notification sent to ${success} users`);
    return { success, failed };
  } catch (error) {
    console.error('Error sending broadcast notification:', error);
    throw error;
  }
}

/**
 * Send notification to users by disability type
 */
export async function sendNotificationByDisabilityType(
  disabilityType: string,
  notification: NotificationPayload
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  try {
    // Get users with specific disability type
    const usersQuery = query(
      collection(db, 'users'),
      where('disabilityType', '==', disabilityType)
    );
    const usersSnapshot = await getDocs(usersQuery);

    const batch = writeBatch(db);
    const pushTokens: string[] = [];

    usersSnapshot.forEach((userDoc) => {
      try {
        const userData = userDoc.data();
        const phoneNumber = userData.phoneNumber;
        const userTokens = userData.pushTokens || [];
        pushTokens.push(...userTokens);

        // Add notification to Firestore
        const notificationRef = doc(collection(db, 'userNotifications'));
        batch.set(notificationRef, {
          phoneNumber,
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          type: notification.type || 'info',
          isRead: false,
          createdAt: serverTimestamp(),
          targetType: 'filtered', // Mark as filtered notification
          filterCriteria: { disabilityType },
        });

        success++;
      } catch (error) {
        console.error('Error processing user:', error);
        failed++;
      }
    });

    // Commit batch
    await batch.commit();

    // Send push notifications
    if (pushTokens.length > 0) {
      await sendPushNotifications(pushTokens, notification);
    }

    console.log(`✅ Notification sent to ${success} users with ${disabilityType}`);
    return { success, failed };
  } catch (error) {
    console.error('Error sending notification by disability type:', error);
    throw error;
  }
}

/**
 * Send notification to users by state
 */
export async function sendNotificationByState(
  state: string,
  notification: NotificationPayload
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  try {
    // Get users from specific state
    const usersQuery = query(
      collection(db, 'users'),
      where('state', '==', state)
    );
    const usersSnapshot = await getDocs(usersQuery);

    const batch = writeBatch(db);
    const pushTokens: string[] = [];

    usersSnapshot.forEach((userDoc) => {
      try {
        const userData = userDoc.data();
        const phoneNumber = userData.phoneNumber;
        const userTokens = userData.pushTokens || [];
        pushTokens.push(...userTokens);

        // Add notification to Firestore
        const notificationRef = doc(collection(db, 'userNotifications'));
        batch.set(notificationRef, {
          phoneNumber,
          title: notification.title,
          body: notification.body,
          data: notification.data || {},
          type: notification.type || 'info',
          isRead: false,
          createdAt: serverTimestamp(),
          targetType: 'filtered',
          filterCriteria: { state },
        });

        success++;
      } catch (error) {
        console.error('Error processing user:', error);
        failed++;
      }
    });

    // Commit batch
    await batch.commit();

    // Send push notifications
    if (pushTokens.length > 0) {
      await sendPushNotifications(pushTokens, notification);
    }

    console.log(`✅ Notification sent to ${success} users in ${state}`);
    return { success, failed };
  } catch (error) {
    console.error('Error sending notification by state:', error);
    throw error;
  }
}

/**
 * Helper function to send push notifications via Expo Push API
 */
async function sendPushNotifications(
  pushTokens: string[],
  notification: NotificationPayload
): Promise<void> {
  try {
    const messages = pushTokens.map((token) => ({
      to: token,
      sound: 'default',
      title: notification.title,
      body: notification.body,
      data: notification.data || {},
    }));

    // Send in chunks of 100 (Expo's limit)
    const chunkSize = 100;
    for (let i = 0; i < messages.length; i += chunkSize) {
      const chunk = messages.slice(i, i + chunkSize);
      
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chunk),
      });

      if (!response.ok) {
        console.error('Error sending push notifications:', await response.text());
      }
    }

    console.log(`✅ Push notifications sent to ${pushTokens.length} devices`);
  } catch (error) {
    console.error('Error sending push notifications:', error);
  }
}

/**
 * Schedule a notification for future delivery
 */
export async function scheduleNotification(
  phoneNumber: string,
  notification: NotificationPayload,
  scheduledTime: Date
): Promise<string> {
  try {
    const notificationRef = await addDoc(collection(db, 'scheduledNotifications'), {
      phoneNumber,
      title: notification.title,
      body: notification.body,
      data: notification.data || {},
      type: notification.type || 'info',
      scheduledTime,
      status: 'pending',
      createdAt: serverTimestamp(),
    });

    console.log(`✅ Notification scheduled for ${scheduledTime}`);
    return notificationRef.id;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    throw error;
  }
}
