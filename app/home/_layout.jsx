import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, } from "expo-router";
import Footer from "../../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <Slot />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
});
