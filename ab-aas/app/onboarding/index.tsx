import { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    ViewToken,
    Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const onboardingData = [
    {
        id: '1',
        image: require('@/assets/onboarding1.jpg'),
        title: 'Welcome Aboard',
        description: 'Keep Smiling and meet your needs with quick Loans',
    },
    {
        id: '2',
        image: require('@/assets/onBoarding2.jpg'),
        title: 'Easy to Use',
        description: 'Simple and intuitive interface designed for everyone',
    },
    {
        id: '3',
        image: require('@/assets/onBoarding3.webp'),
        title: 'Get Started Now',
        description: 'Join thousands of users and experience the difference',
    },
];

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const onViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            if (viewableItems.length > 0) {
                const newIndex = viewableItems[0].index || 0;
                setCurrentIndex(newIndex);

                // Fade animation for text
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        }
    ).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const renderItem = ({ item }: { item: (typeof onboardingData)[0] }) => (
        <View style={styles.slide}>
            <Image source={item.image} style={styles.backgroundImage} resizeMode="cover" />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Scrollable Images */}
            <FlatList
                ref={flatListRef}
                data={onboardingData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />

            {/* Fixed Gradient Overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.8)']}
                locations={[0, 0.5, 1]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.overlay}
                pointerEvents="none"
            />

            {/* Fixed Content Overlay */}
            <View style={styles.fixedContent} pointerEvents="box-none">
                {/* Fixed Pagination Dots */}
                <View style={styles.pagination}>
                    {onboardingData.map((_, i) => {
                        const inputRange = [
                            (i - 1) * width,
                            i * width,
                            (i + 1) * width,
                        ];

                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [8, 24, 8],
                            extrapolate: 'clamp',
                        });

                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.4, 1, 0.4],
                            extrapolate: 'clamp',
                        });

                        return (
                            <Animated.View
                                key={i}
                                style={[
                                    styles.dot,
                                    {
                                        width: dotWidth,
                                        opacity,
                                    },
                                ]}
                            />
                        );
                    })}
                </View>

                {/* Animated Text Content */}
                <Animated.View
                    style={[
                        styles.textContainer,
                        {
                            opacity: fadeAnim,
                            transform: [
                                {
                                    translateY: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.description}>
                        {onboardingData[currentIndex].description}
                    </Text>
                </Animated.View>

                {/* Fixed Skip Button */}
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => router.replace('/register')}
                >
                    <View style={styles.skipGradient}>
                        <Text style={styles.skipText}>
                            {currentIndex === onboardingData.length - 1
                                ? 'Get Started'
                                : 'Skip'}
                        </Text>
                        <Text style={styles.arrow}>→</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    slide: {
        width: width,
        height: height,
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    fixedContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 60,
        paddingHorizontal: 30,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
    textContainer: {
        marginBottom: 30,
    },
    description: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: '#F1EFCE',
        textAlign: 'center',
        lineHeight: 24,
        opacity: 0.9,
    },
    skipButton: {
        alignSelf: 'flex-end',
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#CCB256',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    skipGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 20,
        gap: 8,
        backgroundColor: '#C03825',
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 30,
    },
    skipText: {
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        color: '#fff',
    },
    arrow: {
        fontSize: 20,
        color: '#fff',
        fontFamily: Fonts.bold,
    },
});
