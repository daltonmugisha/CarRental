import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

const AirportShuttleScreen = ({ navigation }) => {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [destination, setDestination] = useState("");
  const [flightInfo, setFlightInfo] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  // 📍 Fixed pickup location details
  const pickupLocation = {
    name: "Kigali International Airport (Kanombe)",
    latitude: -1.9686,
    longitude: 30.1395,
  };

  // 🕒 Date & Time handler
  const handleDateChange = (event, selectedDate) => {
    if (event?.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(false);
    setPickupDate(selectedDate || pickupDate);
    setShowTimePicker(true); // open time picker immediately
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event?.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }
    setShowTimePicker(false);
    const updatedDate = new Date(pickupDate);
    updatedDate.setHours(selectedTime.getHours());
    updatedDate.setMinutes(selectedTime.getMinutes());
    setPickupDate(updatedDate);
  };

  // 🌍 Google Places Autocomplete
  const handleDestinationChange = async (text) => {
    setDestination(text);
    if (!text || text.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const apiKey = "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE";
      const country = "rw";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          text
        )}&components=country:${country}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const apiSuggestions = data.predictions.map((item) => ({
          id: item.place_id,
          title: item.description,
        }));
        setSuggestions(apiSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setSuggestions([]);
    }
  };

  const selectSuggestion = (item) => {
    setDestination(item.title);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  // ✅ Continue Button Press
  const handleContinue = () => {
    if (!destination || !flightInfo) {
      alert("Please fill all required fields!");
      return;
    }

    navigation.navigate("RouteAirport", {
      pickupLocation,
      destination,
      pickupDateTime: pickupDate.toString(),
      flightInfo,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* 🧭 Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Airport Shuttle</Text>
      </View>

      {/* 🧾 Main Content */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* 📍 Pickup Location */}
        <Text style={styles.label}>Pickup Location</Text>
        <View style={[styles.input, styles.disabledInput]}>
          <Text style={styles.disabledText}>{pickupLocation.name}</Text>
        </View>

        {/* 🚗 Destination Field */}
        <Text style={styles.label}>Destination</Text>
        <View>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Type your destination"
            value={destination}
            onChangeText={handleDestinationChange}
          />

          {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
              {suggestions.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.suggestionItem}
                  onPress={() => selectSuggestion(item)}
                >
                  <Text style={styles.suggestionText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* 📅 Pickup Date & Time */}
        <Text style={styles.label}>Pickup Date & Time</Text>
        <TouchableOpacity style={styles.inputRow} onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar-outline" size={18} color="#666" style={{ marginRight: 10 }} />
          <Text style={styles.inputText}>
            {pickupDate.toLocaleString([], {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={pickupDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={pickupDate}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* ✈️ Flight Information */}
        <Text style={styles.label}>Flight Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter flight number or details"
          value={flightInfo}
          onChangeText={setFlightInfo}
        />
      </ScrollView>

      {/* 🚀 Continue Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={handleContinue}>
        <Text style={styles.bottomButtonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AirportShuttleScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fb" },
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
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#eee",
    color: "#21292B",
  },
  disabledInput: {
    backgroundColor: "#f1f1f1",
  },
  disabledText: {
    color: "#888",
    fontSize: 15,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  inputText: {
    fontSize: 15,
    color: "#21292B",
  },
  suggestionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginTop: 5,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: { fontSize: 14, color: "#21292B" },
  bottomButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
