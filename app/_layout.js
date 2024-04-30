import { StyleSheet, SafeAreaView, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import RecipeProvider from "../components/context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <RecipeProvider>
        <SafeAreaView style={styles.container}>
          <Slot />
        </SafeAreaView>
      </RecipeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
