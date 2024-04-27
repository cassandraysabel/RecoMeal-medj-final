import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Login() {

  return (
    <View>
      <Text>Login</Text>
      <Link href={"/home"}>
      <Text>
        Log in to home screen
      </Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({})