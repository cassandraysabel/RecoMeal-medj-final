import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Layout() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={{
        alignItems:"center",
      }}>
      <Slot />

      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
