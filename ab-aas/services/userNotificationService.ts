import { db } from '@/config/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  getDocs,
  writeBatch,
} from 'firebase/firestore';

export interface UserNotification {
  id: string;
  phoneNumber: string;
  title: string;
  body: string;
  data?: any;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Timestamp;
  readAt?: Timestamp;
  targetType?: 'specific' | 'broadcast' | 'filtered'; // Type of notification
  filterCriteria?: any; // Criteria used for filtered notifications
}

/**
 * Save notification to Firestore when received
 */
export async function saveNotificationToFirestore(
  phoneNumber: string,
  title: string,
  body: string,
  data?: any,
  type: 'info' | 'success' | 'warning' | 'error' = 'info'
): Promise<string> {
  try {
    const notificationRef = await addDoc(collection(db, 'userNotifications'), {
      phoneNumber,
      title,
      body,
      data: data || {},
      type,
      isRead: false,
      createdAt: serverTimestamp(),
    });
    
    console.log('Notification saved to Firestore:', notificationRef.id);
    return notificationRef.id;
  } catch (error) {
    console.error('Error saving notification:', error);
    throw error;
  }
}

/**
 * Get all notifications for a user
 */
export function subscribeToUserNotifications(
  phoneNumber: string,
  callback: (notifications: UserNotification[]) => void
): () => void {
  // Query without orderBy to avoid index requirement
  // We'll sort on the client side instead
  const q = query(
    collection(db, 'userNotifications'),
    where('phoneNumber', '==', phoneNumber)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const notifications: UserNotification[] = [];
      snapshot.forEach((doc) => {
        notifications.push({
          id: doc.id,
          ...doc.data(),
        } as UserNotification);
      });
      
      // Sort by createdAt on client side (newest first)
      notifications.sort((a, b) => {
        const aTime = a.createdAt?.toMillis?.() || 0;
        const bTime = b.createdAt?.toMillis?.() || 0;
        return bTime - aTime;
      });
      
      callback(notifications);
    },
    (error) => {
      console.error('Error fetching notifications:', error);
      callback([]);
    }
  );

  return unsubscribe;
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    const notificationRef = doc(db, 'userNotifications', notificationId);
    await updateDoc(notificationRef, {
      isRead: true,
      readAt: serverTimestamp(),
    });
    console.log('Notification marked as read:', notificationId);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
}

/**
 * Mark all notifications as read for a user
 */
export async function markAllNotificationsAsRead(phoneNumber: string): Promise<void> {
  try {
    const q = query(
      collection(db, 'userNotifications'),
      where('phoneNumber', '==', phoneNumber),
      where('isRead', '==', false)
    );

    const snapshot = await getDocs(q);
    const batch = writeBatch(db);

    snapshot.forEach((document) => {
      batch.update(document.ref, {
        isRead: true,
        readAt: serverTimestamp(),
      });
    });

    await batch.commit();
    console.log('All notifications marked as read');
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
}

/**
 * Get unread notification count
 */
export async function getUnreadNotificationCount(phoneNumber: string): Promise<number> {
  try {
    const q = query(
      collection(db, 'userNotifications'),
      where('phoneNumber', '==', phoneNumber),
      where('isRead', '==', false)
    );

    const snapshot = await getDocs(q);
    return snapshot.size;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}

/**
 * Subscribe to unread notification count
 */
export function subscribeToUnreadCount(
  phoneNumber: string,
  callback: (count: number) => void
): () => void {
  const q = query(
    collection(db, 'userNotifications'),
    where('phoneNumber', '==', phoneNumber),
    where('isRead', '==', false)
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.size);
    },
    (error) => {
      console.error('Error subscribing to unread count:', error);
      callback(0);
    }
  );

  return unsubscribe;
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string): Promise<void> {
  try {
    const notificationRef = doc(db, 'userNotifications', notificationId);
    await updateDoc(notificationRef, {
      isRead: true,
      readAt: serverTimestamp(),
    });
    console.log('Notification deleted:', notificationId);
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
}
