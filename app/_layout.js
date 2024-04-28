import { StyleSheet, SafeAreaView, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import RecipeProvider from "../components/context";

export default function Layout() {
  return (
    <RecipeProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </RecipeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
