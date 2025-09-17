import React, { useState } from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,CheckBox,Image,ImageBackground, Alert} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState("");
  const [loading, setLoading] = useState(false);

  //continue
  const handleSignUp = async() =>{
    if (!fullName || !phoneNumber || !password) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    if (phoneNumber.length < 10) {
      return Alert.alert("Error", "Please enter a valid phone number");
    }
    if (password.length < 6) {
      return Alert.alert("Error", "Password must be at least 6 characters");
    }

    setLoading(true);

    // Simulate an API call
    try {
      const response = await fetch('https://safrokelapi.onrender.com/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({fullName,phoneNumber,password}),
      });

      const data = await response.json();
      
     if (response.status === 201) {
      const savedUser = data.user;
      // save fullName to storage
      await AsyncStorage.setItem("userName", savedUser.fullName);
      
    Alert.alert("Success", "Account created successfully", [
      { text: "OK", onPress: () => navigation.navigate("HomeTabs") },
    ]);
    } else if (response.status === 400 && data.error === "User already exists") {
      Alert.alert("Error", "Number already exists");
    } else {
      Alert.alert("Error", data.error || "Something went wrong");
    }

    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
          source={require("../assets/background.jpg")} // put your image in assets folder
          style={styles.background}
          resizeMode="cover"
        >
            <View style={styles.overlay} />
            
    <SafeAreaView style={styles.container}>
       <View style={styles.imagePlaceholder}>
        <Image
          source={require("../assets/logo.jpg")} // put your logo in assets folder
          style={{ width: 160, height: 160 ,borderRadius:80 }}
          resizeMode="cover"
        />
      </View>

      {/* Header Text */}
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Create an account</Text>

       {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
        keyboardType="default"
      />
        {/* Phone Number */}
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#aaa"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter password"
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

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => handleSignUp()}
      >
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>


      {/* Already have an account */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.signInLink}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)", // dark overlay for readability
  },
  imagePlaceholder: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: "#000",
  },
  eyeButton: {
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#000000ff",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpText: {
    color: "#ffffffff",
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

export default SignUpScreen;
