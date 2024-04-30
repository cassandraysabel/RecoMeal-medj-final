import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Link } from "expo-router";
import { assets } from '../../../components/assets';

export default function FavoritesScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.gradient} style={{ zIndex: 1 }} />
        <Image
          source={assets["ingredients-bg"]}
          resizeMode="cover"
          style={styles.bgimage}
        />
        <Text style={styles.ingredientsText}>Favorites</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
    },
  header: {
    width: "100%",
    position: "relative",
  },
  bgimage: {
    position: 'absolute',
    left:0,
    bottom: 0,
    width: 300,
    height: 200,
  },
  ingredientsText: {
    color: "#333A73",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    right: 10,
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
