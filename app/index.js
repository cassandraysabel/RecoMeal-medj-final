import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [gifVisible, setGifVisible] = useState(false);
  const [middleGifVisible, setMiddleGifVisible] = useState(false);

  useEffect(() => {
    if (middleGifVisible) {
      const timer = setTimeout(() => {
        // After 3 seconds, navigate to the next page
        navigation.navigate('auth/login.tsx');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [middleGifVisible, navigation]);

  const handlePress = () => {
    // Show the GIF when user clicks anywhere on the screen
    setGifVisible(true);
    setMiddleGifVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fullScreenTouchable} onPress={handlePress}>
        {/* This view covers the whole screen and triggers the GIF visibility */}
        {gifVisible && (
          <View style={styles.gifContainer}>
            {/* Place your first gif here */}
            <Image
              source={require('../assets/RecoMeal.gif')}
              style={styles.rmgif}
            />
          </View>
        )}
        {middleGifVisible && (
          <View style={styles.middleGifContainer}>
            {/* Place your second gif here */}
            <Image
              source={require('../assets/splash2.gif')}
              style={styles.gif}
            />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background color
  },
  fullScreenTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  gifContainer: {
    position: 'absolute',
    bottom: 120, // Slightly above center vertically
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Change as needed
  },
  middleGifContainer: {
    position: 'absolute',
    top: 320, // Center vertically
    left: width / 2 - 100, // Center horizontally
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Change as needed
  },
  rmgif: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex:1
    
    // Adjust this according to your GIF
    
  },
  gif: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginTop: '30%',
    zIndex:0
  }
});

export default SplashScreen;
