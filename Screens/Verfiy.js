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

export default function VerifyPhone({ navigation }) {
  const [phone, setPhone] = useState("");

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
      <Text style={styles.title}>Verify Your Phone Number</Text>
      <Text style={styles.subtitle}>
        Please confirm your country and enter your phone number.
      </Text>

      {/* Country Row */}
      <View style={styles.countryRow}>
        <Image
          source={require("../assets/rw.jpeg")} // Rwanda flag image
          style={styles.flagIcon}
        />
        <Text style={styles.countryText}>Rwanda</Text>
      </View>

      {/* Phone Row */}
      <View style={styles.phoneRow}>
        <Text style={styles.countryCode}>+250</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter phone number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("Otp")} // navigate to OTP screen
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#21292B",
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    lineHeight: 20,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  flagIcon: {
    width: 25,
    height: 18,
    marginRight: 10,
    borderRadius: 2,
  },
  countryText: {
    fontSize: 16,
    color: "#21292B",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  countryCode: {
    fontSize: 16,
    color: "#21292B",
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    color: "#000",
    height: "100%",
    fontSize: 15,
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
});
