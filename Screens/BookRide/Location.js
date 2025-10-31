import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function LocationBar() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        // Ask for permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "We need your location to continue.");
          setLoading(false);
          return;
        }

        // Get precise coordinates
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = currentLocation.coords;

        // Reverse geocode with more detail
        const [place] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (place) {
          // Detailed format: Street, Sector, City, Country
          const detailedLocation = `${place.name || place.street || ""}, ${
            place.district || place.subregion || place.region || ""
          }, ${place.city || place.subregion || ""}, ${place.country || ""}`.replace(
            /,\s*,/g,
            ","
          );

          setLocation(detailedLocation.trim());
        } else {
          setLocation(`${latitude.toFixed(3)}, ${longitude.toFixed(3)}`);
        }
      } catch (error) {
        console.error("Location error:", error);
        setLocation("Unable to fetch location");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handlePress = () => {
    // Navigate to Location2 and pass location as param
    navigation.navigate("Location2", { location });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.locationWrapper}
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={loading}
      >
        <Ionicons
          name="location-outline"
          size={20}
          color="#888"
          style={{ marginLeft: 10 }}
        />

        {loading ? (
          <ActivityIndicator size="small" color="#888" style={{ marginLeft: 10 }} />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="Detecting your location..."
            placeholderTextColor="#888"
            editable={false}
            pointerEvents="none"
            value={location}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  locationWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 10,
    height: 45,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#21292B",
  },
});
