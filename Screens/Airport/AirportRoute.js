import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// === KING RWANDA LUXURY ALERT (SAME AS CAR RENTAL VERIFICATION) ===
const LuxuryAlert = ({ visible, title, message, onClose }) => {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={alertStyles.overlay}>
        <View style={alertStyles.box}>
          <View style={alertStyles.iconCircle}>
            <Ionicons name="car-sport" size={40} color="#4CAF50" />
          </View>
          <Text style={alertStyles.title}>{title}</Text>
          <Text style={alertStyles.message}>{message}</Text>
          <TouchableOpacity style={alertStyles.button} onPress={onClose}>
            <Text style={alertStyles.buttonText}>CONTINUE TO RESERVATION</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function RouteAirportScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    pickupLocation: passedPickupLocation = {
      name: "Kigali International Airport (Kanombe)",
      latitude: -1.9686,
      longitude: 30.1395,
    },
    destination: passedDestination = "Downtown Kigali",
    pickupDateTime,
    flightInfo,
  } = route.params || {};

  const mapRef = useRef(null);

  const [pickupLocation, setPickupLocation] = useState(passedPickupLocation.name);
  const [destination, setDestination] = useState(passedDestination);
  const [pickupCoords] = useState({
    latitude: passedPickupLocation.latitude,
    longitude: passedPickupLocation.longitude,
  });
  const [destinationCoords, setDestinationCoords] = useState({
    latitude: -1.9530,
    longitude: 30.1085,
  });
  const [routeCoords, setRouteCoords] = useState([]);
  const [selectedRide, setSelectedRide] = useState(0);
  const [mapType, setMapType] = useState('standard');
  const [isGeocoding, setIsGeocoding] = useState(true);
  const [distanceKm, setDistanceKm] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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
    if (km === 0) return 0;
    return Math.round((ratePerKm * km) / 100) * 100;
  };

  const getCurrentPrice = () => {
    const ride = rides[selectedRide];
    return calculatePrice(ride.ratePerKm, distanceKm);
  };

  const showLuxuryAlert = () => {
    const ride = rides[selectedRide];
    const price = getCurrentPrice();

    setAlertTitle(`${ride.name.trim()} Selected!`);
    setAlertMessage(
      `Estimated fare: ${price.toLocaleString()} RWF\n\n` +
      `Distance: ${distanceKm.toFixed(1)} km\n` +
      `Rate: ${ride.ratePerKm.toLocaleString()} RWF/km\n\n` +
      `Payment after journey completed.\n` +
      `WhatsApp confirmation in 2 mins!`
    );
    setAlertVisible(true);
  };

  const handleReservation = () => {
    const ride = rides[selectedRide];
    const totalPrice = getCurrentPrice();

    const reservationData = {
      pickupLocation: pickupLocation,
      destination: destination,
      selectedRide: {
        ...ride,
        totalPrice: totalPrice, // PRICE PASSED!
      },
      distanceKm: distanceKm,
      pickupDateTime,
      flightInfo,
    };

    console.log('Reservation made:', reservationData);

    // Show luxury alert first
    showLuxuryAlert();

    // Navigate after user taps "Continue"
    // We'll handle navigation in onClose
  };

  const handleContinueToReservation = () => {
    setAlertVisible(false);
    const ride = rides[selectedRide];
    const totalPrice = getCurrentPrice();

    navigation.navigate('AirportReservation', {
      pickupLocation,
      destination,
      selectedRide: {
        ...ride,
        totalPrice: totalPrice,
      },
      distanceKm,
      pickupDateTime,
      flightInfo,
    });
  };

  useEffect(() => {
    const geocodeAndFetch = async () => {
      try {
        setIsGeocoding(true);

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
        console.error('Error:', error);
      } finally {
        setIsGeocoding(false);
      }
    };
    geocodeAndFetch();
  }, [destination]);

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
      return [];
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={styles.headerTitle}>Airport Shuttle</Text>
            <TouchableOpacity onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}>
              <Ionicons name={mapType === 'standard' ? "earth" : "map"} size={28} color="#21292B" />
            </TouchableOpacity>
          </View>
          <View style={styles.routeRow}>
            <View style={styles.fromContainer}>
              <Text style={styles.fromLabel}>From:</Text>
              <Text style={styles.fromLocation} numberOfLines={1}>
                {truncateLocation(pickupLocation)}
              </Text>
            </View>
            <View style={styles.toContainer}>
              <Text style={styles.toLabel}>To:</Text>
              <Text style={styles.toLocation} numberOfLines={1}>
                {truncateLocation(destination)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.separator} />

      {/* MAP */}
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapType}
        region={{
          latitude: pickupCoords.latitude,
          longitude: pickupCoords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        loadingEnabled={isGeocoding}
      >
        <Marker coordinate={pickupCoords} title={pickupLocation} pinColor="#4285F4" />
        <Marker coordinate={destinationCoords} title={destination} pinColor="#34A853" />
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor="#4285F4" strokeWidth={5} />
        )}
      </MapView>

      {/* RIDE BUTTONS */}
      <View style={styles.rideButtons}>
        { rides.map((ride, idx) => {
  const price = calculatePrice(ride.ratePerKm, distanceKm);  // FIXED: ratePerKm NOT ratePerarPerKm
  return (
    <TouchableOpacity
      key={ride.id}
      style={[styles.rideButton, selectedRide === idx && styles.selectedRide]}
      onPress={() => setSelectedRide(idx)}
    >
      <Text style={styles.rideName}>{ride.name}</Text>
      <Text style={styles.ridePrice}>
        {price > 0 ? `${price.toLocaleString()} RWF` : 'Calculating...'}
      </Text>
    </TouchableOpacity>
  );
})}
      </View>

      {/* PAYMENT CARD */}
      <View style={styles.paymentCard}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.paymentTitle}>Payment Method</Text>
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
              flightInfo,
              totalPrice: getCurrentPrice(),
            })}
          >
            <Text style={styles.paymentButtonText}>RIDE NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reservationButton} onPress={handleReservation}>
            <Text style={styles.reservationButtonText}>MAKE RESERVATION</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LUXURY ALERT */}
      <LuxuryAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={handleContinueToReservation}
      />
    </View>
  );
}

