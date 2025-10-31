import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MyPaymentsDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const payment = route.params?.payment;

  // State for feedback buttons
  const [feedback, setFeedback] = useState(null); // 'agree' or 'claim'

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={26}
          color="#21292B"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Payment Details</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Card: Ride Details */}
        <View style={styles.card}>
          <Text style={styles.title}>Service</Text>
          <Text style={styles.paragraph}>
            {payment.service} on {payment.date}. You took the ride from{" "}
            {payment.pickup} to {payment.dropoff} in a standard car. Duration:{" "}
            10 minutes.
          </Text>

          <Text style={styles.title}>Driver</Text>
          <Text style={styles.paragraph}>
            Your ride was handled by {payment.driver}.
          </Text>

          <Text style={styles.title}>Price</Text>
          <Text style={styles.paragraph}>{payment.amount}</Text>

          <Text style={styles.title}>Payment Method</Text>
          <Text style={styles.paragraph}>{payment.method}</Text>

          <Text style={styles.title}>Status</Text>
          <Text
            style={[
              styles.paragraph,
              payment.status === "Success"
                ? { color: "#00B67A" }
                : payment.status === "Failed"
                ? { color: "red" }
                : { color: "#FFA500" },
            ]}
          >
            {payment.status}
          </Text>

          <Text style={styles.title}>Notes</Text>
          <Text style={styles.paragraph}>{payment.notes}</Text>
        </View>

        {/* Card: Feedback Section */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>
            Rate this ride or claim if something went wrong
          </Text>

          <View style={styles.feedbackContainer}>
            <TouchableOpacity
              style={[
                styles.feedbackBtn,
                feedback === "agree" && { backgroundColor: "#00B67A" },
              ]}
              onPress={() => setFeedback("agree")}
            >
              <Text
                style={[
                  styles.feedbackText,
                  feedback === "agree" && { color: "#fff" },
                ]}
              >
                Agree
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.feedbackBtn,
                feedback === "claim" && { backgroundColor: "red" },
              ]}
              onPress={() => setFeedback("claim")}
            >
              <Text
                style={[
                  styles.feedbackText,
                  feedback === "claim" && { color: "#fff" },
                ]}
              >
                Claim
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fb" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 17, fontWeight: "600", color: "#21292B", marginLeft: 10 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },

  paragraph: {
    fontSize: 15,
    color: "#21292B",
    marginTop: 4,
    lineHeight: 22,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },

  feedbackContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  feedbackBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },

  feedbackText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#21292B",
  },
});
