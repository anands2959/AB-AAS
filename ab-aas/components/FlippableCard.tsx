import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FlippableCard() {
    const { t } = useLanguage();
    const [isFlipped, setIsFlipped] = useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;
    const sunRotation = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.loop(
            Animated.timing(sunRotation, {
                toValue: 1,
                duration: 20000,
                useNativeDriver: true,
                easing: (t) => t,
            })
        ).start();
    }, []);

    const flipCard = () => {
        const toValue = isFlipped ? 0 : 180;

        Animated.timing(flipAnimation, {
            toValue,
            duration: 600,
            useNativeDriver: true,
        }).start();

        setIsFlipped(!isFlipped);
    };

    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });

    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    const frontOpacity = flipAnimation.interpolate({
        inputRange: [0, 89, 90, 180],
        outputRange: [1, 1, 0, 0],
    });

    const backOpacity = flipAnimation.interpolate({
        inputRange: [0, 89, 90, 180],
        outputRange: [0, 0, 1, 1],
    });

    const sunRotate = sunRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={flipCard}
                style={styles.cardContainer}
            >
                {/* Front Side */}
                <Animated.View
                    style={[
                        styles.card,
                        {
                            opacity: frontOpacity,
                            transform: [{ rotateY: frontInterpolate }],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#E8935C', '#D97B47', '#C85A3A']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Animated.Image
                            source={require('@/assets/sun.png')}
                            style={[
                                styles.sunImage,
                                {
                                    transform: [{ rotate: sunRotate }],
                                },
                            ]}
                            resizeMode="contain"
                        />

                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>|| AB AAS ||</Text>
                            <Text style={styles.cardSubtitle}>
                                अखिल भारतीय अष्टावक्र अद्वैत संस्थान
                            </Text>
                        </View>

                        <View style={styles.cardContent}>
                            <View style={styles.cardInfo}>
                                <Text style={styles.cardLabel}>
                                    {t('name')}: ........................
                                </Text>
                                <Text style={styles.cardLabel}>
                                    {t('dob')}: ........................
                                </Text>
                                <Text style={styles.cardLabel}>
                                    {t('phoneNumber')}: ........................
                                </Text>
                                <Text style={styles.cardLabel}>
                                    {t('address')}: ........................
                                </Text>
                            </View>
                            

                        </View>

                        <View style={styles.cardFooter}>
                            <Text style={styles.cardFooterText}>
                                {t('communityContact')}
                            </Text>
                        </View>

                        {/* Background and Logo in bottom right */}
                        <View style={styles.bottomRightContainer}>
                            <Image
                                source={require('@/assets/background.png')}
                                style={styles.backgroundImage}
                                resizeMode="cover"
                            />
                            <Image
                                source={require('@/assets/logo.png')}
                                style={styles.logoImage}
                                resizeMode="contain"
                            />
                        </View>

                    </LinearGradient>
                </Animated.View>

                {/* Back Side */}
                <Animated.View
                    style={[
                        styles.card,
                        styles.cardBack,
                        {
                            opacity: backOpacity,
                            transform: [{ rotateY: backInterpolate }],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#C85A3A', '#D97B47', '#E8935C']}
                        style={styles.gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.backHeader}>
                            <Text style={styles.backTitle}>|| AB AAS ||</Text>
                            <View style={styles.backSubtitleContainer}>
                                <Text style={styles.backSubtitle}>
                                    {/* अखिल भारतीय अष्टावक्र अद्वैत संस्थान */}
                                </Text>
                            </View>
                            <Text style={styles.backSlogan}>
                                {t('empoweringDisabled')}
                            </Text>
                        </View>

                        <View style={styles.backContent}>
                            <View style={styles.infoRow}>
                                <Ionicons name="call" size={16} color="#fff" />
                                <View style={styles.infoTextContainer}>
                                    <Text style={styles.infoLabel}>{t('helpline')}</Text>
                                    <Text style={styles.infoValue}>1800-XXX-XXXX</Text>
                                </View>
                            </View>


                        </View>

                        <View style={styles.backFooter}>
                            <Text style={styles.backFooterText}>
                                संकल्प हैं प्रबल, दिव्यांग हो सबल
                            </Text>
                        </View>

                    </LinearGradient>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginTop: 5,
    },
    cardContainer: {
        height: 180,
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    cardBack: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    gradient: {
        flex: 1,
        borderRadius: 16,
        padding: 10,
    },
    sunImage: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 160,
        height: 160,
        opacity: 0.2,
        zIndex: 0,
    },
    cardHeader: {
        alignItems: 'center',
        marginBottom: 10,
        zIndex: 1,
    },
    cardTitle: {
        fontSize: 12,
        fontFamily: Fonts.bold,
        color: '#fff',
    },
    cardSubtitle: {
        fontSize: 12,
        fontFamily: Fonts.semiBold,
        color: '#fff',
        backgroundColor: '#B8432E',
        paddingHorizontal: 16,
        paddingVertical: 2,
        borderRadius: 20,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardInfo: {
        flex: 1,
    },
    cardLabel: {
        fontSize: 10,
        fontFamily: Fonts.semiBold,
        color: '#fff',
        marginBottom: 2,
    },
    cardImage: {
        width:100,
        height: 100,
        marginRight: 20,
        marginBottom: 5,
    },
    cardFooter: {
        backgroundColor: '#B8432E',
        paddingVertical: 2,
        marginLeft: -10,
        marginRight: -10,
        paddingHorizontal: 12,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        alignItems: 'center',
        zIndex:1
    },
    cardFooterText: {
        fontSize: 8,
        fontFamily: Fonts.medium,
        color: '#fff',
    },
    flipIndicator: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    flipText: {
        fontSize: 10,
        fontFamily: Fonts.medium,
        color: '#fff',
    },
    // Back Side Styles
    backHeader: {
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    },
    backTitle: {
        fontSize: 10,
        fontFamily: Fonts.bold,
        color: '#fff',
        marginBottom: 4,
    },
    backSubtitleContainer: {
        backgroundColor: '#B8432E',
        paddingVertical: 6,
        marginBottom: 4,
        marginLeft: -10,
        marginRight: -10,
        alignSelf: 'stretch',
    },
    backSubtitle: {
        fontSize: 10,
        fontFamily: Fonts.semiBold,
        color: '#fff',
        textAlign: 'center',
    },
    backSlogan: {
        fontSize: 9,
        fontFamily: Fonts.medium,
        color: '#FFE5E0',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    backContent: {
        flex: 1,
        gap: 6,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: 6,
        borderRadius: 6,
        gap: 8,
    },
    infoTextContainer: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 9,
        fontFamily: Fonts.medium,
        color: '#FFE5E0',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 11,
        fontFamily: Fonts.semiBold,
        color: '#fff',
    },
    backFooter: {
        paddingVertical: 2,
        paddingHorizontal: 12,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        alignItems: 'center',
        marginLeft: -10,
        marginRight: -10,
        marginBottom: -10,
    },
    backFooterText: {
        fontSize: 8,
        fontFamily: Fonts.medium,
        color: '#fff',
    },
    bottomRightContainer: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width:200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    logoImage: {
        width: 120,
        height: 120,
        zIndex: 1,
    },
});
