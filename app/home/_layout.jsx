import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

export default function Layout() {
  return (
    <View>
      <Header />
      <Stack />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
    
});
