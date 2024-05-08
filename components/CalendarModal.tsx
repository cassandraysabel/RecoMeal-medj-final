import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CalendarModal({ selectedDate }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          paddingLeft: 15,
          paddingTop: 5,
          borderRadius: 15,
          borderColor: "black",
          borderWidth: 1,
          width: 275,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 16,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          {selectedDate}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
