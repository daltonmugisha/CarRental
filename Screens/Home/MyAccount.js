import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MyAccountScreen() {
  const navigation = useNavigation();

  // Account options list
  const accountOptions = [
    {
      title: "My Profile",
      icon: "person-outline",
      navigateTo: "MyProfile",
    },
    {
      title: "My Payments",
      icon: "card-outline",
      navigateTo: "MyPayments",
    },
    {
      title: "Trip History",
      icon: "time-outline",
      navigateTo: "TripHistoryScreen",
    },
    {
      title: "Airport Shuttle",
      icon: "car-outline",
      navigateTo: "Airport",
    },
  ];

  return (
    <View style={styles.container}>
      {/* ✅ Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>

      {/* ✅ Options List */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Account Options</Text>
        {accountOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => navigation.navigate(option.navigateTo)}
          >
            <View style={styles.rowLeft}>
              <Ionicons name={option.icon} size={22} color="#21292B" style={styles.icon} />
              <Text style={styles.optionLabel}>{option.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },

  /* ✅ Header */
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
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#21292B",
  },

  /* ✅ Content Area */
  content: {
    padding: 16,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 10,
  },

  /* ✅ Option Row */
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#21292B",
  },
});
