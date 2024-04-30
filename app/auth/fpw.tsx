import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";

const sendVerificationCode = async (email) => {

  const verificationCode = generateVerificationCode();

  await axios
    .post("/api/fpw", { email, verificationCode })
    .then((res) => {
      console.log(res.data);
      console.log("Verification code sent to", email, ":", verificationCode);
    })
    .catch((err: AxiosError) => {
      console.error(err);
    });

  return verificationCode;
};

// Mock function for generating a random verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleForgotPassword = async () => {
    if (email.trim() === "") {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      const code = await sendVerificationCode(email);
      setVerificationCode(code.toString());
      setIsCodeSent(true);
      Alert.alert(
        "Code Sent",
        "A verification code has been sent to your email."
      );
    } catch (error) {
      console.error("Error sending verification code:", error);
      Alert.alert(
        "Error",
        "Failed to send verification code. Please try again later."
      );
    }
  };

  const handleVerifyCode = () => {
    // Check if the entered code matches the sent code
    if (verificationCode === enteredCode) {
      // Code matches, navigate to reset password screen
    } else {
      Alert.alert(
        "Invalid Code",
        "Please enter the correct verification code."
      );
    }
  };

  const navigateToSignUp = () => {
    router.replace("SignUp"); // Navigate to SignUpScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.desc}>Enter your email to reset your password</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      {!isCodeSent ? (
        <TouchableOpacity style={styles.btn} onPress={handleForgotPassword}>
          <Text style={styles.btnText}>Send Verification Code</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={enteredCode}
            onChangeText={setEnteredCode}
            placeholder="Verification Code"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.btn} onPress={handleVerifyCode}>
            <Text style={styles.btnText}>Verify Code</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.link} onPress={navigateToSignUp}>
        <Text style={styles.linkText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
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
  btn: {
    backgroundColor: "#1F1E53",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 15,
    color: "#ffffff",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#1F1E53",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
