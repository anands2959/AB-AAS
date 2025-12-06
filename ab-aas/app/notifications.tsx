import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    type: 'info' | 'success' | 'warning';
}

export default function NotificationsScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'Profile Update Required',
            message: 'Please complete your profile to access all benefits.',
            time: '2 hours ago',
            isRead: false,
            type: 'warning',
        },
        {
            id: '2',
            title: 'New Benefit Available',
            message: 'A new disability benefit scheme has been launched. Check eligibility now.',
            time: '5 hours ago',
            isRead: false,
            type: 'success',
        },
        {
            id: '3',
            title: 'Document Verification',
            message: 'Your documents have been verified successfully.',
            time: '1 day ago',
            isRead: true,
            type: 'success',
        },
        {
            id: '4',
            title: 'Application Status',
            message: 'Your benefit application is under review.',
            time: '2 days ago',
            isRead: true,
            type: 'info',
        },
        {
            id: '5',
            title: 'Community Update',
            message: 'Join our community meeting scheduled for next week.',
            time: '3 days ago',
            isRead: true,
            type: 'info',
        },
    ]);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(notif => 
            notif.id === id ? { ...notif, isRead: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
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
                        onPress={markAllAsRead}
                    >
                        <Text style={styles.markAllText}>{t('markAllRead')}</Text>
                    </TouchableOpacity>
                )}
            </View>

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
                            onPress={() => markAsRead(notification.id)}
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
                                    {notification.message}
                                </Text>
                                <View style={styles.notificationFooter}>
                                    <Ionicons name="time-outline" size={14} color="#999" />
                                    <Text style={styles.notificationTime}>
                                        {notification.time}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
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
