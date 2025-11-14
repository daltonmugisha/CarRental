import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TripHistoryScreen() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("All");
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchAnim = useState(new Animated.Value(0))[0];

  // ENHANCED TRIPS WITH HIDDEN DETAILS FOR DETAIL SCREEN
  const trips = [
    {
      id: "TR001",
      date: "Nov 3, 2025",
      time: "08:15 AM",
      pickup: "Kimihurura",
      dropoff: "Kigali Heights",
      driver: "John M.",
      car: "Toyota Yaris",
      plate: "RAD 345X",
      fare: "2,500",
      rating: 4.8,
      status: "Completed",
      duration: "18 mins",
      distance: "4.2 km",
      paymentMethod: "Mobile Money (MTN)",
      tripType: "Standard",
      promoApplied: "None",
      notes: "Driver arrived 2 mins early. Smooth ride, very polite.",
      waitedTime: "2 mins",
      pickupTime: "08:13 AM",
      dropoffTime: "08:31 AM",
    },
    {
      id: "TR002",
      date: "Nov 1, 2025",
      time: "02:30 PM",
      pickup: "Kigali International Airport",
      dropoff: "Kigali Marriott Hotel",
      driver: "Alice K.",
      car: "Honda CR-V",
      plate: "RAA 890T",
      fare: "12,000",
      rating: 5.0,
      status: "Completed",
      duration: "25 mins",
      distance: "11.8 km",
      paymentMethod: "Credit Card",
      tripType: "Comfort",
      promoApplied: "WELCOME50 (-3,000 RWF)",
      notes: "Helped with luggage. Excellent service!",
      waitedTime: "0 mins",
      pickupTime: "02:30 PM",
      dropoffTime: "02:55 PM",
    },
    {
      id: "TR003",
      date: "Oct 29, 2025",
      time: "07:45 PM",
      pickup: "Nyamirambo",
      dropoff: "Kimironko",
      driver: "Paul R.",
      car: "Nissan Juke",
      plate: "RAB 112K",
      fare: "3,200",
      rating: 4.2,
      status: "Cancelled",
      duration: null,
      distance: null,
      paymentMethod: null,
      tripType: "Standard",
      promoApplied: "None",
      notes: "Cancelled by user before driver arrived.",
      cancellationFee: "500 RWF",
      cancelledAt: "07:42 PM",
    },
    {
      id: "TR004",
      date: "Oct 27, 2025",
      time: "10:10 AM",
      pickup: "Gisozi",
      dropoff: "Downtown",
      driver: "Emma U.",
      car: "Suzuki Swift",
      plate: "RAC 777M",
      fare: "1,800",
      rating: 4.9,
      status: "Pending",
      duration: null,
      distance: null,
      paymentMethod: "Cash",
      tripType: "Standard",
      promoApplied: "None",
      notes: "Driver en route...",
      estimatedArrival: "10:18 AM",
    },
  ];

  const filteredTrips = trips
    .filter((trip) => (activeTab === "All" ? true : trip.status === activeTab))
    .filter((trip) =>
      searchText === ""
        ? true
        : trip.pickup.toLowerCase().includes(searchText.toLowerCase()) ||
          trip.dropoff.toLowerCase().includes(searchText.toLowerCase()) ||
          trip.driver.toLowerCase().includes(searchText.toLowerCase())
    );

  const totalTrips = filteredTrips.length;
  const totalSpent = filteredTrips
    .filter(t => t.status === "Completed")
    .reduce((sum, t) => sum + parseInt(t.fare.replace(/,/g, "")), 0);

  const toggleSearch = () => {
    if (searchActive) {
      Animated.timing(searchAnim, { toValue: 0, duration: 250, useNativeDriver: false }).start(() =>
        setSearchActive(false)
      );
    } else {
      setSearchActive(true);
      Animated.timing(searchAnim, { toValue: 1, duration: 300, useNativeDriver: false }).start();
    }
  };

  const searchHeight = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56],
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.title}>Trip History</Text>
        <View style={{ flexDirection: "row", gap: 14 }}>
          <TouchableOpacity onPress={toggleSearch}>
            <Ionicons name="search-outline" size={22} color="#21292B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SEARCH BAR */}
      {searchActive && (
        <Animated.View style={[styles.expandedSearch, { height: searchHeight }]}>
          <View style={styles.searchRow}>
            <Ionicons name="search-outline" size={20} color="#21292B" />
            <TextInput
              style={styles.searchInputFull}
              placeholder="Search by location, driver..."
              autoFocus
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={toggleSearch}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* STATS BAR */}
      <View style={styles.statsBar}>
        <Text style={styles.statsText}>
          Total Trips: {totalTrips} • Spent: {totalSpent.toLocaleString()} RWF
        </Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {["All", "Completed", "Cancelled", "Pending"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TRIP LIST */}
      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("TripDetails", { trip: item })}
          >
            <View style={styles.row1}>
              <Ionicons name="car-sport-outline" size={20} color="#21292B" />
              <Text style={styles.dateTime}>
                {item.date.split(",")[0]} • {item.time}
              </Text>
              <Text style={styles.price}>{item.fare} RWF</Text>
            </View>

            <View style={styles.row2}>
              <Text style={styles.route}>{item.pickup} → {item.dropoff}</Text>
              {item.rating && <Text style={styles.rating}>⭐ {item.rating}</Text>}
            </View>

            <View style={styles.row3}>
              <Text style={styles.driver}>
                {item.driver} • {item.car} ({item.plate})
              </Text>
              <View style={styles.statusBox}>
                <View
                  style={[
                    styles.status,
                    item.status === "Completed"
                      ? styles.completed
                      : item.status === "Cancelled"
                      ? styles.cancelled
                      : styles.pending,
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles remain same (only filter removed)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fb" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 16, fontWeight: "600", color: "#21292B", flex: 1, marginLeft: 8 },
  expandedSearch: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 12, flex: 1 },
  searchInputFull: { flex: 1, fontSize: 15, marginLeft: 8 },
  cancelText: { color: "#21292B", fontWeight: "600" },
  statsBar: {
    backgroundColor: "#21292B",
    padding: 10,
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 10,
  },
  statsText: { fontSize: 13, color: "#fff", textAlign: "center", fontWeight: "600" },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: "#eee",
  },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center" },
  activeTab: { backgroundColor: "#21292B" },
  tabText: { fontSize: 12, color: "#666", fontWeight: "600" },
  activeTabText: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  row1: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  dateTime: { fontSize: 13, fontWeight: "600", color: "#21292B", flex: 1, marginLeft: 8 },
  price: { fontSize: 14, fontWeight: "bold", color: "#21292B" },
  row2: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  route: { fontSize: 13, color: "#444", fontWeight: "500" },
  rating: { fontSize: 12, color: "#FFA500" },
  row3: { flexDirection: "row", justifyContent: "space-between" },
  driver: { fontSize: 12, color: "#777" },
  statusBox: { alignItems: "flex-end" },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 70,
  },
  completed: { backgroundColor: "#E8F5E9", borderWidth: 1, borderColor: "#4CAF50" },
  cancelled: { backgroundColor: "#FFEBEE", borderWidth: 1, borderColor: "#FF5252" },
  pending: { backgroundColor: "#FFF3E0", borderWidth: 1, borderColor: "#FFA500" },
  statusText: { fontSize: 10, fontWeight: "bold", color: "#21292B" },
});