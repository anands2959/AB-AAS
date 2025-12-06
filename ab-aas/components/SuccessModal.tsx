import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

interface SuccessModalProps {
    visible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get('window');

export default function SuccessModal({ visible, onClose }: SuccessModalProps) {
    const { t } = useLanguage();
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const checkAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            scaleAnim.setValue(0);
            fadeAnim.setValue(0);
            checkAnim.setValue(0);

            Animated.sequence([
                Animated.parallel([
                    Animated.spring(scaleAnim, {
                        toValue: 1,
                        useNativeDriver: true,
                        tension: 50,
                        friction: 7,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.spring(checkAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    tension: 50,
                    friction: 7,
                }),
            ]).start();
        }
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <View style={styles.modalContent}>
                        {/* Success Icon */}
                        <Animated.View
                            style={[
                                styles.iconContainer,
                                {
                                    transform: [{ scale: checkAnim }],
                                },
                            ]}
                        >
                            <View style={styles.iconCircle}>
                                <Ionicons name="checkmark" size={48} color="#fff" />
                            </View>
                        </Animated.View>

                        {/* Success Message */}
                        <Text style={styles.title}>{t('applicationSubmitted')}</Text>
                        <Text style={styles.message}>
                            {t('applicationSubmittedMessage')}
                        </Text>

                        {/* Info Box */}
                        <View style={styles.infoBox}>
                            <Ionicons name="time-outline" size={20} color="#C03825" />
                            <Text style={styles.infoText}>
                                {t('communityContact48Hours')}
                            </Text>
                        </View>

                        {/* Button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onClose}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>{t('backToDashboard')}</Text>
                            <Ionicons name="arrow-forward" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width - 60,
        maxWidth: 400,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    iconContainer: {
        marginBottom: 20,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
        paddingHorizontal: 8,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF5F3',
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFE5E0',
        gap: 10,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Fonts.medium,
        color: '#C03825',
        lineHeight: 18,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C03825',
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 28,
        gap: 8,
        width: '100%',
        shadowColor: '#C03825',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 3,
    },
    buttonText: {
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: '#fff',
    },
});
