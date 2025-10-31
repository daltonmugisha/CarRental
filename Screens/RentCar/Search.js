import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function RentCarSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CarResults"); // Navigate to car search results screen
  };

  return (
    <View style={styles.container}>
      {/* Search Bar Wrapper (Touchable to navigate) */}
      <TouchableOpacity style={styles.searchWrapper} onPress={handlePress} activeOpacity={0.8}>
        {/* Search Icon */}
        <Ionicons
          name="search-outline"
          size={20}
          color="#888"
          style={{ marginLeft: 10 }}
        />

        {/* Fake Input (readOnly look) */}
        <TextInput
          style={styles.input}
          placeholder="Search for a car to rent"
          placeholderTextColor="#888"
          editable={false} // Disable typing, makes it look like an input
          pointerEvents="none" // Ensures only wrapper is clickable
          value={searchQuery}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 10,
    height: 45,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#21292B",
  },
});