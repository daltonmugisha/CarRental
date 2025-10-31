import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Placeholder image assets (same as original)
const imageAssets = [
  require("../../assets/M.png"),
  require("../../assets/T.png"),
  require("../../assets/B.png"),
];

const mockCars = [
  { id: 1, name: "Toyota Camry", model: "Camry", image: imageAssets[0], rating: 4.5, seats: 5, year: 2020, mileage: "30,000 km", price: "25,000,000 RWF", purchasePrice: 25000000 },
  { id: 2, name: "Mercedes C200", model: "C200", image: imageAssets[1], rating: 4.7, seats: 5, year: 2021, mileage: "20,000 km", price: "40,000,000 RWF", purchasePrice: 40000000 },
  { id: 3, name: "BMW 520i", model: "520i", image: imageAssets[2], rating: 4.6, seats: 5, year: 2019, mileage: "35,000 km", price: "38,000,000 RWF", purchasePrice: 38000000 },
  { id: 4, name: "Audi A6", model: "A6", image: imageAssets[0], rating: 4.5, seats: 5, year: 2020, mileage: "28,000 km", price: "36,000,000 RWF", purchasePrice: 36000000 },
  { id: 5, name: "Kia Sorento", model: "Sorento", image: imageAssets[1], rating: 4.6, seats: 7, year: 2022, mileage: "15,000 km", price: "35,000,000 RWF", purchasePrice: 35000000 },
  { id: 6, name: "Hyundai Santa Fe", model: "Santa Fe", image: imageAssets[2], rating: 4.5, seats: 7, year: 2021, mileage: "25,000 km", price: "33,000,000 RWF", purchasePrice: 33000000 },
  { id: 7, name: "Toyota RAV4", model: "RAV4", image: imageAssets[0], rating: 4.4, seats: 5, year: 2020, mileage: "40,000 km", price: "28,000,000 RWF", purchasePrice: 28000000 },
  { id: 8, name: "Honda CRV", model: "CRV", image: imageAssets[1], rating: 4.5, seats: 5, year: 2021, mileage: "22,000 km", price: "30,000,000 RWF", purchasePrice: 30000000 },
  { id: 9, name: "Toyota Land Cruiser", model: "Land Cruiser", image: imageAssets[2], rating: 4.8, seats: 7, year: 2023, mileage: "10,000 km", price: "80,000,000 RWF", purchasePrice: 80000000 },
  { id: 10, name: "Jeep Wrangler", model: "Wrangler", image: imageAssets[0], rating: 4.7, seats: 5, year: 2022, mileage: "18,000 km", price: "65,000,000 RWF", purchasePrice: 65000000 },
  { id: 11, name: "Ford Ranger", model: "Ranger", image: imageAssets[1], rating: 4.6, seats: 5, year: 2021, mileage: "30,000 km", price: "55,000,000 RWF", purchasePrice: 55000000 },
  { id: 12, name: "Nissan Patrol", model: "Patrol", image: imageAssets[2], rating: 4.7, seats: 7, year: 2022, mileage: "15,000 km", price: "75,000,000 RWF", purchasePrice: 75000000 },
  { id: 13, name: "Toyota Hiace", model: "Hiace", image: imageAssets[0], rating: 4.5, seats: 15, year: 2020, mileage: "50,000 km", price: "45,000,000 RWF", purchasePrice: 45000000 },
  { id: 14, name: "Mercedes Vito", model: "Vito", image: imageAssets[1], rating: 4.6, seats: 8, year: 2021, mileage: "25,000 km", price: "50,000,000 RWF", purchasePrice: 50000000 },
  { id: 15, name: "Ford Transit", model: "Transit", image: imageAssets[2], rating: 4.5, seats: 12, year: 2020, mileage: "40,000 km", price: "48,000,000 RWF", purchasePrice: 48000000 },
];

export default function CarResultsScreen() {
  const navigation = useNavigation();

  const handleCarPress = (car) => {
    navigation.navigate('BuyCarDetails', { car });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <ScrollView
          key={rowIndex}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rowContainer}
        >
          {mockCars.slice(rowIndex * 5, (rowIndex + 1) * 5).map((car) => (
            <TouchableOpacity key={car.id} style={styles.card} onPress={() => handleCarPress(car)}>
              <View style={styles.cardImageContainer}>
                <Image source={car.image} style={styles.cardImage} />
                <View style={styles.priceBadge}>
                  <Text style={styles.price}>{car.price}</Text>
                </View>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.carName}>{car.name}</Text>

                <View style={styles.cardRow}>
                  <View style={styles.rowDetails}>
                    <FontAwesome name="star" size={14} color="orange" />
                    <Text style={{ marginLeft: 4 }}>{car.rating}</Text>
                  </View>
                  <Text style={styles.available}>In Stock</Text>
                </View>

                <View style={styles.cardRow}>
                  <View style={styles.rowDetails}>
                    <Ionicons name="calendar-outline" size={14} />
                    <Text style={{ marginLeft: 4 }}>{car.year}</Text>
                  </View>
                </View>

                <View style={styles.cardRow}>
                  <View style={styles.rowDetails}>
                    <Ionicons name="speedometer-outline" size={14} />
                    <Text style={{ marginLeft: 4 }}>{car.mileage}</Text>
                  </View>
                </View>

                <View style={styles.cardRow}>
                  <View style={styles.rowDetails}>
                    <Ionicons name="people-outline" size={14} />
                    <Text style={{ marginLeft: 4 }}>{car.seats} Seats</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 120,
  },
  rowContainer: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  card: {
    width: 180,
    marginRight: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  cardImageContainer: {
    height: 100,
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  priceBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "green",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  price: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },
  cardInfo: {
    padding: 8,
  },
  carName: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#21292B",
    marginBottom: 4,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 0,
  },
  rowDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  available: {
    fontWeight: "bold",
    color: "green",
  },
});