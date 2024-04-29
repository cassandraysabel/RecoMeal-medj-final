import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.desc}>Get started with RecoMeal!</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <Link style={styles.btn} href={"/home"}>
        <Text style={styles.btnText}>Sign Up</Text>
      </Link>

      <Text style={styles.orwText}>Or continue with</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity key="fb" style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../../assets/fb.png')} />
        </TouchableOpacity>
        <TouchableOpacity key="google" style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../../assets/google.png')} />
        </TouchableOpacity>
        <TouchableOpacity key="apple" style={styles.iconWrapper}>
          <Image style={styles.icon} source={require('../../assets/apple-logo.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    width:"100%",
    height: "100%"
  },
  title: {
    marginTop: 100,
    fontSize: 35,
    marginBottom: 10,
    color: '#1F1E53',
  },
  desc: {
    marginBottom: 40,
    fontSize: 15,
  },
  input: {
    width: '80%',
    padding: 10,
    paddingVertical: 15,
    backgroundColor: '#F1F4FF',
    marginBottom: 10,
    borderRadius: 10,
    color: '#626262',
    borderWidth: 1, 
    borderColor: '#cccccc', 
  },
  inputFocused: {
    borderWidth: 2, 
    borderColor: '#1F1E53', 
  }, 
  btn: {
    backgroundColor: '#1F1E53',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 15,
    color: '#ffffff',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconWrapper: {
    backgroundColor: '#ECECEC',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
