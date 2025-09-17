import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      return Alert.alert("Error", "Please enter both phone number and password");
    }

    try {
      const response = await fetch("https://safrokelapi.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      if (response.status === 404) {
        Alert.alert("Error", "Phone number does not exist");
      } else if (response.status === 401) {
        Alert.alert("Error", "Incorrect password");
      } else if (response.status === 200) {
        // Save user data to AsyncStorage
        await AsyncStorage.setItem("userName", data.user.fullName);
        await AsyncStorage.setItem("userPhone", data.user.phoneNumber);

        Alert.alert("Success", "Login successful", [
          { text: "OK", onPress: () => navigation.navigate("HomeTabs") },
        ]);
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background.jpg")} // put your image in assets folder
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        {/* Email */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Log In Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin()}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.signInLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // dark overlay for readability
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: "#000",
  },
  eyeButton: {
    padding: 10,
  },
  forgotPassword: {
    fontSize: 13,
    color: "#fff",
    textDecorationLine: "underline",
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: "#444c5c",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    color: "#333",
  },
  signInLink: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
