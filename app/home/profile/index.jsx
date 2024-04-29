import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
      <Link href={"auth/login"} >
        <Text>Log out</Text>
      </Link>
      
    </View>
  )
}

const styles = StyleSheet.create({})