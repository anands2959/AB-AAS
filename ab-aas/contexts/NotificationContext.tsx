import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import {
  registerForPushNotificationsAsync,
  savePushTokenToFirebase,
  addNotificationReceivedListener,
  addNotificationResponseListener,
  removeNotificationSubscription,
  clearBadgeCount,
} from '@/services/notificationService';
import {
  saveNotificationToFirestore,
  subscribeToUnreadCount,
} from '@/services/userNotificationService';
import { useUser } from './UserContext';

interface NotificationContextType {
  expoPushToken: string | undefined;
  notification: any | undefined;
  isRegistered: boolean;
  unreadCount: number;
  registerNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<any | undefined>();
  const [isRegistered, setIsRegistered] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { userData } = useUser();
  const router = useRouter();
  
  const notificationListener = useRef<any | null>(null);
  const responseListener = useRef<any | null>(null);
  const unreadCountUnsubscribe = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    try {
      // Auto-register notifications when user logs in
      if (userData?.phoneNumber && !isRegistered) {
        registerNotifications().catch(err => {
          console.error('Failed to register notifications:', err);
        });
      }

      // Subscribe to unread count
      if (userData?.phoneNumber) {
        unreadCountUnsubscribe.current = subscribeToUnreadCount(
          userData.phoneNumber,
          (count) => {
            setUnreadCount(count);
          }
        );
      }

      // Set up notification listeners
      notificationListener.current = addNotificationReceivedListener((notification) => {
        console.log('Notification received:', notification);
        setNotification(notification);
        
        // Save notification to Firestore
        if (userData?.phoneNumber) {
          const content = notification.request.content;
          const notificationType = (content.data?.type as string) || 'info';
          const type = ['info', 'success', 'warning', 'error'].includes(notificationType) 
            ? notificationType as 'info' | 'success' | 'warning' | 'error'
            : 'info';
          
          saveNotificationToFirestore(
            userData.phoneNumber,
            content.title || 'Notification',
            content.body || '',
            content.data,
            type
          ).catch(error => {
            console.error('Error saving notification to Firestore:', error);
          });
        }
      });

      responseListener.current = addNotificationResponseListener((response) => {
        console.log('Notification tapped:', response);
        handleNotificationResponse(response);
      });
    } catch (error) {
      console.error('Error in NotificationProvider setup:', error);
    }

    return () => {
      try {
        if (notificationListener.current) {
          removeNotificationSubscription(notificationListener.current);
        }
        if (responseListener.current) {
          removeNotificationSubscription(responseListener.current);
        }
        if (unreadCountUnsubscribe.current) {
          unreadCountUnsubscribe.current();
        }
      } catch (error) {
        console.error('Error cleaning up notification listeners:', error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, isRegistered]);

  const registerNotifications = async () => {
    try {
      const token = await registerForPushNotificationsAsync();
      
      if (token) {
        setExpoPushToken(token);
        setIsRegistered(true);
        
        // Save token to Firebase if user is logged in
        if (userData?.phoneNumber) {
          await savePushTokenToFirebase(userData.phoneNumber, token);
        }
      } else {
        // Even without token, mark as "registered" to prevent repeated attempts
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Error registering notifications:', error);
      setIsRegistered(true); // Prevent repeated attempts
    }
  };

  const handleNotificationResponse = (response: any) => {
    const data = response.notification.request.content.data;
    
    // Clear badge when notification is tapped
    clearBadgeCount();

    // Handle navigation based on notification data
    if (data?.screen) {
      switch (data.screen) {
        case 'benefits':
          router.push('/benefits');
          break;
        case 'profile':
          router.push('/profile');
          break;
        case 'support':
          router.push('/support');
          break;
        case 'dashboard':
          router.push('/dashboard');
          break;
        default:
          // Navigate to dashboard by default
          router.push('/dashboard');
      }
    }

    // Handle specific notification types
    if (data?.type) {
      switch (data.type) {
        case 'benefit_approved':
          router.push('/benefits');
          break;
        case 'benefit_rejected':
          router.push('/benefits');
          break;
        case 'support_response':
          router.push('/support');
          break;
        case 'profile_incomplete':
          router.push('/profile');
          break;
        default:
          break;
      }
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        notification,
        isRegistered,
        unreadCount,
        registerNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
