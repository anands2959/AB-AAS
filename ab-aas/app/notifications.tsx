import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import {
    subscribeToUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    UserNotification,
} from '@/services/userNotificationService';

export default function NotificationsScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const { userData } = useUser();
    
    const [notifications, setNotifications] = useState<UserNotification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userData?.phoneNumber) {
            setLoading(false);
            return;
        }

        // Subscribe to real-time notifications
        const unsubscribe = subscribeToUserNotifications(
            userData.phoneNumber,
            (fetchedNotifications) => {
                setNotifications(fetchedNotifications);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [userData?.phoneNumber]);

    const handleMarkAsRead = async (id: string) => {
        try {
            await markNotificationAsRead(id);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        if (!userData?.phoneNumber) return;
        
        try {
            await markAllNotificationsAsRead(userData.phoneNumber);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const getTimeAgo = (timestamp: any): string => {
        if (!timestamp) return 'Just now';
        
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
        return date.toLocaleDateString();
    };

    const getIconName = (type: string) => {
        switch (type) {
            case 'success':
                return 'checkmark-circle';
            case 'warning':
                return 'alert-circle';
            default:
                return 'information-circle';
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'success':
                return '#4CAF50';
            case 'warning':
                return '#FF9800';
            case 'error':
                return '#F44336';
            default:
                return '#2196F3';
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>{t('notifications')}</Text>
                    {unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
                {unreadCount > 0 && (
                    <TouchableOpacity
                        style={styles.markAllButton}
                        onPress={handleMarkAllAsRead}
                    >
                        <Text style={styles.markAllText}>{t('markAllRead')}</Text>
                    </TouchableOpacity>
                )}
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#C03825" />
                    <Text style={styles.loadingText}>{t('loading')}</Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {notifications.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="notifications-off-outline" size={80} color="#CCC" />
                            <Text style={styles.emptyTitle}>{t('noNotifications')}</Text>
                            <Text style={styles.emptyMessage}>{t('noNotificationsMessage')}</Text>
                        </View>
                    ) : (
                        notifications.map((notification) => (
                            <TouchableOpacity
                                key={notification.id}
                                style={[
                                    styles.notificationCard,
                                    !notification.isRead && styles.unreadCard,
                                ]}
                                onPress={() => handleMarkAsRead(notification.id)}
                                activeOpacity={0.7}
                            >
                                <View style={styles.notificationIcon}>
                                    <Ionicons
                                        name={getIconName(notification.type)}
                                        size={28}
                                        color={getIconColor(notification.type)}
                                    />
                                </View>
                                <View style={styles.notificationContent}>
                                    <View style={styles.notificationHeader}>
                                        <Text style={[
                                            styles.notificationTitle,
                                            !notification.isRead && styles.unreadTitle,
                                        ]}>
                                            {notification.title}
                                        </Text>
                                        {!notification.isRead && (
                                            <View style={styles.unreadDot} />
                                        )}
                                    </View>
                                    <Text style={styles.notificationMessage}>
                                        {notification.body}
                                    </Text>
                                    <View style={styles.notificationFooter}>
                                        <Ionicons name="time-outline" size={14} color="#999" />
                                        <Text style={styles.notificationTime}>
                                            {getTimeAgo(notification.createdAt)}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: '#C03825',
    },
    unreadBadge: {
        backgroundColor: '#C03825',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadBadgeText: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: '#fff',
    },
    markAllButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    markAllText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: '#C03825',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    loadingText: {
        fontSize: 16,
        fontFamily: Fonts.regular,
        color: '#999',
        marginTop: 12,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyTitle: {
        fontSize: 20,
        fontFamily: Fonts.semiBold,
        color: '#333',
        marginTop: 20,
    },
    emptyMessage: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    unreadCard: {
        backgroundColor: '#FFF5F3',
        borderLeftWidth: 4,
        borderLeftColor: '#C03825',
    },
    notificationIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    notificationTitle: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#333',
        flex: 1,
    },
    unreadTitle: {
        fontFamily: Fonts.bold,
        color: '#C03825',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#C03825',
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        lineHeight: 20,
        marginBottom: 8,
    },
    notificationFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    notificationTime: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#999',
    },
});
