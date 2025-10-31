// Screens/RideScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "./BookRide/Header";
import LocationBar from "./BookRide/Location";
import MapScreen from "./BookRide/Map";

export default function RideScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Book Ride" showBack={true} showRightIcons={true} />
      <LocationBar />
      <MapScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});