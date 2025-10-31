import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LocationSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ 1. Always get location from params (passed by LocationBar)
  useEffect(() => {
    const savedLocation = route.params?.location;
    if (savedLocation) {
      setCurrentLocation(savedLocation);
      setIsLoading(false);
    } else {
      (async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setCurrentLocation("Location permission denied");
            setIsLoading(false);
            return;
          }

          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });

          const [address] = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });

          // ✅ Improved Address Format — street, sector/subregion, city, country
          const street = address.name || address.street || "";
          const sector = address.subregion || address.district || "";
          const city = address.city || address.region || "";
          const country = address.country || "";

          const formattedAddress = [street, sector, city, country]
            .filter(Boolean)
            .join(", ");

          setCurrentLocation(formattedAddress || "Current Location");
        } catch (error) {
          console.error("GPS Error:", error);
          setCurrentLocation("Unable to fetch location");
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [route.params?.location]);

  // ✅ 2. Destination Search — Rwanda only
  const handleDestinationChange = async (text) => {
    setDestination(text);

    if (!text || text.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const apiKey = "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE";
        const country = "rw"; // Rwanda only
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
    }, 100);

    return () => clearTimeout(timeoutId);
  };

  const selectSuggestion = (item) => {
    setDestination(item.title);
    setSuggestions([]);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={25} color="#21292B" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Location</Text>
    </View>
  );

  const renderInputs = () => (
    <View style={{ marginTop: 30 }}>
      {/* From */}
      <View style={styles.inputWrapper}>
        <Ionicons name="location-sharp" size={20} color="#21292B" style={styles.icon} />
        <TextInput style={styles.input} value={currentLocation} editable={false} />
        {isLoading && <ActivityIndicator size="small" color="#21292B" style={{ marginLeft: 10 }} />}
      </View>

      {/* To */}
      <View style={styles.inputWrapper}>
        <Ionicons name="location-outline" size={20} color="#21292B" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={handleDestinationChange}
        />
      </View>
    </View>
  );

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionCard} onPress={() => selectSuggestion(item)}>
      <Text style={styles.suggestionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {renderInputs()}
          </>
        }
        renderItem={renderSuggestionItem}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 40,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* Next button fixed at bottom */}
      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            navigation.navigate("Location3", { from: currentLocation, to: destination })
          }
          disabled={!destination.trim()}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingBottom: 20 },
  backButton: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 17, fontWeight: "bold", marginLeft: 6, color: "#21292B" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    marginBottom: 15,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#21292B" },
  suggestionCard: {
    padding: 12,
    backgroundColor: "#f7f7f7",
    marginVertical: 4,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  suggestionText: { fontSize: 16, color: "#21292B" },
  nextButtonWrapper: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 20,
    left: 20,
    right: 20,
  },
  nextButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 0,
    alignItems: "center",
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
