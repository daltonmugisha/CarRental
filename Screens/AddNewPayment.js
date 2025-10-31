// Screens/Payment/AddPaymentScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AddPaymentScreen() {
  const navigation = useNavigation(); // No generics
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = () => {
    if (phoneNumber.length < 9) {
      Alert.alert("Invalid Number", "Please enter a valid 9-digit phone number.");
      return;
    }

    const fullNumber = `+250${phoneNumber}`;
    console.log("Saved Payment Number:", fullNumber);

    Alert.alert("Payment Method Saved", `Phone: ${fullNumber}`, [
      { text: "OK", onPress: () => navigation.navigate("PaymentMethods") },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back"
          size={25}
          color="#21292B"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Add New Number</Text>
      </View>

      {/* Content */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneContainer}>
          <View style={styles.prefixContainer}>
            <Text style={styles.prefixText}>+250</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="7XXXXXXXX"
            keyboardType="numeric"
            maxLength={9}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleSave}>
          <Text style={styles.addButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#21292B",
    marginLeft: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#21292B",
    marginBottom: 6,
    marginTop: 16,
  },

  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  prefixContainer: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  prefixText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#21292B",
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#21292B",
  },

  addButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});