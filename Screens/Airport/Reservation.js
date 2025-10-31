import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ReservationAirportScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Get reservation data from previous screen
  const reservation = route.params || {};
  const ride = reservation.selectedRide || {};

  // Personal info fields (editable)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState("");
  const [note, setNote] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Trip info fields (read-only, pre-filled from reservation)
  const [pickupLocation, setPickupLocation] = useState(reservation.pickupLocation || "");
  const [destination, setDestination] = useState(reservation.destination || "");
  const [flightNumber, setFlightNumber] = useState(reservation.flightInfo || "");
  const [pickupDate, setPickupDate] = useState(reservation.pickupDateTime ? new Date(reservation.pickupDateTime) : new Date());
  const [pickupTime, setPickupTime] = useState(reservation.pickupDateTime ? new Date(reservation.pickupDateTime) : new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const validateForm = () => {
    if (!fullName.trim()) return Alert.alert("Required", "Enter your full name");
    if (!email.includes("@")) return Alert.alert("Invalid", "Enter a valid email");
    if (!phone.trim() || phone.length < 10)
      return Alert.alert("Invalid", "Enter a valid phone number");
    if (!passengers.trim()) return Alert.alert("Required", "Enter number of passengers");
    if (!agreeTerms) return Alert.alert("Required", "You must agree to the Terms & Conditions");
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    Alert.alert(
      "Reservation Confirmed 🎉",
      `Your airport shuttle booking has been received.\n\nPickup: ${pickupLocation}\nDestination: ${destination}\nRide: ${ride.name}\nDistance: ${reservation.distanceKm?.toFixed(2)} km\nPickup: ${pickupDate.toDateString()} ${pickupTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Airport Shuttle Reservation</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Trip Info Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="car-outline" size={20} color="#21292B" />
            <Text style={styles.sectionTitle}>Trip Information</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pickup Location</Text>
            <TextInput
              style={styles.input}
              value={pickupLocation}
              editable={false}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={styles.input}
              value={destination}
              editable={false}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Pickup Date</Text>
              <TextInput
                style={styles.input}
                value={pickupDate.toDateString()}
                editable={false}
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Pickup Time</Text>
              <TextInput
                style={styles.input}
                value={pickupTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                editable={false}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ride Selected</Text>
            <TextInput
              style={styles.input}
              value={ride.name || ""}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Distance</Text>
            <TextInput
              style={styles.input}
              value={reservation.distanceKm ? reservation.distanceKm.toFixed(2) + " km" : ""}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Flight Info</Text>
            <TextInput
              style={styles.input}
              value={flightNumber}
              editable={false}
            />
          </View>
        </View>

        {/* Personal Info Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={20} color="#21292B" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="+250 7XX XXX XXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Passengers *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 2"
              value={passengers}
              onChangeText={setPassengers}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Additional Notes</Text>
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              placeholder="Any special request or flight info..."
              multiline
              value={note}
              onChangeText={setNote}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Terms Agreement */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
            {agreeTerms && <Ionicons name="checkmark" size={18} color="#fff" />}
          </View>
          <Text style={styles.checkboxText}>
            I agree to the{" "}
            <Text style={styles.link}>Terms & Conditions</Text> and{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="car-sport" size={20} color="#fff" />
          <Text style={styles.submitText}>Confirm Reservation</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
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
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#21292B",
    marginLeft: 10,
  },
  scrollView: { flex: 1 },
  section: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#21292B", marginLeft: 8 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#21292B", marginBottom: 8 },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#21292B",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  dateText: { marginLeft: 8, color: "#21292B", fontSize: 15 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: "#21292B",
    borderColor: "#21292B",
  },
  checkboxText: { color: "#21292B", fontSize: 14, flex: 1 },
  link: { color: "#2196F3", fontWeight: "600", textDecorationLine: "underline" },
  submitButton: {
    backgroundColor: "#21292B",
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  submitText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
