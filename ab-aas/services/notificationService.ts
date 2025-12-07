import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { db } from '@/config/firebase';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

// Check if we're in Expo Go (which doesn't support push notifications in SDK 53+)
const isExpoGo = Constants.executionEnvironment === 'storeClient';

// Conditionally import expo-notifications only if not in Expo Go
let Notifications: any = null;
let Device: any = null;

if (!isExpoGo) {
  // Only import in standalone builds
  Notifications = require('expo-notifications');
  Device = require('expo-device');
  
  // Configure notification behavior
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  } catch (error) {
    console.warn('Could not set notification handler:', error);
  }
} else {
  // Suppress the warning by not importing in Expo Go
  console.log('📱 Running in Expo Go - Push notifications disabled');
  console.log('💡 Build with EAS to test notifications');
}

/**
 * Register for push notifications and get Expo Push Token
 */
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  // Check if running in Expo Go or if Notifications is not available
  if (isExpoGo || !Notifications || !Device) {
    console.log('📱 Push notifications not available in Expo Go');
    return undefined;
  }

  let token;

  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    } catch (error) {
      console.warn('Could not set notification channel:', error);
    }
  }

  if (Device.isDevice) {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      
      const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
      
      if (!projectId) {
        console.log('Project ID not found');
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log('✅ Push token:', token);
    } catch (error) {
      console.error('Error getting push token:', error);
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
}

/**
 * Save push token to user's Firebase document
 */
export async function savePushTokenToFirebase(
  phoneNumber: string,
  pushToken: string
): Promise<void> {
  try {
    const userRef = doc(db, 'users', phoneNumber);
    await updateDoc(userRef, {
      pushTokens: arrayUnion(pushToken),
      lastTokenUpdate: serverTimestamp(),
    });
    console.log('Push token saved to Firebase');
  } catch (error) {
    console.error('Error saving push token:', error);
    throw error;
  }
}

/**
 * Schedule a local notification (for testing)
 */
export async function scheduleLocalNotification(
  title: string,
  body: string,
  data?: any,
  seconds: number = 1
): Promise<string> {
  if (!Notifications) {
    console.log('Notifications not available');
    return '';
  }
  
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: { 
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds 
    },
  });
  
  return notificationId;
}

/**
 * Cancel all scheduled notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  if (!Notifications) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Get notification permissions status
 */
export async function getNotificationPermissions(): Promise<any> {
  if (!Notifications) return { status: 'undetermined' };
  return await Notifications.getPermissionsAsync();
}

/**
 * Add notification received listener
 */
export function addNotificationReceivedListener(
  callback: (notification: any) => void
): any | null {
  if (isExpoGo || !Notifications) {
    return null;
  }
  try {
    return Notifications.addNotificationReceivedListener(callback);
  } catch (error) {
    console.warn('Could not add notification listener:', error);
    return null;
  }
}

/**
 * Add notification response listener (when user taps notification)
 */
export function addNotificationResponseListener(
  callback: (response: any) => void
): any | null {
  if (isExpoGo || !Notifications) {
    return null;
  }
  try {
    return Notifications.addNotificationResponseReceivedListener(callback);
  } catch (error) {
    console.warn('Could not add notification response listener:', error);
    return null;
  }
}

/**
 * Remove notification listener
 */
export function removeNotificationSubscription(
  subscription: any | null
): void {
  if (subscription) {
    try {
      subscription.remove();
    } catch (error) {
      console.warn('Could not remove notification subscription:', error);
    }
  }
}

/**
 * Send notification to specific user (via Firebase Cloud Function)
 * Note: This requires a Firebase Cloud Function to be set up
 */
export interface NotificationPayload {
  to: string; // Expo push token
  title: string;
  body: string;
  data?: any;
  sound?: string;
  badge?: number;
  channelId?: string;
}

/**
 * Get badge count
 */
export async function getBadgeCount(): Promise<number> {
  if (!Notifications) return 0;
  return await Notifications.getBadgeCountAsync();
}

/**
 * Set badge count
 */
export async function setBadgeCount(count: number): Promise<void> {
  if (!Notifications) return;
  await Notifications.setBadgeCountAsync(count);
}

/**
 * Clear badge count
 */
export async function clearBadgeCount(): Promise<void> {
  if (!Notifications) return;
  await Notifications.setBadgeCountAsync(0);
}
