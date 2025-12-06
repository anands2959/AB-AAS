import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { LexendDeca_400Regular, LexendDeca_500Medium, LexendDeca_600SemiBold, LexendDeca_700Bold } from '@expo-google-fonts/lexend-deca';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Hide the splash screen immediately to show custom splash
SplashScreen.hideAsync();

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
    <LanguageProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="register" />
          <Stack.Screen name="dashboard" />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </LanguageProvider>
  );
}
