import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const imageAssets = [
  require("../../assets/M.png"),
  require("../../assets/T.png"),
  require("../../assets/B.png"),
];

const mockCars = [
  {
    id: 1,
    name: "Toyota Camry",
    model: "Camry",
    make: "Toyota",
    year: 2023,
    color: "Midnight Black",
    licensePlate: "RAB 123X",
    vin: "4T1BF1FK0DU123456",
    image: imageAssets[0],
    rating: 4.5,
    seats: 5,
    perDay: "150k/day",
    pricePerDay: 150000,
    securityDeposit: 500000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 2,
    name: "Mercedes C200",
    model: "C200",
    make: "Mercedes",
    year: 2022,
    color: "Obsidian Black",
    licensePlate: "RAB 456Y",
    vin: "W1KZF8DB0MA987654",
    image: imageAssets[1],
    rating: 4.7,
    seats: 5,
    perDay: "200k/day",
    pricePerDay: 200000,
    securityDeposit: 800000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 3,
    name: "BMW 520i",
    model: "520i",
    make: "BMW",
    year: 2023,
    color: "Alpine White",
    licensePlate: "RAB 789Z",
    vin: "WBA5A7C55FG123789",
    image: imageAssets[2],
    rating: 4.6,
    seats: 5,
    perDay: "190k/day",
    pricePerDay: 190000,
    securityDeposit: 750000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 4,
    name: "Audi A6",
    model: "A6",
    make: "Audi",
    year: 2022,
    color: "Glacier White",
    licensePlate: "RAB 101A",
    vin: "WAUF8AFC9HN123456",
    image: imageAssets[0],
    rating: 4.5,
    seats: 5,
    perDay: "180k/day",
    pricePerDay: 180000,
    securityDeposit: 700000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 5,
    name: "Kia Sorento",
    model: "Sorento",
    make: "Kia",
    year: 2023,
    color: "Gravity Blue",
    licensePlate: "RAB 202B",
    vin: "5XYRK4LF0PG123456",
    image: imageAssets[1],
    rating: 4.6,
    seats: 7,
    perDay: "180k/day",
    pricePerDay: 180000,
    securityDeposit: 600000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Diesel",
    transmission: "Automatic",
  },
  {
    id: 6,
    name: "Hyundai Santa Fe",
    model: "Santa Fe",
    make: "Hyundai",
    year: 2023,
    color: "Stormy Sea",
    licensePlate: "RAB 303C",
    vin: "5NMS3CAD5LH123456",
    image: imageAssets[2],
    rating: 4.5,
    seats: 7,
    perDay: "170k/day",
    pricePerDay: 170000,
    securityDeposit: 550000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 7,
    name: "Toyota RAV4",
    model: "RAV4",
    make: "Toyota",
    year: 2023,
    color: "Ruby Flare",
    licensePlate: "RAB 404D",
    vin: "2T3P1RFV9PW123456",
    image: imageAssets[0],
    rating: 4.4,
    seats: 5,
    perDay: "150k/day",
    pricePerDay: 150000,
    securityDeposit: 500000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 8,
    name: "Honda CRV",
    model: "CRV",
    make: "Honda",
    year: 2023,
    color: "Crystal Black",
    licensePlate: "RAB 505E",
    vin: "2HKRW2H50PH123456",
    image: imageAssets[1],
    rating: 4.5,
    seats: 5,
    perDay: "150k/day",
    pricePerDay: 150000,
    securityDeposit: 500000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 9,
    name: "Toyota Land Cruiser",
    model: "Land Cruiser",
    make: "Toyota",
    year: 2023,
    color: "Pearl White",
    licensePlate: "RAB 606F",
    vin: "JTMCY7AJ2P4123456",
    image: imageAssets[2],
    rating: 4.8,
    seats: 7,
    perDay: "300k/day",
    pricePerDay: 300000,
    securityDeposit: 1500000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Diesel",
    transmission: "Automatic",
  },
  {
    id: 10,
    name: "Jeep Wrangler",
    model: "Wrangler",
    make: "Jeep",
    year: 2023,
    color: "Firecracker Red",
    licensePlate: "RAB 707G",
    vin: "1C4HJXDN2PW123456",
    image: imageAssets[0],
    rating: 4.7,
    seats: 5,
    perDay: "280k/day",
    pricePerDay: 280000,
    securityDeposit: 1200000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 11,
    name: "Ford Ranger",
    model: "Ranger",
    make: "Ford",
    year: 2023,
    color: "Carbonized Gray",
    licensePlate: "RAB 808H",
    vin: "1FTER4FH9PLE12345",
    image: imageAssets[1],
    rating: 4.6,
    seats: 5,
    perDay: "250k/day",
    pricePerDay: 250000,
    securityDeposit: 1000000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Diesel",
    transmission: "Automatic",
  },
  {
    id: 12,
    name: "Nissan Patrol",
    model: "Patrol",
    make: "Nissan",
    year: 2023,
    color: "Gun Metallic",
    licensePlate: "RAB 909I",
    vin: "JN8AY2ND9LX123456",
    image: imageAssets[2],
    rating: 4.7,
    seats: 7,
    perDay: "290k/day",
    pricePerDay: 290000,
    securityDeposit: 1400000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Petrol",
    transmission: "Automatic",
  },
  {
    id: 13,
    name: "Toyota Hiace",
    model: "Hiace",
    make: "Toyota",
    year: 2023,
    color: "White",
    licensePlate: "RAB 101J",
    vin: "JTFHT02P500123456",
    image: imageAssets[0],
    rating: 4.5,
    seats: 15,
    perDay: "220k/day",
    pricePerDay: 220000,
    securityDeposit: 800000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Diesel",
    transmission: "Manual",
  },
  {
    id: 14,
    name: "Mercedes Vito",
    model: "Vito",
    make: "Mercedes",
    year: 2023,
    color: "Arctic White",
    licensePlate: "RAB 202K",
    vin: "W1V4476032123456",
    image: imageAssets[1],
    rating: 4.6,
    seats: 8,
    perDay: "250k/day",
    pricePerDay: 250000,
    securityDeposit: 900000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Diesel",
    transmission: "Automatic",
  },
  {
    id: 15,
    name: "Ford Transit",
    model: "Transit",
    make: "Ford",
    year: 2023,
    color: "Frozen White",
    licensePlate: "RAB 303L",
    vin: "1FTYR1ZM7KKB12345",
    image: imageAssets[2],
    rating: 4.5,
    seats: 12,
    perDay: "240k/day",
    pricePerDay: 240000,
    securityDeposit: 850000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Diesel",
    transmission: "Manual",
  },
];

