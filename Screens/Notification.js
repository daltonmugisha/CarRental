// Screens/NotificationsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Enable LayoutAnimation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(null);

  const notifications = [
    {
      id: "1",
      title: "System update completed successfully.",
      body:
        "Your device has been updated to the latest version with enhanced performance and new features.",
      timestamp: Date.now() - 3000,
    },
    {
      id: "2",
      title: "New Feature Released!",
      body:
        "We have added dark mode and improved UI transitions for smoother experience. Try it out now!",
      timestamp: Date.now() - 600000,
    },
    {
      id: "3",
      title: "Account Security Alert",
      body:
        "A login attempt was detected from a new device. If this was not you, please check your account settings.",
      timestamp: Date.now() - 3600000,
    },
  ];

  const getTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    else if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    else if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    else return `${Math.floor(diff / 86400)} day ago`;
  };

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => (prev === id ? null : id));
  };

  const renderItem = ({ item }) => {
    const isExpanded = expanded === item.id;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("NotificationDetail", { notification: item })}
          style={styles.cardContentTouchable}
        >
          <View style={styles.topRow}>
            <View style={styles.titleRow}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color="#21292B"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.title} numberOfLines={isExpanded ? 0 : 1}>
                {item.title}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => toggleExpand(item.id)}
              style={styles.chevronTouchable}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={18}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {isExpanded && <Text style={styles.body}>{item.body}</Text>}
        </TouchableOpacity>

        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{getTimeAgo(item.timestamp)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fb" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: { marginRight: 8 },
  headerTitle: { fontSize: 17, fontWeight: "600", color: "#21292B" },
  listContainer: { padding: 16, paddingBottom: 50 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContentTouchable: { flexDirection: "column" },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  titleRow: { flexDirection: "row", alignItems: "center", flex: 1, marginRight: 8 },
  title: { color: "#21292B", fontSize: 15, fontWeight: "500", lineHeight: 20, flexShrink: 1 },
  body: { color: "#555", fontSize: 14, marginTop: 8, lineHeight: 20 },
  chevronTouchable: { paddingHorizontal: 6, paddingVertical: 2 },
  timeRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 8 },
  timeText: { color: "#888", fontSize: 12 },
});