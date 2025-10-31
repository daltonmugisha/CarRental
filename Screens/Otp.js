import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function OTPScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleKeyPress = (digit) => {
    let newOtp = [...otp];
    const index = newOtp.findIndex((v) => v === "");

    if (digit === "delete") {
      const lastIndex = newOtp.map((v, i) => (v !== "" ? i : -1)).filter(i => i >= 0).pop();
      if (lastIndex !== undefined) {
        newOtp[lastIndex] = "";
      }
    } else if (index !== -1) {
      newOtp[index] = digit;
    }
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#21292B" />
      </TouchableOpacity>

      {/* Title & Subtitle */}
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We have sent the verification code to your phone number and email provided.
      </Text>

      {/* OTP Boxes */}
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.otpBox}>
            <Text style={styles.otpText}>{digit}</Text>
          </View>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Main")}>
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Resend OTP (Only "Resend" clickable) */}
      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Didn’t receive the OTP?{" "}
          <Text style={styles.resendLink} onPress={() => alert("Resend OTP")}>
            Resend
          </Text>
        </Text>
      </View>

      {/* Custom Keypad (Aligned in Columns) */}
      <View style={styles.keypad}>
        <View style={styles.keypadColumn}>
          {["1", "4", "7"].map((key) => (
            <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadColumn}>
          {["2", "5", "8", "0"].map((key) => (
            <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadColumn}>
          {["3", "6", "9", "delete"].map((key) => (
            <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
              {key === "delete" ? (
                <Ionicons name="backspace-outline" size={28} color="#21292B" />
              ) : (
                <Text style={styles.keyText}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#21292B",
    marginTop: 40,
    marginBottom: 8,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    lineHeight: 20,
    textAlign: "left",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  otpBox: {
    width: 50,
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  otpText: {
    fontSize: 20,
    color: "#21292B",
    fontWeight: "bold",
  },
  primaryButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    marginBottom: 20,
  },
  resendText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  resendLink: {
    color: "#21292B",
    fontWeight: "bold",
  },
  keypad: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  keypadColumn: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  key: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  keyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#21292B",
  },
});
