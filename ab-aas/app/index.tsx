import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from '@/constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const sunRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Continuous rotation animation
    Animated.loop(
      Animated.timing(sunRotation, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    ).start();

    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#F1EFCE', '#CCB256']}
      style={styles.container}
    >
      

      {/* Top Title */}
      <View style={styles.topSection}>
        <Text style={styles.title}>|| AB AAS ||</Text>
      </View>

      {/* Right Side Sun and Logo */}
      <View style={styles.rightSideContainer}>
        
        <Image 
          source={require('@/assets/splash/logo-background.png')}
          style={styles.logoBackground}
          resizeMode="contain"
        />
      </View>

      {/* Center Logo with Background */}
      <View style={styles.centerSection}>
        <Animated.Image 
          source={require('@/assets/sun.png')}
          style={[
            styles.rightSun,
            {
              transform: [
                {
                  rotate: sunRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />
        <Image 
          source={require('@/assets/splash/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Red Banner with Hindi Text */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>अखिल भारतीय अष्टावक्र अद्वैत</Text>
          <Text style={styles.bannerText}>संस्थान</Text>
        </View>
      </View>

      {/* Bottom Tagline */}
      <View style={styles.bottomSection}>
        <Text style={styles.tagline}>संकल्प हैं प्रबल, दिव्यांग हो सबल</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rightSideContainer: {
    position: 'absolute',
    top: '45%',
    width: '100%',
    height: 500,
    overflow: 'hidden',
    transform: [{ translateY: -250 }],
    // zIndex: 0,
  },
  rightSun: {
    position: 'absolute',
    right: 0,
    left:80,
    width: 600,
    height: 600,
    opacity: 0.3,
  },
  topSection: {
    paddingTop: 80,
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontSize: 36,
    fontFamily: Fonts.bold,
    color: '#C03825',
    letterSpacing: 2,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  logoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: '100%',
    height: '70%',
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 90,
    marginHorizontal:20,
    zIndex: 2,
  },
  banner: {
    backgroundColor: '#C03825',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  bannerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Fonts.hindiBold,
    textAlign: 'center',
  },
  bottomSection: {
    paddingBottom: 30,
    alignItems: 'center',
    zIndex: 2,
  },
  tagline: {
    fontSize: 18,
    fontFamily: Fonts.hindiSemiBold,
    color: '#B8392E',
    textAlign: 'center',
  },
});
