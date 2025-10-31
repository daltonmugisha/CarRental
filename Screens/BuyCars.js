import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "./BuyCar/Header";
import BuyCarSearch from "./BuyCar/Search";
import CarCategoryFilter from "./BuyCar/Category";
import CarResultsScreen from "./BuyCar/Cars";

export default function BuyCarsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000000 }); // Example price range in RWF

  const handleSearch = ({ searchQuery, selectedCategories, priceRange }) => {
    console.log('Searching cars for:', { searchQuery, selectedCategories, priceRange });
    // Add API call here to fetch cars for sale, filtering by query, categories, and price range
  };

  return (
    <View style={styles.container}>
      <Header title="Buy Cars" showBack={true} showRightIcons={true} />
      <BuyCarSearch 
        onSearchQueryChange={setSearchQuery} 
        onPriceRangeChange={setPriceRange}
      />
      <CarCategoryFilter 
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
      />
      <CarResultsScreen 
        searchQuery={searchQuery}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  separator: { height: 1, backgroundColor: "#d7d7d7", width: "100%" },
  content: { padding: 10, paddingTop: 0 },
});