export default function CarResultsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params || {};
  
  console.log('CarResults received params:', params);

  // Create safe ISO date strings
  const createSafeDateString = (dateInput, fallback) => {
    if (!dateInput) return fallback.toISOString();
    
    try {
      if (dateInput instanceof Date) {
        return isNaN(dateInput.getTime()) ? fallback.toISOString() : dateInput.toISOString();
      }
      
      // If it's already an ISO string, validate it
      if (typeof dateInput === 'string') {
        const testDate = new Date(dateInput);
        if (!isNaN(testDate.getTime())) {
          return dateInput; // It's already a valid ISO string
        }
      }
      
      // Try to parse it
      const parsedDate = new Date(dateInput);
      return isNaN(parsedDate.getTime()) ? fallback.toISOString() : parsedDate.toISOString();
    } catch (e) {
      console.error('Date string creation error:', e);
      return fallback.toISOString();
    }
  };

  const safePickupDate = createSafeDateString(params.pickupDate, new Date());
  const safeReturnDate = createSafeDateString(params.returnDate, new Date(Date.now() + 24 * 60 * 60 * 1000));

  console.log('Safe pickup string:', safePickupDate);
  console.log('Safe return string:', safeReturnDate);

  const handleCarPress = (car) => {
    console.log('Navigating with dates:', { pickupDate: safePickupDate, returnDate: safeReturnDate });
    navigation.navigate('CarDetails', { 
      car, 
      pickupDate: safePickupDate, 
      returnDate: safeReturnDate 
    });
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
                  <Text style={styles.perDay}>{car.perDay}</Text>
                </View>
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
  perDay: {
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