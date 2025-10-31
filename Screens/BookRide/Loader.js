import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LoadingScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Destructure passed params
  const { pickupLocation, destination, selectedRide, distanceKm } = route.params;

  const carAnim = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);

  // Animate car movement
  useEffect(() => {
    Animated.timing(carAnim, {
      toValue: 1,
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // Increment progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 1, 100));
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Navigate when progress reaches 100
  useEffect(() => {
    if (progress >= 100) {
      navigation.replace("GetDriver", {
        pickupLocation,
        destination,
        selectedRide,
        distanceKm,
      });
    }
  }, [progress]);

  // Car horizontal movement
  const translateX = carAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150], // adjust for screen width
  });

  return (
    <View style={styles.container}>
      <View style={styles.roadContainer}>
        <View style={styles.roadLine} />
        <Animated.View
          style={[
            styles.carContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <FontAwesome5 name="car-side" size={30} color="#222" />
        </Animated.View>
        <Text style={styles.percentText}>{progress}%</Text>
      </View>

      <Text style={styles.loadingText}>Getting your driver ready....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  roadContainer: {
    position: "absolute",
    bottom: 50,
    width: "80%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  roadLine: {
    width: "100%",
    height: 4,
    backgroundColor: "#222",
    borderRadius: 2,
  },
  carContainer: {
    position: "absolute",
    bottom: 37,
  },
  percentText: {
    position: "absolute",
    right: 0,
    bottom: 10,
    color: "#222",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    position: "absolute",
    bottom: 40,
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
  },
});
