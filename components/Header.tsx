import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { assets } from "./assets";

 function Header() {
  return (
    <View style={styles.header}>
      <Image source={assets.gradient} style={{ zIndex: 1 }} />
      <Image
        source={assets["ingredients-bg"]}
        resizeMode="cover"
        style={styles.bgimage}
      />
      <Text>Ingredients</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    position: "relative",
  },
  bgimage: {
    position: "absolute",
    // left: number;
    // bottom: number;
    // width: number;
    // height: number;
  },
});
