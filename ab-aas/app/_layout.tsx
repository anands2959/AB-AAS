import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { LexendDeca_400Regular, LexendDeca_500Medium, LexendDeca_600SemiBold, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { UserProvider } from '@/contexts/UserContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Hide the splash screen immediately to show custom splash
SplashScreen.hideAsync().catch(() => {
  // Splash screen already hidden
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    LexendDeca_400Regular,
    LexendDeca_500Medium,
    LexendDeca_600SemiBold,
    LexendDeca_700Bold,
  });

  // Don't wait for fonts, show custom splash immediately
  useEffect(() => {
    // Fonts will load in background
  }, [fontsLoaded]);

  return (
    <ErrorBoundary>
      <UserProvider>
        <LanguageProvider>
          <NotificationProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="register" />
                <Stack.Screen name="dashboard" />
              </Stack>
              <StatusBar style="dark" />
            </ThemeProvider>
          </NotificationProvider>
        </LanguageProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

// Configure reanimated
import 'react-native-reanimated';
