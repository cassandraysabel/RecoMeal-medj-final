import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const SplashScreen = () => {
  const [gifVisible, setGifVisible] = useState(false);
  const [middleGifVisible, setMiddleGifVisible] = useState(false);
  useEffect(() => {
    if (middleGifVisible) {
      const timer = setTimeout(() => {
        router.replace('auth/login');
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [middleGifVisible]);

  const handlePress = () => {
    setGifVisible(true);
    setMiddleGifVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fullScreenTouchable} onPress={handlePress}>
        {gifVisible && (
          <View style={styles.gifContainer}>
            <Image
              source={require('../assets/RecoMeal.gif')}
              style={styles.rmgif}
            />
          </View>
        )}
        {middleGifVisible && (
          <View style={styles.middleGifContainer}>
  
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
    backgroundColor: 'white', 
  },
  fullScreenTouchable: {
    ...StyleSheet.absoluteFillObject,
  },
  gifContainer: {
    position: 'absolute',
    bottom: 120, 
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  middleGifContainer: {
    position: 'absolute',
    top: 320, 
    left: width / 2 - 100, 
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  rmgif: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex:1
    
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
