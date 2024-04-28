import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack,  } from "expo-router";
import Footer from "../../components/Footer";

export default function Layout() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Slot />
      </View>
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
