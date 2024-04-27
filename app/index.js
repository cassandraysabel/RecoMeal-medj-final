import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View>
      <Text>Welcome to RecoMeal</Text>
      <Pressable>
        <Link href={"/auth/login"}>
            <Text>
                Log in na gaga
            </Text>
        </Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
