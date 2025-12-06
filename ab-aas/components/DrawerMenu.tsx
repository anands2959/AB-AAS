import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

interface DrawerMenuProps {
    visible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export default function DrawerMenu({ visible, onClose }: DrawerMenuProps) {
    const { t } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            slideAnim.setValue(-DRAWER_WIDTH);
            fadeAnim.setValue(0);
            
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    const menuItems = [
        { id: 'dashboard', label: t('dashboard'), iconName: 'grid-outline' as const, route: '/dashboard' as const },
        { id: 'profile', label: t('profile'), iconName: 'person-outline' as const, route: '/profile' as const },
        { id: 'faq', label: t('faq'), iconName: 'help-circle-outline' as const, route: '/faq' as const },
        { id: 'privacy', label: t('privacyPolicy'), iconName: 'lock-closed-outline' as const, route: '/privacy' as const },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={handleClose}
            statusBarTranslucent
        >
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <TouchableOpacity
                    style={styles.overlayTouchable}
                    activeOpacity={1}
                    onPress={handleClose}
                />
                <Animated.View 
                    style={[
                        styles.drawerContainer,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#F1EFCE', '#CCB256']}
                        style={styles.gradientContainer}
                    >
                        <SafeAreaView style={styles.drawerContent}>
                            {/* Drawer Header */}
                            <View style={styles.drawerHeader}>
                                <Text style={styles.appName}>|| AB AAS ||</Text>
                                {/* <Text style={styles.appSubtitle}>अखिल भारतीय अष्टावक्र अद्वैत संस्थान</Text> */}
                            </View>

                            {/* Menu Items */}
                            <View style={styles.menuItems}>
                            {menuItems.map((item) => {
                                const isActive = pathname === item.route;
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[
                                            styles.menuItem,
                                            isActive && styles.menuItemActive,
                                        ]}
                                        onPress={() => {
                                            handleClose();
                                            router.push(item.route);
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.menuIconContainer,
                                            isActive && styles.menuIconContainerActive,
                                        ]}>
                                            <Ionicons 
                                                name={item.iconName} 
                                                size={22} 
                                                color={isActive ? '#fff' : '#C03825'} 
                                            />
                                        </View>
                                        <Text style={[
                                            styles.menuLabel,
                                            isActive && styles.menuLabelActive,
                                        ]}>
                                            {item.label}
                                        </Text>
                                        <Ionicons 
                                            name="chevron-forward" 
                                            size={20} 
                                            color={isActive ? '#C03825' : '#999'} 
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                            {/* Footer */}
                            <View style={styles.drawerFooter}>
                                <Text style={styles.footerText}>Version 1.0.0</Text>
                            </View>
                        </SafeAreaView>
                    </LinearGradient>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayTouchable: {
        position: 'absolute',
        top: 0,
        left: DRAWER_WIDTH,
        right: 0,
        bottom: 0,
    },
    drawerContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden',
    },
    gradientContainer: {
        flex: 1,
    },
    drawerContent: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#C03825',
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#A02E1F',
        alignItems: 'center',
    },
    appName: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: '#CCB256',
        // marginBottom: 8,
        marginTop:10,
        textAlign: 'center',
    },
    appSubtitle: {
        fontSize: 13,
        fontFamily: Fonts.semiBold,
        color: '#fff',
        textAlign: 'center',
    },
    menuItems: {
        flex: 1,
        paddingTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(192, 56, 37, 0.1)',
    },
    menuItemActive: {
        backgroundColor: 'rgba(192, 56, 37, 0.15)',
        borderLeftWidth: 4,
        borderLeftColor: '#C03825',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuIconContainerActive: {
        backgroundColor: '#C03825',
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        fontFamily: Fonts.medium,
        color: '#5A4A2A',
    },
    menuLabelActive: {
        color: '#C03825',
        fontFamily: Fonts.semiBold,
    },
    drawerFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(192, 56, 37, 0.2)',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#7A6A4A',
    },
});
