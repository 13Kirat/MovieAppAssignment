import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import Splash from "./splash"
import { useColorScheme } from '@/components/useColorScheme';
import { ActivityIndicator, View } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Set splash as the default initial route.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [isSplashVisible, setIsSplashVisible] = useState(true); // Control custom splash screen visibility

  useEffect(() => {
    // Handle font loading errors
    if (error) throw error;

    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync(); // Hide the Expo splash screen
        setIsSplashVisible(false); // Hide custom splash after delay
      }, 3000); // 3-second delay for custom splash screen
    }
  }, [loaded, error]);

  
  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (isSplashVisible) {
    return <Splash />; // Render your custom splash screen
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="details" options={{ title: 'Details' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="splash" options={{ headerShown: false }} /> */}
      </Stack>
    </ThemeProvider>
  );
}
