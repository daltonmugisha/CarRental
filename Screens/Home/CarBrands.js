import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function CarBrandsScroll() {
  // Example car brands, replace with your logos
  const brands = [
    { name: "Toyota", logo: require("../../assets/toyota.png") },
    { name: "Merce-Benz", logo: require("../../assets/benz.png") },
    { name: "Hyundai", logo: require("../../assets/hyunda.png") },
    { name: "Volkswagen", logo: require("../../assets/volks.png") },
    { name: "Kia", logo: require("../../assets/kia.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Brands</Text>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {brands.map((brand, index) => (
          <View key={index} style={styles.brandItem}>
            <TouchableOpacity style={styles.circle}>
              <Image source={brand.logo} style={styles.logo} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={styles.brandName}>{brand.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginBottom: 15,
   
  },
  title: {
    color: "#21292B",
    fontSize: 15,
    fontWeight: "bold",
    paddingHorizontal:0,
    marginBottom: 10,
  },
  scrollContainer: {
    // alignItems: "center",
    marginLeft: 0,
  },
  brandItem: {
    alignItems: "center",
    marginRight: 11, // spacing between brands
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 30, // perfect circle
    backgroundColor: "#21292B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  logo: {
    width: 25,
    height: 25,
    tintColor: "#fff", // white logos
  },
  brandName: {
    fontSize: 12,
    color: "#21292B",
    fontWeight: "500",
    textAlign: "center",
  },
});
