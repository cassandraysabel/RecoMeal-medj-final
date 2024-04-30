import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import axios, { AxiosError } from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const createAccount = async () => {
    console.log(name, email, password, confirmPassword);
    // validate email
    if (email.split("@").length !== 2) {
      alert("Invalid email address");
      return;
    }
    if (email.split("@")[1].split(".").length < 2) {
      alert("Invalid email address");
      return;
    }

    await axios
      .post("http://192.168.254.112:8081/api/signup", {
        name,
        email: email,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res.data);
        setError("You have created an account!");
      })
      .catch((err: AxiosError) => {
        setError(err.response?.data as string);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.desc}>Get started with RecoMeal!</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        inputMode="text"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        inputMode="email"
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
      <Pressable onPress={createAccount}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Sign Up</Text>
        </View>
      </Pressable>
      <Text>
        If you have an account already,
        <Pressable onPress={() => router.replace("/auth/login")}>
          <Text style={{ color: "blue", marginVertical: 10 }}>
            {" "}
            Log in Here
          </Text>
        </Pressable>
      </Text>
      <Text>Or continue with</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity key="fb" style={styles.iconWrapper}>
          <Image style={styles.icon} source={require("../../assets/fb.png")} />
        </TouchableOpacity>
        <TouchableOpacity key="google" style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require("../../assets/google.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity key="apple" style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require("../../assets/apple-logo.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            color: "red",
          }}
        >
          {error}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 100,
    fontSize: 35,
    marginBottom: 10,
    color: "#1F1E53",
  },
  desc: {
    marginBottom: 40,
    fontSize: 15,
  },
  input: {
    width: "80%",
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "#F1F4FF",
    marginBottom: 10,
    borderRadius: 10,
    color: "#626262",
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#1F1E53",
  },
  btn: {
    backgroundColor: "#1F1E53",
    borderRadius: 10,
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: {
    fontSize: 15,
    color: "#ffffff",
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  iconWrapper: {
    backgroundColor: "#ECECEC",
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
