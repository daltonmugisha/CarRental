import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BookLaterModal from './BookLater';

export default function Location3Screen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { from, to } = route.params; // Pickup and destination from previous screen
  const mapRef = useRef(null);

  const [pickupLocation, setPickupLocation] = useState(from || "Kimironko Market");
  const [destination, setDestination] = useState(to || "Amahoro Stadium");
  const [routeCoords, setRouteCoords] = useState([]); // Primary route
  const [selectedRide, setSelectedRide] = useState(0); // Default to first ride
  const [mapType, setMapType] = useState('standard'); // 'standard' or 'satellite'
  const [isGeocoding, setIsGeocoding] = useState(true); // For loading coords
  const [distanceKm, setDistanceKm] = useState(0); // For pricing logic
  const [showBookLaterModal, setShowBookLaterModal] = useState(false);

  // Dynamic coords (geocode if possible, fallback to hardcoded)
  const [pickupCoords, setPickupCoords] = useState({ latitude: -1.9496, longitude: 30.1263 });
  const [destinationCoords, setDestinationCoords] = useState({ latitude: -1.9530, longitude: 30.1085 });

  // Rides with per-km rates only (Rwanda-tuned: 1000/km Economy, 1500/km VIP)
  const rides = [
    { id: 1, name: "Economy", type: "Car", ratePerKm: 1000, icon: "car-outline" },
    { id: 2, name: "Vip Ride", type: "car", ratePerKm: 1500, icon: "car-outline" },
  ];

  // Google API key - replace with yours
  const API_KEY = 'AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE';

  // Truncate location text if too long
  const truncateLocation = (text, maxLength = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  // Calculate dynamic price based on distance (pure per-km, rounded)
  const calculatePrice = (ratePerKm, km) => {
    if (km === 0) return '0 Rwf';
    const total = Math.round(ratePerKm * km / 100) * 100; // Round to nearest 100 RWF
    return total.toLocaleString() + ' Rwf';
  };

  // Get current ride's price
  const getCurrentPrice = () => {
    const ride = rides[selectedRide];
    return calculatePrice(ride.ratePerKm, distanceKm);
  };

  const handleBookRide = (bookingData) => {
    console.log('Booked ride:', bookingData); // Placeholder for backend save
  };

  // Geocode addresses to coords and fetch directions on mount
  useEffect(() => {
    const geocodeAndFetch = async () => {
      try {
        setIsGeocoding(true);
        // Geocode pickup
        let pickup = pickupCoords;
        if (pickupLocation !== "Kimironko Market") {
          const pickupRes = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(pickupLocation)}&key=${API_KEY}`
          );
          const pickupData = await pickupRes.json();
          if (pickupData.results[0]) {
            const loc = pickupData.results[0].geometry.location;
            pickup = { latitude: loc.lat, longitude: loc.lng };
          }
        }
        setPickupCoords(pickup);

        // Geocode destination
        let dest = destinationCoords;
        if (destination !== "Amahoro Stadium") {
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

        // Fetch directions (shortest by default)
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.latitude},${pickup.longitude}&destination=${dest.latitude},${dest.longitude}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes[0]) {
          // Primary (shortest) route
          const primaryPoints = decodePolyline(data.routes[0].overview_polyline.points);
          setRouteCoords(primaryPoints);
          
          // Set distance for pricing (from primary route)
          const distanceMeters = data.routes[0].legs[0].distance.value;
          setDistanceKm(distanceMeters / 1000);
        }
      } catch (error) {
        console.error('Error geocoding/fetching directions:', error);
        // Fallback to hardcoded
      } finally {
        setIsGeocoding(false);
      }
    };
    geocodeAndFetch();
  }, [pickupLocation, destination]);

  // Decode Google polyline (with minor error handling)
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
            <Text style={styles.headerTitle}>Location</Text>
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
        initialRegion={{
          latitude: pickupCoords.latitude,
          longitude: pickupCoords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        loadingEnabled={isGeocoding} // Show spinner while loading
      >
        <Marker coordinate={pickupCoords} title={pickupLocation} pinColor="blue" />
        <Marker coordinate={destinationCoords} title={destination} pinColor="green" />
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor="#4285F4" strokeWidth={4} />
        )}
      </MapView>

      {/* Ride buttons (bubbles over map) - dynamic prices for all */}
      <View style={styles.rideButtons}>
        {rides.map((ride, idx) => {
          const price = calculatePrice(ride.ratePerKm, distanceKm);
          return (
            <TouchableOpacity
              key={ride.id}
              style={[
                styles.rideButton,
                selectedRide === idx && styles.selectedRide,
              ]}
              onPress={() => setSelectedRide(idx)}
            >
              <Ionicons name={ride.icon} size={20} color="#21292B" />
              <Text style={styles.rideName}>{ride.name}</Text>
              <Text style={styles.ridePrice}>{price}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Payment card */}
      <View style={styles.paymentCard}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={styles.paymentTitle}>Payment method</Text>
          <Ionicons name="card-outline" size={25} color="#21292B" />
        </View>
        <View style={styles.separatorFull} />
        <TouchableOpacity 
          style={styles.moneyTransferButton}
          onPress={() => navigation.navigate('Payment')} // Replace with your payment screen name
        >
          <Text style={styles.moneyTransferText}>Money Transfer</Text>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        <View style={styles.paymentButtons}>
          <TouchableOpacity
  style={styles.paymentButton}
  onPress={() => navigation.navigate('Loader', {
      pickupLocation,
      destination,
      selectedRide: rides[selectedRide],
      distanceKm
  })}
>
  <Text style={styles.paymentButtonText}>RIDE NOW</Text>
</TouchableOpacity>

          <TouchableOpacity style={styles.paymentButton} onPress={() => setShowBookLaterModal(true)}>
            <Text style={styles.paymentButtonText}>BOOK FOR LATER</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BookLaterModal
        visible={showBookLaterModal}
        onClose={() => setShowBookLaterModal(false)}
        pickupLocation={pickupLocation}
        destination={destination}
        selectedRide={selectedRide}
        rides={rides}
        distanceKm={distanceKm}
        onBook={handleBookRide}
      />
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
  headerContent: {
    flex: 1,
    marginLeft: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 17, fontWeight: "bold", color: "#21292B" },
  mapToggle: {
    marginLeft: 10,
  },
  routeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 0,
  },
  fromContainer: {
    flex: 1,
    marginRight: 20,
  },
  toContainer: {
    flex: 1,
  },
  fromLabel: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#21292B",
  },
  fromLocation: { 
    fontSize: 14, 
    color: "#666", 
  },
  toLabel: { 
    fontSize: 14, 
    fontWeight: "bold", 
    color: "#21292B",
  },
  toLocation: { 
    fontSize: 14, 
    color: "#666",
  },
  map: { flex: 1 },
  rideButtons: {
    position: "absolute",
    bottom: 190,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 10,
  },
  rideButton: {
    width: 100,
    height: 100,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 50,
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
  rideName: { fontSize: 12, fontWeight: "bold", color: "#21292B", marginTop: 4 },
  ridePrice: { fontSize: 12, fontWeight: "bold", color: "#21292B", marginTop: 2 },
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
  moneyTransferButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 13,
    justifyContent: "space-between",
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  moneyTransferText: { color: "#666", fontSize: 14 },
  paymentButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  paymentButton: {
    flex: 0.48,
    backgroundColor: "#21292B",
    paddingVertical: 12,
    marginBottom: 0,
    borderRadius: 10,
    alignItems: "center",
  },
  paymentButtonText: { color: "white", fontWeight: "bold", fontSize: 10 },
});