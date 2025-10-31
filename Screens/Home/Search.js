import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import FilterModal from "./FilterModal"; // import your child modal

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [filterVisible, setFilterVisible] = useState(false); // controls modal

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#888"
          style={{ marginLeft: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search your dream car"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
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
    zIndex: 1, // 
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
  filterButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#fff",
  },
});
