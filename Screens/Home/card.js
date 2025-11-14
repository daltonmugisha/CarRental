import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const carRows = [
  {
    title: "Business Cars",
    subtitle: "Executive Rides",
    cars: [
      { name: "Toyota Camry", image: require("../../assets/M.png"), rating: 4.5, seats: 5, price: "13M RWF", perDay: "150k/day" },
      { name: "Mercedes C200", image: require("../../assets/T.png"), rating: 4.7, seats: 5, price: "18M RWF", perDay: "200k/day" },
      { name: "BMW 520i", image: require("../../assets/B.png"), rating: 4.6, seats: 5, price: "17M RWF", perDay: "190k/day" },
      { name: "Audi A6", image: require("../../assets/M.png"), rating: 4.5, seats: 5, price: "16M RWF", perDay: "180k/day" },
      { name: "Lexus ES 350", image: require("../../assets/T.png"), rating: 4.8, seats: 5, price: "20M RWF", perDay: "220k/day" },
      { name: "Mercedes E-Class", image: require("../../assets/B.png"), rating: 4.9, seats: 5, price: "22M RWF", perDay: "250k/day" },
      { name: "Jaguar XF", image: require("../../assets/M.png"), rating: 4.7, seats: 5, price: "19M RWF", perDay: "210k/day" },
      { name: "Genesis G80", image: require("../../assets/T.png"), rating: 4.6, seats: 5, price: "18M RWF", perDay: "200k/day" },
      { name: "Volvo S90", image: require("../../assets/B.png"), rating: 4.8, seats: 5, price: "21M RWF", perDay: "230k/day" },
      { name: "Cadillac CT6", image: require("../../assets/M.png"), rating: 4.7, seats: 5, price: "23M RWF", perDay: "260k/day" },
      { name: "Infiniti Q70", image: require("../../assets/T.png"), rating: 4.6, seats: 5, price: "17M RWF", perDay: "195k/day" },
      { name: "Acura RLX", image: require("../../assets/B.png"), rating: 4.5, seats: 5, price: "19M RWF", perDay: "215k/day" },
    ],
  },
  {
    title: "Road Trip Vehicles",
    subtitle: "Long Trip Vehicles",
    cars: [
      { name: "Kia Sorento", image: require("../../assets/T.png"), rating: 4.6, seats: 7, price: "15M RWF", perDay: "180k/day" },
      { name: "Hyundai Santa Fe", image: require("../../assets/B.png"), rating: 4.5, seats: 7, price: "14M RWF", perDay: "170k/day" },
      { name: "Toyota RAV4", image: require("../../assets/M.png"), rating: 4.4, seats: 5, price: "13M RWF", perDay: "150k/day" },
      { name: "Honda CRV", image: require("../../assets/T.png"), rating: 4.5, seats: 5, price: "13M RWF", perDay: "150k/day" },
      { name: "Subaru Forester", image: require("../../assets/B.png"), rating: 4.7, seats: 5, price: "16M RWF", perDay: "185k/day" },
      { name: "Mazda CX-5", image: require("../../assets/M.png"), rating: 4.6, seats: 5, price: "15M RWF", perDay: "175k/day" },
      { name: "Volkswagen Tiguan", image: require("../../assets/T.png"), rating: 4.5, seats: 5, price: "14M RWF", perDay: "170k/day" },
      { name: "Ford Explorer", image: require("../../assets/B.png"), rating: 4.7, seats: 7, price: "18M RWF", perDay: "210k/day" },
      { name: "Chevrolet Traverse", image: require("../../assets/M.png"), rating: 4.6, seats: 8, price: "19M RWF", perDay: "220k/day" },
      { name: "Nissan Pathfinder", image: require("../../assets/T.png"), rating: 4.5, seats: 7, price: "17M RWF", perDay: "200k/day" },
      { name: "Dodge Durango", image: require("../../assets/B.png"), rating: 4.6, seats: 7, price: "20M RWF", perDay: "230k/day" },
      { name: "GMC Acadia", image: require("../../assets/M.png"), rating: 4.5, seats: 7, price: "18M RWF", perDay: "210k/day" },
    ],
  },
  {
    title: "Off-Road Cars",
    subtitle: "Adventure Vehicles",
    cars: [
      { name: "Toyota Land Cruiser", image: require("../../assets/B.png"), rating: 4.8, seats: 7, price: "25M RWF", perDay: "300k/day" },
      { name: "Jeep Wrangler", image: require("../../assets/M.png"), rating: 4.7, seats: 5, price: "22M RWF", perDay: "280k/day" },
      { name: "Ford Ranger", image: require("../../assets/T.png"), rating: 4.6, seats: 5, price: "20M RWF", perDay: "250k/day" },
      { name: "Nissan Patrol", image: require("../../assets/B.png"), rating: 4.7, seats: 7, price: "24M RWF", perDay: "290k/day" },
      { name: "Land Rover Defender", image: require("../../assets/M.png"), rating: 4.9, seats: 7, price: "35M RWF", perDay: "400k/day" },
      { name: "Toyota Prado", image: require("../../assets/T.png"), rating: 4.8, seats: 7, price: "28M RWF", perDay: "320k/day" },
      { name: "Mitsubishi Pajero", image: require("../../assets/B.png"), rating: 4.6, seats: 7, price: "22M RWF", perDay: "270k/day" },
      { name: "Isuzu D-Max", image: require("../../assets/M.png"), rating: 4.5, seats: 5, price: "18M RWF", perDay: "220k/day" },
      { name: "Ram 1500", image: require("../../assets/T.png"), rating: 4.7, seats: 5, price: "26M RWF", perDay: "310k/day" },
      { name: "Chevrolet Colorado", image: require("../../assets/B.png"), rating: 4.6, seats: 5, price: "21M RWF", perDay: "260k/day" },
      { name: "GMC Canyon", image: require("../../assets/M.png"), rating: 4.5, seats: 5, price: "20M RWF", perDay: "250k/day" },
      { name: "Toyota Hilux", image: require("../../assets/T.png"), rating: 4.8, seats: 5, price: "19M RWF", perDay: "230k/day" },
    ],
  },
  {
    title: "Airport Transfers",
    subtitle: "Pickup / Airport Cars",
    cars: [
      { name: "Toyota Hiace", image: require("../../assets/M.png"), rating: 4.5, seats: 15, price: "20M RWF", perDay: "220k/day" },
      { name: "Mercedes Vito", image: require("../../assets/T.png"), rating: 4.6, seats: 8, price: "22M RWF", perDay: "250k/day" },
      { name: "Ford Transit", image: require("../../assets/B.png"), rating: 4.5, seats: 12, price: "21M RWF", perDay: "240k/day" },
      { name: "Hyundai H1", image: require("../../assets/M.png"), rating: 4.4, seats: 12, price: "20M RWF", perDay: "230k/day" },
      { name: "Coaster Bus", image: require("../../assets/T.png"), rating: 4.7, seats: 25, price: "35M RWF", perDay: "380k/day" },
      { name: "Mercedes Sprinter", image: require("../../assets/B.png"), rating: 4.8, seats: 16, price: "30M RWF", perDay: "350k/day" },
      { name: "Isuzu NPR", image: require("../../assets/M.png"), rating: 4.5, seats: 20, price: "28M RWF", perDay: "320k/day" },
      { name: "Nissan Urvan", image: require("../../assets/T.png"), rating: 4.4, seats: 14, price: "19M RWF", perDay: "210k/day" },
      { name: "Foton View", image: require("../../assets/B.png"), rating: 4.3, seats: 18, price: "22M RWF", perDay: "240k/day" },
      { name: "King Long Mini", image: require("../../assets/M.png"), rating: 4.4, seats: 22, price: "32M RWF", perDay: "360k/day" },
      { name: "Yutong Bus", image: require("../../assets/T.png"), rating: 4.6, seats: 30, price: "45M RWF", perDay: "500k/day" },
      { name: "Higer Bus", image: require("../../assets/B.png"), rating: 4.5, seats: 28, price: "42M RWF", perDay: "480k/day" },
    ],
  },
];

