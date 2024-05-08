import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../utils/Auth";

export default function Login() {
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (user != null) router.replace("/home");
  }, []);

  const logIn = async () => {
    try {
      setEmailError(false);
      setPasswordError(false);

      if (!email || !password) {
        alert("Please fill all the fields");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError(true);
        return;
      }

      await signIn(email, password).then(() => {
        router.replace("/home");
      });
    } catch (error) {
        setEmailError(true);
        setPasswordError(true)
    
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in Here</Text>
      <Text style={styles.desc}>Welcome back, you've been missed!</Text>
      <TextInput
        style={[styles.input, emailError && styles.inputError]}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setEmailError(false); // Clear error when user types
        }}
        placeholder="Email"
      />
      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(false); // Clear error when user types
        }}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.fpw}
        onPress={() => router.replace("/auth/fpw")}
      >
        <Text style={styles.fpwbtn}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logIn}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Sign in</Text>
        </View>
      </TouchableOpacity>

      <View>
        <Link href={"/auth/signup"}>
          <Text style={styles.cnabtn}>Don't have an account yet? Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
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
    fontSize: 15,
    marginBottom: 40,
  },
  input: {
    width: "80%",
    padding: 10,
    paddingVertical: 15,
    backgroundColor: "#F1F4FF",
    marginBottom: 5,
    borderRadius: 10,
    color: "#626262",
    borderWidth: 1,
    borderColor: "#cccccc",
    marginTop: 10,
  },
  inputError: {
    borderColor: "red",
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
  fpw: {
    alignSelf: "flex-end",
    marginRight: "10%",
    marginTop: 5,
  },
  fpwbtn: {
    color: "#1F41BB",
  },
  cnaText: {
    color: "#494949",
    marginTop: 5,
  },
  cnabtn: {
    color: "#494949",
    marginTop: 5,
  },
  orwText: {
    color: "#1F41BB",
    marginTop: 50,
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
