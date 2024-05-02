import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../../utils/firebase';
import { useUserAuth } from '../../../utils/Auth';

export default function Profile() {

  const { user } = useUserAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accountInfoContainer}>
        <Text style={styles.title}>Account Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{user.displayName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>E-Mail</Text>
          <Text style={styles.infoValue}>{user.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Subscription</Text>
          <Text style={styles.infoValue}>Standard Plan</Text>
        </View>
      </View>

      {/* Upgrade Button */}
      <Pressable style={styles.upgradeButton}>
        <Text style={styles.upgradeButtonText}>Subscribe to Premium</Text>
      </Pressable>

      {/* Notifications Section */}
      <View style={styles.notificationContainer}>
        <Text style={styles.title}>Notifications</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Push Notification</Text>
          <Text style={styles.infoSwitchText}>ON</Text>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Link href={"auth/login"}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  accountInfoContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: 16,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
  },
  upgradeButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
  },
  notificationContainer: {
    marginTop: 30,
  },
  logoutContainer: {
  },
  logoutText: {
    fontSize: 16,
    color: '#c00',
  },
  infoSwitchText: { // Assuming a switch UI for toggling notifications
    fontSize: 16,
  },
});
