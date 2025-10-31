import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "./RentCar/Header";
import RentCarSearch from "./RentCar/Search";
import DateTimePickerSection from "./RentCar/Date";
import CarCategoryFilter from "./RentCar/Category";
import CarResultsScreen from "./RentCar/Cars";



export default function RentCar() {
    const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSearch = ({ pickupDate, returnDate }) => {
    console.log('Searching cars for:', { searchQuery, pickupDate, returnDate, selectedCategories });
    // Add API call here to fetch available cars, filtering by categories
  };
  

  return (
    <View style={styles.container}>
      <Header title="Car Rental" showBack={true} showRightIcons={true} />
      {/* <View style={styles.separator} /> */}
      <RentCarSearch onSearchQueryChange={setSearchQuery} />
      <DateTimePickerSection
        onPickupChange={setPickupDate}
        onReturnChange={setReturnDate}
        onSearch={handleSearch}
        initialPickupDate={pickupDate}
        initialReturnDate={returnDate}
      />
      <CarResultsScreen/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  separator: { height: 1, backgroundColor: "#d7d7d7", width: "100%" },
  content: { padding: 10, paddingTop: 0, },
});
