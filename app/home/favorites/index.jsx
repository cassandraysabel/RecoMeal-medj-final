import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Link } from "expo-router";

export default function FavoritesScreen() {

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/favorites-bg.png")}
        style={[styles.bgimage, { zIndex: 0 }]}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Image
          source={require("../../../assets/gradient.png")}
          style={[styles.gradientimage, { zIndex: 1 }]}
        />
        <Text style={[(styles.favText), { zIndex: 2 }]}>Favorites</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bgimage: {
    position: 'absolute',
    top:0,
    left:0,
    right: 0,
    width: '50%',
    height: '12%',
  },
  overlay:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  gradientimage:{
    width: '100%', 
    height: '12%',  
  },
  favText:{ 
    color: '#333A73', 
    fontSize: 30, 
    fontWeight: 'bold',
    opacity: 1,
    position: 'absolute',
    marginTop: 40,
    marginRight: 50
  },
  navigationBar: {
    position:'absolute',
    backgroundColor: "#201E53",
    justifyContent: 'flex-end',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10, // Add some padding for visual appeal
  },
  descriptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  descriptionText: {
    fontSize: 10,
    color: "white",
  },
});
