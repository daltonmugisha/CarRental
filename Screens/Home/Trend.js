import React, { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Sample Trending Cars Data
const trendingCars = [
  {
    name: "Toyota Camry",
    image: require("../../assets/M.png"),
    rating: 4.5,
    seats: 5,
    pricePerDay: "150k/day",
    salePrice: "13M RWF",
  },
  {
    name: "Mercedes C200",
    image: require("../../assets/T.png"),
    rating: 4.7,
    seats: 5,
    pricePerDay: "200k/day",
    salePrice: "18M RWF",
  },
  {
    name: "BMW 520i",
    image: require("../../assets/B.png"),
    rating: 4.6,
    seats: 5,
    pricePerDay: "190k/day",
    salePrice: "17M RWF",
  },
  {
    name: "Audi A6",
    image: require("../../assets/M.png"),
    rating: 4.5,
    seats: 5,
    pricePerDay: "180k/day",
    salePrice: "16M RWF",
  },
];

export default function TrendingCars() {
  const [likedCars, setLikedCars] = useState({});

  const toggleLike = (carIndex) => {
    setLikedCars((prev) => ({
      ...prev,
      [carIndex]: !prev[carIndex],
    }));
  };

  return (
    <View style={{ marginBottom:150}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Trending Cars</Text>
        <Text style={styles.subtitle}>Most Popular & Frequently Ordered</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
        {trendingCars.map((car, index) => {
          const liked = likedCars[index];
          return (
            <View key={index} style={styles.card}>
              {/* Image on Left */}
              <Image source={car.image} style={styles.carImage} />

              {/* Info on Right */}
              <View style={styles.infoContainer}>
                {/* Top Row: Car Name + Heart */}
                <View style={styles.topRow}>
                  <Text style={styles.carName}>{car.name}</Text>
                  <TouchableOpacity onPress={() => toggleLike(index)}>
                    <Ionicons name={liked ? "heart" : "heart-outline"} size={22} color={liked ? "orange" : "#21292B"} />
                  </TouchableOpacity>
                </View>

                {/* Middle Row: Rating + Seats */}
                <View style={styles.middleRow}>
                  <View style={styles.rowDetails}>
                    <FontAwesome name="star" size={14} color="orange" />
                    <Text style={{ marginLeft: 4 }}>{car.rating}</Text>
                  </View>
                  <View style={styles.rowDetails}>
                    <Ionicons name="people-outline" size={14} />
                    <Text style={{ marginLeft: 4 }}>{car.seats} Seats</Text>
                  </View>
                </View>

                {/* Bottom Row: Sale Price + Per Day */}
                <View style={styles.bottomRow}>
                  <Text style={styles.salePrice}>{car.salePrice}</Text>
                  <Text style={styles.pricePerDay}>{car.pricePerDay}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginHorizontal: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#21292B" },
  subtitle: { fontSize: 12, color: "#666" },

  card: {
    flexDirection: "row",
    width: width * 0.7,
    marginRight: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    backgroundColor: "#fff",
    overflow: "hidden",
    padding: 8,
  },
  carImage: { width: "45%", height: 120, borderRadius: 10, resizeMode: "cover" },

  infoContainer: { flex: 1, marginLeft: 10, marginTop: 20,  },

  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  carName: { fontWeight: "bold", fontSize: 14, color: "#21292B" },

  middleRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  rowDetails: { flexDirection: "row", alignItems: "center" },

  bottomRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  salePrice: { fontWeight: "bold", color: "#21292B" },
  pricePerDay: { fontSize: 12, color: "#666" },
});