export default function CarRows() {
  const navigation = useNavigation();
  const [likedCars, setLikedCars] = useState({});
  const [expandedRows, setExpandedRows] = useState({}); // { 0: true, 1: false }

  const toggleLike = (rowIndex, carIndex) => {
    const key = `${rowIndex}-${carIndex}`;
    setLikedCars((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleExpand = (rowIndex) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {carRows.map((row, rowIndex) => {
        const isExpanded = expandedRows[rowIndex];
        const firstRowCars = row.cars.slice(0, 4);
        const secondRowCars = isExpanded ? row.cars.slice(4, 8) : [];
        const thirdRowCars = isExpanded ? row.cars.slice(8, 12) : [];

        return (
          <View key={rowIndex} style={{ marginBottom: 20 }}>
            {/* Header */}
            <View style={styles.rowHeader}>
              <View>
                <Text style={styles.rowTitle}>{row.title}</Text>
                <Text style={styles.rowSubtitle}>{row.subtitle}</Text>
              </View>
              {row.cars.length > 4 && (
                <TouchableOpacity onPress={() => toggleExpand(rowIndex)}>
                  <Text style={styles.viewAll}>
                    {isExpanded ? "View Less" : "View All"} ({row.cars.length})
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* First Row - Always Visible */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }}>
              {firstRowCars.map((car, carIndex) => {
                const key = `${rowIndex}-${carIndex}`;
                const liked = likedCars[key];

                return (
                  <View key={carIndex} style={styles.card}>
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

                    <View style={styles.cardInfo}>
                      <Text style={styles.carName}>{car.name}</Text>

                      <View style={styles.cardRow}>
                        <View style={styles.rowDetails}>
                          <FontAwesome name="star" size={14} color="orange" />
                          <Text style={{ marginLeft: 4 }}>{car.rating}</Text>
                        </View>
                        <Text style={styles.available}>Available</Text>
                      </View>

                      <View style={styles.cardRow}>
                        <View style={styles.rowDetails}>
                          <Ionicons name="location-outline" size={14} />
                          <Text style={{ marginLeft: 4 }}>Kigali</Text>
                        </View>
                        <Text style={styles.price}>{car.price}</Text>
                      </View>

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

            {/* Second Row - Only if expanded */}
            {secondRowCars.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10, marginTop: 12 }}>
                {secondRowCars.map((car, carIndex) => {
                  const globalIndex = 4 + carIndex;
                  const key = `${rowIndex}-${globalIndex}`;
                  const liked = likedCars[key];

                  return (
                    <View key={carIndex} style={styles.card}>
                      <View style={styles.cardImageContainer}>
                        <Image source={car.image} style={styles.cardImage} />
                        <TouchableOpacity
                          style={styles.likeButton}
                          onPress={() => toggleLike(rowIndex, globalIndex)}
                        >
                          <Ionicons
                            name={liked ? "heart" : "heart-outline"}
                            size={20}
                            color={liked ? "orange" : "#21292B"}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.cardInfo}>
                        <Text style={styles.carName}>{car.name}</Text>
                        <View style={styles.cardRow}>
                          <View style={styles.rowDetails}>
                            <FontAwesome name="star" size={14} color="orange" />
                            <Text style={{ marginLeft: 4 }}>{car.rating}</Text>
                          </View>
                          <Text style={styles.available}>Available</Text>
                        </View>
                        <View style={styles.cardRow}>
                          <View style={styles.rowDetails}>
                            <Ionicons name="location-outline" size={14} />
                            <Text style={{ marginLeft: 4 }}>Kigali</Text>
                          </View>
                          <Text style={styles.price}>{car.price}</Text>
                        </View>
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
            )}

            {/* Third Row - Only if expanded */}
            {thirdRowCars.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10, marginTop: 12 }}>
                {thirdRowCars.map((car, carIndex) => {
                  const globalIndex = 8 + carIndex;
                  const key = `${rowIndex}-${globalIndex}`;
                  const liked = likedCars[key];

                  return (
                    <View key={carIndex} style={styles.card}>
                      <View style={styles.cardImageContainer}>
                        <Image source={car.image} style={styles.cardImage} />
                        <TouchableOpacity
                          style={styles.likeButton}
                          onPress={() => toggleLike(rowIndex, globalIndex)}
                        >
                          <Ionicons
                            name={liked ? "heart" : "heart-outline"}
                            size={20}
                            color={liked ? "orange" : "#21292B"}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.cardInfo}>
                        <Text style={styles.carName}>{car.name}</Text>
                        <View style={styles.cardRow}>
                          <View style={styles.rowDetails}>
                            <FontAwesome name="star" size={14} color="orange" />
                            <Text style={{ marginLeft: 4 }}>{car.rating}</Text>
                          </View>
                          <Text style={styles.available}>Available</Text>
                        </View>
                        <View style={styles.cardRow}>
                          <View style={styles.rowDetails}>
                            <Ionicons name="location-outline" size={14} />
                            <Text style={{ marginLeft: 4 }}>Kigali</Text>
                          </View>
                          <Text style={styles.price}>{car.price}</Text>
                        </View>
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
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

// YOUR ORIGINAL STYLES — 100% UNTOUCHED
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