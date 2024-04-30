import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Profile() {
  return (
    <View>
      <View style={styles.imageContainer}>
      <Image source={require("../../../assets/abt-bg.png")} style={styles.abtimg}/>
      </View>

      <View style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 250,
                zIndex: 1
              }}
            >

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