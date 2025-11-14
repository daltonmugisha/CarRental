// Screens/Home.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './Home/Header';
import SearchBar from './Home/Search';
import CarBrandsScroll from './Home/CarBrands';
import CarRows from './Home/card';
import TrendingCars from './Home/Trend';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <SearchBar />

      {/* MAIN SCROLLVIEW - KILL ALL SCROLLBARS */}
      <ScrollView
        showsVerticalScrollIndicator={false}    // HIDES VERTICAL BAR (Android + iOS)
        showsHorizontalScrollIndicator={false}  // JUST IN CASE
        contentContainerStyle={styles.content}
        bounces={true}                          // Feels premium on iOS
        overScrollMode="never"                  // No glow on Android
      >
        <CarBrandsScroll />
        <CarRows />
        <TrendingCars />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0, // Extra space at bottom — feels complete
  },
});