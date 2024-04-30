import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, } from "expo-router";
import Footer from "../../components/Footer";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Slot />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
});
