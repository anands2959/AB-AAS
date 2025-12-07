import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

const { width } = Dimensions.get('window');

interface RegistrationSuccessModalProps {
    visible: boolean;
    isNewUser: boolean;
    userName: string;
    onClose: () => void;
}

export default function RegistrationSuccessModal({
    visible,
    isNewUser,
    userName,
    onClose,
}: RegistrationSuccessModalProps) {
    const { t } = useLanguage();
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const checkmarkAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            // Reset animations
            scaleAnim.setValue(0);
            checkmarkAnim.setValue(0);
            fadeAnim.setValue(0);

            // Start animations sequence
            Animated.sequence([
                // Scale up the modal
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                // Show checkmark
                Animated.spring(checkmarkAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                // Fade in content
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const checkmarkScale = checkmarkAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1.2, 1],
    });

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#F1EFCE', '#E8D4A0', '#D4B76A']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        {/* Success Icon */}
                        <Animated.View
                            style={[
                                styles.iconContainer,
                                {
                                    transform: [{ scale: checkmarkScale }],
                                },
                            ]}
                        >
                            <LinearGradient
                                colors={['#4CAF50', '#45a049']}
                                style={styles.iconGradient}
                            >
                                <Ionicons name="checkmark" size={60} color="#fff" />
                            </LinearGradient>
                        </Animated.View>

                        {/* Content */}
                        <Animated.View
                            style={[
                                styles.content,
                                {
                                    opacity: fadeAnim,
                                },
                            ]}
                        >
                            <Text style={styles.title}>
                                {isNewUser ? '🎉 Welcome!' : '👋 Welcome Back!'}
                            </Text>
                            
                            <Text style={styles.userName}>{userName}</Text>

                            <Text style={styles.message}>
                                {isNewUser
                                    ? 'Your registration is successful!\nYou are now part of AB AAS community.'
                                    : 'Great to see you again!\nYour account has been loaded successfully.'}
                            </Text>

                            {/* <View style={styles.infoBox}>
                                <Ionicons name="information-circle" size={20} color="#C03825" />
                                <Text style={styles.infoText}>
                                    {isNewUser
                                        ? 'Our community will contact you within 48 hours'
                                        : 'All your data has been restored'}
                                </Text>
                            </View> */}

                            {/* Action Button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={onClose}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#C03825', '#B8432E']}
                                    style={styles.buttonGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.buttonText}>
                                        {t('backToDashboard')}
                                    </Text>
                                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Decorative Elements */}
                        <View style={styles.decorativeCircle1} />
                        <View style={styles.decorativeCircle2} />
                    </LinearGradient>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: width - 40,
        maxWidth: 400,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    gradient: {
        padding: 30,
        alignItems: 'center',
        position: 'relative',
    },
    iconContainer: {
        marginBottom: 20,
    },
    iconGradient: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 22,
        fontFamily: Fonts.bold,
        color: '#C03825',
        marginBottom: 8,
        textAlign: 'center',
    },
    userName: {
        fontSize: 20,
        fontFamily: Fonts.semiBold,
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    
    button: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#C03825',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: '#fff',
    },
    decorativeCircle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(192, 56, 37, 0.1)',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: -30,
        left: -30,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(192, 56, 37, 0.08)',
    },
});
