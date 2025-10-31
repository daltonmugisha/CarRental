// Screens/SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!fullName.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return false;
    }
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (!phone.trim() || phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return false;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = () => {
    if (validateForm()) {
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Main", { screen: "Home" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={26} color="#21292B" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Create your{"\n"}GoSnap Account</Text>
        <Text style={styles.subtitle}>
          Fill in your details below{"\n"}to create a new GoSnap account
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.phoneContainer}>
          <Image
            source={require("../assets/rw.jpeg")}
            style={styles.flagIcon}
            onError={() => console.log("Flag image failed to load")}
          />
          <Text style={styles.countryCode}>+250</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Phone Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>

        {/* === OR Separator === */}
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* === Google Login === */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => console.log("Continue with Google")}
        >
          <Image source={require("../assets/google.png")} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* === Apple Login === */}
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => console.log("Continue with Apple")}
        >
          <Image source={require("../assets/appl.png")} style={styles.socialIcon} />
          <Text style={[styles.socialText, { color: "#000" }]}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* === Already have account? === */}
        <View style={styles.loginRedirect}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const PADDING_HORIZONTAL = 20;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    marginBottom: 10,
    marginTop: 20,
    marginLeft: -4,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#21292B",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#21292B",
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 15,
    color: "#21292B",
    height: 50,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 15,
  },
  flagIcon: {
    width: 25,
    height: 18,
    marginRight: 8,
    borderRadius: 2,
  },
  countryCode: {
    fontSize: 16,
    color: "#21292B",
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    color: "#21292B",
    height: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: "#21292B",
    height: "100%",
  },
  signupButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    height: 50,
    justifyContent: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // OR Separator
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D7D7D7",
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    fontWeight: "bold",
  },

  // Social Buttons
  socialButton: {
    backgroundColor: "#EDEDED",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  socialIcon: {
    width: 22,
    height: 24,
    marginRight: 10,
  },
  socialText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },

  // Login Redirect
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#888",
  },
  loginLink: {
    color: "#21292B",
    fontWeight: "bold",
  },
});