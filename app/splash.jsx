import React, { useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Animation value for fading in

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Navigate to the Home screen after delay
    // const timer = setTimeout(() => {
      // router.replace('/'); // Navigate to the Home screen
    // }, 5000); // 5-second delay
    // return () => clearTimeout(timer);
  }, [router, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/popcorn.png')}
        style={[styles.image, { opacity: fadeAnim, transform: [{ scale: fadeAnim }] }]}
      />
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Movie Finder
      </Animated.Text>
      <Animated.Text style={[styles.subtext, { opacity: fadeAnim }]}>
        Find your next favorite movie with us
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtext: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

export default SplashScreen;
