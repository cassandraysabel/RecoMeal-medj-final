import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  return (
    <View>
      <View style={styles.imageContainer}>
      <Image source={require("../../../assets/abt-bg.png")} style={styles.abtimg}/>
      </View>


      

      <Link href={"auth/login"} >
        <Text>Log out</Text>
      </Link>
      
    </View>
  )
}

const styles = StyleSheet.create({
  abtimg: {
    zIndex: 0
  }
})