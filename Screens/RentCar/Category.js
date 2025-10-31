import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function CarCategoryFilter({ onCategoryChange }) {
  const categories = ['Economy', 'Compact', 'SUV', 'Luxury', 'Van', 'Electric'];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    const newSelected = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newSelected);
    if (onCategoryChange) {
      onCategoryChange(newSelected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategories.includes(category) && styles.selectedButton,
            ]}
            onPress={() => toggleCategory(category)}
            accessibilityLabel={`Select ${category} car category`}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategories.includes(category) && styles.selectedText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#21292B',
    marginBottom: 8,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#21292B',
    borderColor: '#21292B',
  },
  categoryText: {
    fontSize: 12,
    color: '#21292B',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});