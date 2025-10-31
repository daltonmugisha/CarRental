// Screens/Auth/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PADDING_HORIZONTAL = 20; // reusable padding

export default function LoginScreen() {
  const navigation = useNavigation(); // No generics

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Welcome back{"\n"}to GoSnap</Text>
      <Text style={styles.subtitle}>
        Please we request you login credentials {"\n"}to continue to your GoSnap account
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
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

      {/* Remember Me and Forgot Password */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.rememberText}>Remember Me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Social Login Buttons */}
      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => console.log("Google Login")}
      >
        <Image source={require("../assets/google.png")} style={styles.socialIcon} />
        <Text style={styles.socialText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.socialButton}
        onPress={() => console.log("Apple Login")}
      >
        <Image source={require("../assets/appl.png")} style={styles.socialIcon} />
        <Text style={[styles.socialText, { color: "#000" }]}>Login with Apple</Text>
      </TouchableOpacity>

      {/* Signup Redirect */}
      <View style={styles.signupContainer}>
        <Text style={{ color: "#888" }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{ color: "#21292B", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING_HORIZONTAL,
    justifyContent: "flex-start",
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  title: { fontSize: 25, fontWeight: "bold", color: "#21292B", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#21292B", marginBottom: 20, lineHeight: 22 },
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
  passwordInput: { flex: 1, color: "#21292B", height: "100%" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#21292B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: { backgroundColor: "#21292B" },
  rememberText: { color: "#21292B" },
  forgotText: { color: "#21292B", fontWeight: "bold" },
  loginButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    height: 50,
    justifyContent: "center",
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  separatorContainer: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  line: { flex: 1, height: 1, backgroundColor: "#D7D7D7" },
  orText: { marginHorizontal: 10, color: "#888", fontWeight: "bold" },
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
  socialIcon: { width: 22, height: 24, marginRight: 10 },
  socialText: { color: "#000", fontSize: 16, fontWeight: "bold", textAlign: "center", flex: 1 },
  signupContainer: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
});