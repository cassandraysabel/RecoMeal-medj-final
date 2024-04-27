import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const tabs = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Favorites",
    href: "/favorites",
  },
  {
    name: "Ingredients",
    href: "/ingredients",
  },
  {
    name: "Calendar",
    href: "/calendar",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

export default function Footer() {
  return (
    <View style={styles.container}>
      {tabs.map(({ name, href }, index) => {
        return (
          <Link replace key={index} href={`/home${href}`}>
            <Text>{name}</Text>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
});
