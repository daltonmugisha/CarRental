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

export default function TripDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const trip = route.params?.trip;

  if (!trip) {
    return (
      <View style={styles.container}>
        <Text>Trip not found</Text>
      </View>
    );
  }

  const [feedback, setFeedback] = useState(null);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={26} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trip to {trip.dropoff}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* TRIP SUMMARY CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Trip Summary</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value}>{trip.date} • {trip.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Status</Text>
            <View style={[
              styles.statusPill,
              trip.status === "Completed" ? styles.completed :
              trip.status === "Cancelled" ? styles.cancelled : styles.pending
            ]}>
              <Text style={styles.statusPillText}>{trip.status}</Text>
            </View>
          </View>

          {trip.duration && (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Duration</Text>
                <Text style={styles.value}>{trip.duration}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.label}>Distance</Text>
                <Text style={styles.value}>{trip.distance}</Text>
              </View>
            </>
          )}
        </View>

        {/* ROUTE CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Route</Text>
          <View style={styles.routeBox}>
            <View style={styles.dotLine}>
              <View style={styles.greenDot} />
              <View style={styles.line} />
              <View style={styles.redDot} />
            </View>
            <View style={styles.locations}>
              <Text style={styles.pickupText}>{trip.pickup}</Text>
              <Text style={styles.dropoffText}>{trip.dropoff}</Text>
            </View>
          </View>
        </View>

        {/* DRIVER & VEHICLE */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Driver & Vehicle</Text>
          <Text style={styles.driverName}>{trip.driver}</Text>
          <Text style={styles.carInfo}>{trip.car} • {trip.plate}</Text>
          {trip.rating && (
            <Text style={styles.ratingText}>⭐ {trip.rating} Driver Rating</Text>
          )}
        </View>

        {/* TIMELINE */}
        {(trip.pickupTime || trip.cancelledAt) && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Timeline</Text>
            {trip.pickupTime && (
              <>
                <Text style={styles.timeline}>Pickup: {trip.pickupTime}</Text>
                <Text style={styles.timeline}>Dropoff: {trip.dropoffTime}</Text>
                <Text style={styles.timeline}>Waited: {trip.waitedTime}</Text>
              </>
            )}
            {trip.cancelledAt && (
              <Text style={styles.timeline}>Cancelled at: {trip.cancelledAt}</Text>
            )}
            {trip.estimatedArrival && (
              <Text style={styles.timeline}>ETA: {trip.estimatedArrival}</Text>
            )}
          </View>
        )}

        {/* PAYMENT CARD */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Fare</Text>
            <Text style={styles.price}>{trip.fare} RWF</Text>
          </View>
          {trip.promoApplied && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Promo</Text>
              <Text style={styles.value}>{trip.promoApplied}</Text>
            </View>
          )}
          {trip.cancellationFee && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Cancellation Fee</Text>
              <Text style={styles.value}>{trip.cancellationFee}</Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Paid with</Text>
            <Text style={styles.value}>{trip.paymentMethod || "Pending"}</Text>
          </View>
        </View>

        {/* NOTES */}
        {trip.notes && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notes}>{trip.notes}</Text>
          </View>
        )}

        {/* FEEDBACK */}
        {trip.status === "Completed" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Rate Your Ride</Text>
            <Text style={styles.subtitle}>How was your experience?</Text>
            <View style={styles.feedbackContainer}>
              <TouchableOpacity
                style={[styles.feedbackBtn, feedback === "great" && styles.greatBtn]}
                onPress={() => setFeedback("great")}
              >
                <Text style={[styles.feedbackText, feedback === "great" && styles.whiteText]}>
                  Great
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.feedbackBtn, feedback === "okay" && styles.okayBtn]}
                onPress={() => setFeedback("okay")}
              >
                <Text style={[styles.feedbackText, feedback === "okay" && styles.whiteText]}>
                  Okay
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.feedbackBtn, feedback === "bad" && styles.badBtn]}
                onPress={() => setFeedback("bad")}
              >
                <Text style={[styles.feedbackText, feedback === "bad" && styles.whiteText]}>
                  Bad
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#21292B",
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { fontSize: 14, color: "#666" },
  value: { fontSize: 14, color: "#21292B", fontWeight: "500" },
  price: { fontSize: 18, fontWeight: "bold", color: "#21292B" },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  completed: { backgroundColor: "#E8F5E9", borderWidth: 1, borderColor: "#4CAF50" },
  cancelled: { backgroundColor: "#FFEBEE", borderWidth: 1, borderColor: "#FF5252" },
  pending: { backgroundColor: "#FFF3E0", borderWidth: 1, borderColor: "#FFA500" },
  statusPillText: { fontSize: 12, fontWeight: "bold", color: "#21292B" },
  routeBox: { flexDirection: "row", alignItems: "center" },
  dotLine: { alignItems: "center", marginRight: 12 },
  greenDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#4CAF50" },
  redDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#FF5252", marginTop: 20 },
  line: { width: 2, height: 30, backgroundColor: "#ddd", marginVertical: 4 },
  locations: { flex: 1 },
  pickupText: { fontSize: 15, fontWeight: "600", color: "#21292B" },
  dropoffText: { fontSize: 15, fontWeight: "600", color: "#21292B", marginTop: 20 },
  driverName: { fontSize: 18, fontWeight: "bold", color: "#21292B" },
  carInfo: { fontSize: 14, color: "#666", marginTop: 4 },
  ratingText: { fontSize: 14, color: "#FFA500", marginTop: 8 },
  timeline: { fontSize: 14, color: "#444", marginBottom: 6 },
  notes: { fontSize: 14, color: "#21292B", lineHeight: 22 },
  subtitle: { fontSize: 13, color: "#666", marginBottom: 12 },
  feedbackContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  feedbackBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 4,
    alignItems: "center",
  },
  greatBtn: { backgroundColor: "#00B67A", borderColor: "#00B67A" },
  okayBtn: { backgroundColor: "#FFA500", borderColor: "#FFA500" },
  badBtn: { backgroundColor: "#FF5252", borderColor: "#FF5252" },
  feedbackText: { fontSize: 15, fontWeight: "600", color: "#21292B" },
  whiteText: { color: "#fff" },
});