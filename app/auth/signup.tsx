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
import { Link, useRouter } from "expo-router"; // corrected import
import { createUser } from "../../utils/firebase";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter(); // corrected initialization

  const createAccount = async () => {
    try {
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
      // validate password
      if (password.length < 8) {
        alert("Password must be at least 8 characters"); // corrected validation message
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await createUser(name, email, password);

      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")

      alert("Account has been made. Please log in.")

      router.replace("auth/login")
    } catch (err) {
      console.log(err);
    }
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
          <Text
            style={{
              color: "white",
            }}
          >
            Sign Up
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>If you have an account already, </Text>
        <View style={styles.logInButton}>
          <Link href={"/auth/login"}>
            <Text
              style={{
                color: "white",
              }}
            >
              Log In
            </Text>
          </Link>
        </View>
      </View>

      {/* <Text>Or continue with</Text> */}
      {/* <View style={styles.iconContainer}> */}
        {/* <TouchableOpacity key="fb" style={styles.iconWrapper}>
          <Image style={styles.icon} source={require("../../assets/fb.png")} />
        </TouchableOpacity> */}
        {/* <TouchableOpacity key="google" style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require("../../assets/google.png")}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity key="apple" style={styles.iconWrapper}>
          <Image
            style={styles.icon}
            source={require("../../assets/apple-logo.png")}
          />
        </TouchableOpacity> */}
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
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
  logInButton: {
    backgroundColor: "#1F1E53",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    height: 30,
    width: 100,
    alignSelf: "center",
  },
  logInText: {
    fontSize: 18,
    color: "blue",
    textDecorationLine: "underline",
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
