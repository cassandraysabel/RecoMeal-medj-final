import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { assets } from "./assets";

const tabs = [
  {
    name: "Home",
    href: "/",
    icon: assets.homeicon,
  },
  {
    name: "Favorites",
    href: "/favorites",
    icon: assets.favoritesicon,
  },
  {
    name: "Ingredients",
    href: "/ingredients",
    icon: assets.ingredientsicon,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: assets.calendaricon,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: assets.profileicon,
  },
];

export default function Footer() {
  return (
    <View style={styles.container}>
      {tabs.map(({ name, href, icon }, index) => {
        return (
          <Link replace key={index} href={`/home${href}`}>
            <View style={styles.tab}>
              <Image source={icon} style={styles.icon} />
              <Text style={styles.text}>{name}</Text>
            </View>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 75,
    justifyContent: "space-around",
    backgroundColor: "#1F1E53",
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
  },
  tab: {
    alignItems: "center", 
    justifyContent: "center", 
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 2, // Add some spacing between icon and text
  },
  text: {
    color: "white",
  },
});
