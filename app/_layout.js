import { StyleSheet, SafeAreaView, Text } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import RecipeProvider from "../utils/UserData";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from "../utils/Auth";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <RecipeProvider>
          <SafeAreaView style={styles.container}>
            <Slot />
          </SafeAreaView>
        </RecipeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
});
