import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function RouteAirportScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    pickupLocation: passedPickupLocation = { name: "Kigali International Airport (Kanombe)", latitude: -1.9686, longitude: 30.1395 },
    destination: passedDestination = "Downtown Kigali",
    pickupDateTime,
    flightInfo,
  } = route.params || {};

  const mapRef = useRef(null);

  const [pickupLocation, setPickupLocation] = useState(passedPickupLocation.name);
  const [destination, setDestination] = useState(passedDestination);
  const [pickupCoords, setPickupCoords] = useState({ latitude: passedPickupLocation.latitude, longitude: passedPickupLocation.longitude });
  const [destinationCoords, setDestinationCoords] = useState({ latitude: -1.9530, longitude: 30.1085 });
  const [routeCoords, setRouteCoords] = useState([]);
  const [selectedRide, setSelectedRide] = useState(0);
  const [mapType, setMapType] = useState('standard');
  const [isGeocoding, setIsGeocoding] = useState(true);
  const [distanceKm, setDistanceKm] = useState(0);

  const rides = [
    { id: 1, name: "Economy\n(Sorento)", ratePerKm: 1000 },
    { id: 2, name: "VIP\n(Santa Fe)", ratePerKm: 1500 },
    { id: 3, name: "Luxury\n(Landcruiser)", ratePerKm: 2000 },
  ];

  const API_KEY = 'AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE';

  const truncateLocation = (text, maxLength = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const calculatePrice = (ratePerKm, km) => {
    if (km === 0) return '0 Rwf';
    const total = Math.round(ratePerKm * km / 100) * 100;
    return total.toLocaleString() + ' Rwf';
  };

  const getCurrentPrice = () => {
    const ride = rides[selectedRide];
    return calculatePrice(ride.ratePerKm, distanceKm);
  };

  const handleReservation = () => {
  const reservationData = {
    pickupLocation,
    destination,
    selectedRide: rides[selectedRide],
    distanceKm,
    pickupDateTime,
    flightInfo,
  };

  console.log('Reservation made:', reservationData);

  alert(
    `Reservation made for ${rides[selectedRide].name} - Estimate: ${getCurrentPrice()}. Pay after journey.`
  );

  navigation.navigate('AirportReservation', reservationData);
};


  useEffect(() => {
    const geocodeAndFetch = async () => {
      try {
        setIsGeocoding(true);

        // Use passed pickup coords directly (no geocoding for airport)
        // let pickup = pickupCoords; // Already set from params

        let dest = destinationCoords;
        if (destination) {
          const destRes = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${API_KEY}`
          );
          const destData = await destRes.json();
          if (destData.results[0]) {
            const loc = destData.results[0].geometry.location;
            dest = { latitude: loc.lat, longitude: loc.lng };
          }
        }
        setDestinationCoords(dest);

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickupCoords.latitude},${pickupCoords.longitude}&destination=${dest.latitude},${dest.longitude}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes[0]) {
          const primaryPoints = decodePolyline(data.routes[0].overview_polyline.points);
          setRouteCoords(primaryPoints);
          const distanceMeters = data.routes[0].legs[0].distance.value;
          setDistanceKm(distanceMeters / 1000);
        }
      } catch (error) {
        console.error('Error geocoding/fetching directions:', error);
      } finally {
        setIsGeocoding(false);
      }
    };
    geocodeAndFetch();
  }, [destination, pickupCoords]);

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
        const dlat = (result & 1) ? ~(result >> 1) : result >> 1;
        lat += dlat;

        shift = 0;
        result = 0;
        do {
          b = encoded.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const dlng = (result & 1) ? ~(result >> 1) : result >> 1;
        lng += dlng;

        points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
      }
      return points;
    } catch (error) {
      console.error('Polyline decode error:', error);
      return [];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Airport Shuttle</Text>
            <TouchableOpacity onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')} style={styles.mapToggle}>
              <Ionicons name={mapType === 'standard' ? "earth" : "map"} size={28} color="#21292B" />
            </TouchableOpacity>
          </View>
          <View style={styles.routeRow}>
            <View style={styles.fromContainer}>
              <Text style={styles.fromLabel}>From:</Text>
              <Text style={styles.fromLocation} numberOfLines={1} ellipsizeMode="tail">{truncateLocation(pickupLocation)}</Text>
            </View>
            <View style={styles.toContainer}>
              <Text style={styles.toLabel}>To:</Text>
              <Text style={styles.toLocation} numberOfLines={1} ellipsizeMode="tail">{truncateLocation(destination)}</Text>
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
        region={{
          latitude: pickupCoords.latitude,
          longitude: pickupCoords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        loadingEnabled={isGeocoding}
      >
        <Marker coordinate={pickupCoords} title={pickupLocation} pinColor="blue" />
        <Marker coordinate={destinationCoords} title={destination} pinColor="green" />
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor="#4285F4" strokeWidth={4} />
        )}
      </MapView>

      {/* Ride buttons */}
      <View style={styles.rideButtons}>
        {rides.map((ride, idx) => {
          const price = calculatePrice(ride.ratePerKm, distanceKm);
          return (
            <TouchableOpacity
              key={ride.id}
              style={[styles.rideButton, selectedRide === idx && styles.selectedRide]}
              onPress={() => setSelectedRide(idx)}
            >
              <Text style={styles.rideName}>{ride.name}</Text>
              <Text style={styles.ridePrice}>{price}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.paymentCard}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.paymentTitle}>Payment method</Text>
          <Ionicons name="card-outline" size={25} color="#21292B" />
        </View>
        <View style={styles.separatorFull} />

        <View style={styles.paymentButtons}>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => navigation.navigate('Loader', {
              pickupLocation,
              destination,
              selectedRide: rides[selectedRide],
              distanceKm,
              pickupDateTime,
              flightInfo
            })}
          >
            <Text style={styles.paymentButtonText}>RIDE NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reservationButton} onPress={handleReservation}>
            <Text style={styles.reservationButtonText}>MAKE RESERVATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    paddingTop: Platform.OS === 'ios' ? 50 : 40, 
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  headerContent: { flex: 1, marginLeft: 10 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: "bold", color: "#21292B" },
  mapToggle: { marginLeft: 10 },
  routeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  fromContainer: { flex: 1, marginRight: 20 },
  toContainer: { flex: 1 },
  fromLabel: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  fromLocation: { fontSize: 14, color: "#666" },
  toLabel: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  toLocation: { fontSize: 14, color: "#666" },
  separator: { height: 1, backgroundColor: "#d7d7d7", marginHorizontal: 10, marginTop: 10 },
  map: { flex: 1 },
  rideButtons: {
    position: "absolute",
    bottom: 170,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 10,
  },
  rideButton: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(33,41,43,0.2)",
  },
  selectedRide: {
    backgroundColor: "#D7D7D7",
    borderColor: "#21292B",
    borderWidth: 2,
  },
  rideName: { fontSize: 10, fontWeight: "bold", color: "#21292B", textAlign: 'center' },
  ridePrice: { fontSize: 10, fontWeight: "bold", color: "#21292B", marginTop: 2 },
  paymentCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  paymentTitle: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  separatorFull: { height: 1, backgroundColor: "#d7d7d7", marginVertical: 10, width: "100%" },
  paymentButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  paymentButton: { flex: 0.48, backgroundColor: "#21292B", paddingVertical: 12, marginBottom: 10, borderRadius: 10, alignItems: "center" },
  paymentButtonText: { color: "white", fontWeight: "bold", fontSize: 10 },
  reservationButton: { flex: 0.48, backgroundColor: "#4285F4", paddingVertical: 12, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  reservationButtonText: { color: "white", fontWeight: "bold", fontSize: 10 },
});