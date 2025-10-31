import React, { useRef, useState, useEffect } from "react";
import { StatusBar, View, Text, TouchableOpacity, StyleSheet, Platform, Linking, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CancelRideModal from "./CancelRide"; // Adjust the import path as needed

export default function GetDriverScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);

  const { pickupLocation, destination, selectedRide, distanceKm } = route.params;

  const [pickupCoords, setPickupCoords] = useState({ latitude: -1.9496, longitude: 30.1263 });
  const [destinationCoords, setDestinationCoords] = useState({ latitude: -1.953, longitude: 30.1085 });
  const [driverCoords] = useState({ latitude: -1.951, longitude: 30.12 });
  const [driverRoute, setDriverRoute] = useState([]);
  const [userRoute, setUserRoute] = useState([]);
  const [isFetchingRoutes, setIsFetchingRoutes] = useState(true);
  const [driverETA, setDriverETA] = useState("Calculating...");
  const [mapType, setMapType] = useState("standard");
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  const driver = { name: "Menyamana David", car: "Black Kia Sorento" };
  const API_KEY = "AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE";

  const decodePolyline = (encoded) => {
    try {
      let points = [];
      let index = 0, lat = 0, lng = 0;
      while (index < encoded.length) {
        let b, shift = 0, result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const dlat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += dlat;
        shift = 0;
        result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const dlng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += dlng;
        points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
      }
      return points;
    } catch (error) {
      console.error("Polyline decode error:", error);
      return [];
    }
  };

  const calculateETA = (distanceMeters) => {
    const averageSpeedKmh = 50;
    const distanceKm = distanceMeters / 1000;
    const timeHours = distanceKm / averageSpeedKmh;
    const timeMinutes = Math.ceil(timeHours * 60);
    return `${timeMinutes} min${timeMinutes !== 1 ? "s" : ""}`;
  };

  const handleCallDriver = async () => {
    const phoneNumber = "tel:+250794377409";
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) await Linking.openURL(phoneNumber);
      else Alert.alert("Error", "Phone calls are not supported on this device.");
    } catch (error) {
      console.error("Error initiating call:", error);
      Alert.alert("Error", "Failed to initiate call. Please try again.");
    }
  };

  const handleCancelSubmit = (reason) => {
    console.log("Cancel reason:", reason);
    setModalVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    const fetchWithRetry = async (url, retries = 2, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.status === "OK") return data;
          throw new Error(`API error: ${data.status} - ${data.error_message || "Unknown error"}`);
        } catch (error) {
          console.error(`Attempt ${i + 1} failed:`, error);
          if (i < retries - 1) await new Promise((r) => setTimeout(r, delay));
          else throw error;
        }
      }
    };

    const geocodeAndFetchRoutes = async () => {
      try {
        setIsFetchingRoutes(true);
        let pickup = pickupCoords;
        if (pickupLocation !== "Kimironko Market") {
          const pickupUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(pickupLocation)}&key=${API_KEY}`;
          const pickupData = await fetchWithRetry(pickupUrl);
          if (pickupData.results[0]) {
            const loc = pickupData.results[0].geometry.location;
            pickup = { latitude: loc.lat, longitude: loc.lng };
            setPickupCoords(pickup);
          }
        }

        let dest = destinationCoords;
        if (destination !== "Amahoro Stadium") {
          const destUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${API_KEY}`;
          const destData = await fetchWithRetry(destUrl);
          if (destData.results[0]) {
            const loc = destData.results[0].geometry.location;
            dest = { latitude: loc.lat, longitude: loc.lng };
            setDestinationCoords(dest);
          }
        }

        const driverToPickupUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${driverCoords.latitude},${driverCoords.longitude}&destination=${pickup.latitude},${pickup.longitude}&key=${API_KEY}`;
        const driverData = await fetchWithRetry(driverToPickupUrl);
        let driverPoints = [];
        if (driverData.routes[0]) {
          driverPoints = decodePolyline(driverData.routes[0].overview_polyline.points);
          setDriverRoute(driverPoints);
          const distanceMeters = driverData.routes[0].legs[0].distance.value;
          setDriverETA(calculateETA(distanceMeters));
        } else setDriverETA("2 mins");

        const userRouteUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.latitude},${pickup.longitude}&destination=${dest.latitude},${dest.longitude}&key=${API_KEY}`;
        const userData = await fetchWithRetry(userRouteUrl);
        let userPoints = [];
        if (userData.routes[0]) {
          userPoints = decodePolyline(userData.routes[0].overview_polyline.points);
          setUserRoute(userPoints);
        }

        mapRef.current?.fitToCoordinates([...driverPoints, ...userPoints], {
          edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
          animated: true,
        });
      } catch (error) {
        console.error("Error geocoding/fetching routes:", error);
        setDriverRoute([driverCoords, pickupCoords]);
        setUserRoute([pickupCoords, destinationCoords]);
        setDriverETA("2 mins");
        mapRef.current?.fitToCoordinates([driverCoords, pickupCoords, destinationCoords], {
          edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
          animated: true,
        });
      } finally {
        setIsFetchingRoutes(false);
      }
    };

    geocodeAndFetchRoutes();
  }, [pickupLocation, destination]);

  return (
    <View style={{ flex: 1 }}>
      {/* Modal */}
      <CancelRideModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCancelSubmit}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Get Driver</Text>
            <TouchableOpacity
              style={styles.mapToggle}
              onPress={() => setMapType(mapType === "standard" ? "satellite" : "standard")}
            >
              <Ionicons name={mapType === "standard" ? "earth" : "map"} size={28} color="#21292B" />
            </TouchableOpacity>
          </View>
          <View style={styles.routeRow}>
            <View style={styles.fromContainer}>
              <Text style={styles.fromLabel}>From:</Text>
              <Text style={styles.fromLocation} numberOfLines={1}>
                {pickupLocation}
              </Text>
            </View>
            <View style={styles.toContainer}>
              <Text style={styles.toLabel}>To:</Text>
              <Text style={styles.toLocation} numberOfLines={1}>
                {destination}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.separator} />

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapType}
        initialRegion={{
          latitude: (pickupCoords.latitude + driverCoords.latitude) / 2,
          longitude: (pickupCoords.longitude + driverCoords.longitude) / 2,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        loadingEnabled={isFetchingRoutes}
      >
        <Marker coordinate={pickupCoords} title="Pickup" pinColor="blue" />
        <Marker coordinate={destinationCoords} title="Destination" pinColor="green" />
        <Marker coordinate={driverCoords} title="Driver">
          <Ionicons name="car" size={30} color="red" />
        </Marker>
        {driverRoute.length > 0 && (
          <Polyline coordinates={driverRoute} strokeColor="#FF0000" strokeWidth={4} />
        )}
        {userRoute.length > 0 && (
          <Polyline coordinates={userRoute} strokeColor="#4285F4" strokeWidth={4} />
        )}
      </MapView>

      {/* Bottom driver card */}
      <View style={styles.driverCard}>
        <View style={styles.driverCircle}>
          <Text style={styles.driverInitials}>
            {driver.name.split(" ").map((n) => n[0]).join("")}
          </Text>
        </View>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverCar}>{driver.car}</Text>
          <Text style={styles.driverETA}>{driverETA} away</Text>
        </View>
        <TouchableOpacity style={styles.callButton} onPress={handleCallDriver}>
          <Ionicons name="call" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {flexDirection: "row",alignItems: "flex-start",paddingTop: Platform.OS === "ios" ? 50 : 40,
  paddingHorizontal: 10,backgroundColor: "white",zIndex: 10,},
  headerContent: { flex: 1, marginLeft: 10 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 17, fontWeight: "bold", color: "#21292B" },
  mapToggle: { marginLeft: 10 },
  routeRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 ,marginBottom: 10,},
  fromContainer: { flex: 1, marginRight: 20 },
  toContainer: { flex: 1 },
  fromLabel: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  fromLocation: { fontSize: 14, color: "#666" },
  toLabel: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  toLocation: { fontSize: 14, color: "#666" },
  map: { flex: 1 },
  driverCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  driverCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#21292B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  driverInitials: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  driverInfo: { flex: 1 },
  driverName: { fontWeight: "bold", fontSize: 16, color: "#21292B" },
  driverCar: { color: "#666", fontSize: 14, marginTop: 2 },
  driverETA: { color: "#FF0000", fontSize: 13, marginTop: 2 },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#28A745",
    alignItems: "center",
    justifyContent: "center",
  },
});