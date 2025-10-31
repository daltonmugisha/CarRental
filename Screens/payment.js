// Screens/payment.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PaymentScreen() {
  const navigation = useNavigation(); // No generics

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      {/* SUBTITLE */}
      <Text style={styles.subtitle}>Available Payment Methods</Text>

      {/* PAYMENT METHOD ITEM */}
      <TouchableOpacity
        style={styles.methodRow}
        onPress={() => navigation.navigate("MyPayments")}
      >
        <View style={styles.leftSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={11} color="#fff" />
          </View>
          <FontAwesome5
            name="coins"
            size={20}
            color="#333"
            style={styles.iconMargin}
          />
          <Text style={styles.methodText}>Money Transfer</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>

      <View style={styles.separator} />

      {/* ADD NEW PAYMENT METHOD */}
      <TouchableOpacity
        style={styles.methodRow}
        onPress={() => navigation.navigate("NewPayment")}
      >
        <View style={styles.leftSection}>
          <Ionicons
            name="add"
            size={22}
            color="#333"
            style={styles.iconMarginLeft}
          />
          <Text style={styles.addText}>Add New Payment Method</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#999" />
      </TouchableOpacity>

      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 18,
    height: 18,
    borderRadius: 14,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  iconMargin: {
    marginHorizontal: 12,
  },
  iconMarginLeft: {
    marginLeft: 30,
    marginRight: 12,
  },
  methodText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "500",
  },
  addText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
});