import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../utils/Auth";

export default function Profile() {
  const { user, signOut } = useAuth();

  const logOut = async () => {
    try {
      router.replace("/auth/login");
      await signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accountInfoContainer}>
        <Text style={styles.title}>Account Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{user?.displayName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>E-Mail</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.title}>Subscription</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Subscription</Text>
          <Text style={styles.infoValue}>Standard Plan</Text>
        </View>

        <Pressable style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Subscribe to Premium</Text>
        </Pressable>
      </View>

      
      <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  accountInfoContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 5
  },
  infoValue: {
    fontSize: 16,
  },
  upgradeButton: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "#333A73",
    borderRadius: 50,
    alignItems: "center",
  },
  upgradeButtonText: {
    fontSize: 16,
    color: 'white',
    height: 20
  },
  notificationContainer: {
    marginTop: 30,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#494949",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
  logoutText: {
    fontSize: 16,
    color: "#fff",
  },
  infoSwitchText: {
    fontSize: 16,
  },
});