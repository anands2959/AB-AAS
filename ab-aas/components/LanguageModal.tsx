import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Animated,
    Dimensions,
    PanResponder,
} from 'react-native';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import { languageNames } from '@/translations';
import { Fonts } from '@/constants/theme';

interface LanguageModalProps {
    visible: boolean;
    onClose: () => void;
}

const { height } = Dimensions.get('window');

export default function LanguageModal({ visible, onClose }: LanguageModalProps) {
    const { language, setLanguage } = useLanguage();
    const slideAnim = useRef(new Animated.Value(height)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const panY = useRef(new Animated.Value(0)).current;

    const languages: Language[] = ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'ur', 'gu'];

    useEffect(() => {
        if (visible) {
            // Reset values before animating in
            slideAnim.setValue(height);
            fadeAnim.setValue(0);
            panY.setValue(0);
            
            Animated.parallel([
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    tension: 65,
                    friction: 11,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dy) > 5;
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    panY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100 || gestureState.vy > 0.5) {
                    handleClose();
                } else {
                    Animated.spring(panY, {
                        toValue: 0,
                        useNativeDriver: true,
                        tension: 80,
                        friction: 10,
                    }).start();
                }
            },
        })
    ).current;

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: height,
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

    const handleLanguageSelect = (lang: Language) => {
        setLanguage(lang);
        handleClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
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
                        styles.modalContainer,
                        {
                            transform: [
                                { translateY: Animated.add(slideAnim, panY) }
                            ],
                        },
                    ]}
                >
                    <View style={styles.modalContent}>
                        <View {...panResponder.panHandlers} style={styles.handleBarContainer}>
                            <View style={styles.handleBar} />
                        </View>
                        <Text style={styles.modalTitle}>Select Language</Text>
                        <ScrollView 
                            style={styles.languageList}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                        >
                            {languages.map((lang) => (
                                <Animated.View
                                    key={lang}
                                    style={{
                                        opacity: fadeAnim,
                                        transform: [{
                                            translateY: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [20, 0],
                                            }),
                                        }],
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.languageItem,
                                            language === lang && styles.selectedLanguageItem,
                                        ]}
                                        onPress={() => handleLanguageSelect(lang)}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.languageText,
                                                language === lang && styles.selectedLanguageText,
                                            ]}
                                        >
                                            {languageNames[lang]}
                                        </Text>
                                        {language === lang && (
                                            <View style={styles.checkmarkContainer}>
                                                <Text style={styles.checkmark}>✓</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </Animated.View>
                            ))}
                        </ScrollView>
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
        justifyContent: 'flex-end',
    },
    overlayTouchable: {
        flex: 1,
    },
    modalContainer: {
        width: '100%',
        maxHeight: '75%',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 8,
        paddingHorizontal: 20,
        paddingBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 12,
    },
    handleBarContainer: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#DDD',
        borderRadius: 2,
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: Fonts.bold,
        color: '#C03825',
        textAlign: 'center',
        marginBottom: 20,
    },
    languageList: {
        maxHeight: 450,
    },
    languageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#F8F8F8',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedLanguageItem: {
        backgroundColor: '#C03825',
        borderColor: '#A02E1F',
        // transform: [{ scale: 1.02 }],
    },
    languageText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#333',
    },
    selectedLanguageText: {
        color: '#fff',
        fontFamily: Fonts.bold,
    },
    checkmarkContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 18,
        color: '#fff',
        fontFamily: Fonts.bold,
    },
});
