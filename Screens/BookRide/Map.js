import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function MapScreen() {
  const navigation = useNavigation();
  const mapRef = useRef(null);

  const [location, setLocation] = useState(null);

  // Get device location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Optional: Move map to user location immediately
      if (mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          },
          zoom: 16,
        });
      }
    })();
  }, []);

  // Center map on user location
  const goToUserLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        zoom: 16,
      });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE} // ensures Google Maps on Android
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        showsCompass={false} // hide built-in compass, we’ll make custom
        zoomControlEnabled={false}
        scrollEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      />

      {/* Add Places Button */}
      {/* Add Places Button */}
<TouchableOpacity
  style={styles.addButton}
  onPress={() => navigation.navigate("AddPlaceScreen")}
>
  <Ionicons name="location-outline" size={24} color="#21292B" />
  <Text style={styles.addText}>Add Places</Text>
</TouchableOpacity>


      {/* Current Location Button */}
      {/* <TouchableOpacity style={styles.locationButton} onPress={goToUserLocation}>
        <Ionicons name="locate" size={20} color="white" />
      </TouchableOpacity> */}

      {/* Custom Compass */}
      {/* <View style={styles.compass}>
        <View style={styles.compassCircle}>
          <Ionicons name="compass" size={30} color="red" />
        </View>
      </View> */}
    </View>
  );
}

const BUTTON_SIZE = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  addButton: {
  position: "absolute",
  top: 5,
  left: 20, // 🔹 moved to left corner
  backgroundColor: "white",
  borderRadius: BUTTON_SIZE / 2,
  width: BUTTON_SIZE,
  height: BUTTON_SIZE,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},

  addText: {
    fontSize: 7,
    color: "#21292B",
    marginTop: 2,
    textAlign: "center",
  },
  locationButton: {
    position: "absolute",
    top: 100,
    right: 20,
    backgroundColor: "#21292B",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  compass: {
    position: "absolute",
    top: 60,
    right: 10,
  },
  compassCircle: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
