import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for arrow back

export default function ForgotPassword({ navigation }) {
  const [emailOrPhone, setEmailOrPhone] = useState("");

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#21292B" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email or phone number and we’ll send you a verification code.
      </Text>

      {/* Input */}
      <TextInput
        style={styles.input}
        placeholder="Email or Phone Number"
        placeholderTextColor="#aaa"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
      />

      {/* Send Verification Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
            navigation.navigate("Verify"); 
        }}
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Return to Sign In */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>Return to Sign In</Text>
      </TouchableOpacity>

      {/* Create new account */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.bottomText}>Create New Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 17,
    padding: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#21292B",
    marginBottom: 10,
    textAlign: "left",
    marginTop: 40, // space after arrow
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    lineHeight: 20,
    textAlign: "left",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 14,
    color: "#000",
  },
  primaryButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    height: 50, 
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    marginBottom: 20,
  },
  linkText: {
    color: "#21292B",
    fontSize: 14,
    textAlign: "center",
  },
  bottom: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bottomText: {
    color: "#21292B",
    fontSize: 15,
    fontWeight: "bold",
  },
});
