import React, { useEffect } from 'react';
import { Image, StyleSheet, Animated } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    // Fade out after 3 seconds
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      delay: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Navigate to Home screen
      navigation.replace('HomeTabs');
    });
  }, [navigation]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image source={require('../assets/logo.jpg')} style={styles.logo} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#386f8cff',
  },
  logo: {
    marginBottom: 20,
    width: 600,
    height: 700,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;