// === LUXURY ALERT STYLES (SAME AS CAR RENTAL) ===
const alertStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  box: {
    width: '88%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 25,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#21292B',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15.5,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },
  button: {
    backgroundColor: '#21292B',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

// === MAIN STYLES ===
const styles = StyleSheet.create({
  header: { 
    flexDirection: "row", 
    alignItems: "flex-start", 
    paddingTop: Platform.OS === 'ios' ? 50 : 40, 
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingBottom: 12,
  },
  headerContent: { flex: 1, marginLeft: 10 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#21292B" },
  routeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  fromContainer: { flex: 1, marginRight: 20 },
  toContainer: { flex: 1 },
  fromLabel: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  fromLocation: { fontSize: 14, color: "#666", marginTop: 2 },
  toLabel: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  toLocation: { fontSize: 14, color: "#666", marginTop: 2 },
  separator: { height: 1, backgroundColor: "#eee", marginHorizontal: 10 },
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
    width: 88,
    height: 88,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: "rgba(33,41,43,0.15)",
  },
  selectedRide: {
    backgroundColor: "#fff",
    borderColor: "#21292B",
  },
  rideName: { 
    fontSize: 10.5, 
    fontWeight: "bold", 
    color: "#21292B", 
    textAlign: 'center',
    lineHeight: 13,
  },
  ridePrice: { 
    fontSize: 11, 
    fontWeight: "bold", 
    color: "#21292B", 
    marginTop: 4 
  },
  paymentCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  paymentTitle: { fontSize: 15, fontWeight: "bold", color: "#21292B" },
  separatorFull: { height: 1.5, backgroundColor: "#e0e0e0", marginVertical: 12 },
  paymentButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  paymentButton: { 
    flex: 0.48, 
    backgroundColor: "#21292B", 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: "center" 
  },
  paymentButtonText: { color: "white", fontWeight: "bold", fontSize: 12 },
  reservationButton: { 
    flex: 0.48, 
    backgroundColor: "#4285F4", 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: "center"
  },
  reservationButtonText: { color: "white", fontWeight: "bold", fontSize: 12 },
});