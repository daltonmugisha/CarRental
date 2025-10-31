import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // <-- for navigation

const carRows = [
  {
    title: "Business Cars",
    subtitle: "Executive Rides",
    route: "BusinessCarsScreen", // <-- specify target route
    cars: [
      { name: "Toyota Camry", image: require("../../assets/M.png"), rating: 4.5, seats: 5, price: "13M RWF", perDay: "150k/day" },
      { name: "Mercedes C200", image: require("../../assets/T.png"), rating: 4.7, seats: 5, price: "18M RWF", perDay: "200k/day" },
      { name: "BMW 520i", image: require("../../assets/B.png"), rating: 4.6, seats: 5, price: "17M RWF", perDay: "190k/day" },
      { name: "Audi A6", image: require("../../assets/M.png"), rating: 4.5, seats: 5, price: "16M RWF", perDay: "180k/day" },
    ],
  },
  {
    title: "Road Trip Vehicles",
    subtitle: "Long Trip Vehicles",
    route: "RoadTripVehiclesScreen",
    cars: [
      { name: "Kia Sorento", image: require("../../assets/T.png"), rating: 4.6, seats: 7, price: "15M RWF", perDay: "180k/day" },
      { name: "Hyundai Santa Fe", image: require("../../assets/B.png"), rating: 4.5, seats: 7, price: "14M RWF", perDay: "170k/day" },
      { name: "Toyota RAV4", image: require("../../assets/M.png"), rating: 4.4, seats: 5, price: "13M RWF", perDay: "150k/day" },
      { name: "Honda CRV", image: require("../../assets/T.png"), rating: 4.5, seats: 5, price: "13M RWF", perDay: "150k/day" },
    ],
  },
  {
    title: "Off-Road Cars",
    subtitle: "Adventure Vehicles",
    route: "OffRoadCarsScreen",
    cars: [
      { name: "Toyota Land Cruiser", image: require("../../assets/B.png"), rating: 4.8, seats: 7, price: "25M RWF", perDay: "300k/day" },
      { name: "Jeep Wrangler", image: require("../../assets/M.png"), rating: 4.7, seats: 5, price: "22M RWF", perDay: "280k/day" },
      { name: "Ford Ranger", image: require("../../assets/T.png"), rating: 4.6, seats: 5, price: "20M RWF", perDay: "250k/day" },
      { name: "Nissan Patrol", image: require("../../assets/B.png"), rating: 4.7, seats: 7, price: "24M RWF", perDay: "290k/day" },
    ],
  },
  {
    title: "Airport Transfers",
    subtitle: "Pickup / Airport Cars",
    route: "AirportTransfersScreen",
    cars: [
      { name: "Toyota Hiace", image: require("../../assets/M.png"), rating: 4.5, seats: 15, price: "20M RWF", perDay: "220k/day" },
      { name: "Mercedes Vito", image: require("../../assets/T.png"), rating: 4.6, seats: 8, price: "22M RWF", perDay: "250k/day" },
      { name: "Ford Transit", image: require("../../assets/B.png"), rating: 4.5, seats: 12, price: "21M RWF", perDay: "240k/day" },
      { name: "Hyundai H1", image: require("../../assets/M.png"), rating: 4.4, seats: 12, price: "20M RWF", perDay: "230k/day" },
    ],
  },
];

export default function CarRows() {
  const navigation = useNavigation(); // <-- initialize navigation
  const [likedCars, setLikedCars] = useState({});

  const toggleLike = (rowIndex, carIndex) => {
    const key = `${rowIndex}-${carIndex}`;
    setLikedCars((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {carRows.map((row, rowIndex) => (
        <View key={rowIndex} style={{ marginBottom: 20 }}>
          {/* Row Header */}
          <View style={styles.rowHeader}>
            <View>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
            </View>
            {/* Pressable View All */}
            <TouchableOpacity onPress={() => navigation.navigate(row.route)}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Car Cards Scroll */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
            {row.cars.map((car, carIndex) => {
              const key = `${rowIndex}-${carIndex}`;
              const liked = likedCars[key];

              return (
                <View key={carIndex} style={styles.card}>
                  {/* Image */}
                  <View style={styles.cardImageContainer}>
                    <Image source={car.image} style={styles.cardImage} />
                    <TouchableOpacity
                      style={styles.likeButton}
                      onPress={() => toggleLike(rowIndex, carIndex)}
                    >
                      <Ionicons
                        name={liked ? "heart" : "heart-outline"}
                        size={20}
                        color={liked ? "orange" : "#21292B"}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Info */}
                  <View style={styles.cardInfo}>
                    <Text style={styles.carName}>{car.name}</Text>

                    {/* Top Row: Rating + Available */}
                    <View style={styles.cardRow}>
                      <View style={styles.rowDetails}>
                        <FontAwesome name="star" size={14} color="orange" />
                        <Text style={{ marginLeft: 4 }}>{car.rating}</Text>
                      </View>
                      <Text style={styles.available}>Available</Text>
                    </View>

                    {/* Middle Row: Location + Sale Price */}
                    <View style={styles.cardRow}>
                      <View style={styles.rowDetails}>
                        <Ionicons name="location-outline" size={14} />
                        <Text style={{ marginLeft: 4 }}>Kigali</Text>
                      </View>
                      <Text style={styles.price}>{car.price}</Text>
                    </View>

                    {/* Bottom Row: Seats + Per Day */}
                    <View style={styles.cardRow}>
                      <View style={styles.rowDetails}>
                        <Ionicons name="people-outline" size={14} />
                        <Text style={{ marginLeft: 4 }}>{car.seats} Seats</Text>
                      </View>
                      <Text style={styles.perDay}>{car.perDay}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 0, marginBottom: 10 },
  rowTitle: { fontSize: 16, paddingHorizontal: 10, fontWeight: "bold", color: "#21292B" },
  rowSubtitle: { fontSize: 12, paddingHorizontal: 12, color: "#666" },
  viewAll: { color: "#21292B", fontWeight: "bold" },
  card: { width: 180, marginRight: 12, borderRadius: 15, borderWidth: 1, borderColor: "#d7d7d7", backgroundColor: "#fff", overflow: "hidden" },
  cardImageContainer: { height: 100, position: "relative" },
  cardImage: { width: "100%", height: "100%", resizeMode: "cover" },
  likeButton: { position: "absolute", top: 8, right: 8, backgroundColor: "#fff", borderRadius: 15, padding: 6, borderWidth: 1, borderColor: "#21292B" },
  cardInfo: { padding: 8 },
  carName: { fontWeight: "bold", fontSize: 14, color: "#21292B", marginBottom: 4 },
  cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: 2 },
  rowDetails: { flexDirection: "row", alignItems: "center" },
  available: { fontWeight: "bold", color: "green" },
  price: { fontWeight: "bold" },
  perDay: { fontSize: 12, color: "#666" },
});
