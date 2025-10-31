import React from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) { // get navigation from props
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/c1.png")} 
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        {/* Bottom content */}
        <View style={styles.bottom}>
          <Text style={styles.title}>Start your journey with GoSnap</Text>
          <Text style={styles.subtitle}>
            Discover your next adventure with GoSnap. We’re here to provide you with a seamless car rental experience. Let’s get started on your journey.
          </Text>

          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate("Login")} // navigate to Login screen
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.70)",
  },
  bottom: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "left",
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: "#21292B",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  getStartedText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
