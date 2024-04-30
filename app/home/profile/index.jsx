import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
  return (
    <View>
      <Link href={"auth/login"} >
        <Text style={styles.logouttxt}>Log out</Text>
      </Link>

      {/* <View style={styles.imageContainer}>
      <Image source={require("../../../assets/abt-bg.png")} style={styles.abtimg}/>
      </View> */}
      
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer:{
    height: "100%",
    width: "100%",
  }
})