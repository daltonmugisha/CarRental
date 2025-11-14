import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function MyPaymentsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const newPayment = route.params?.paymentNumber || null;

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "MTN Mobile Money", number: "+250781234567" },
    { id: 2, type: "Airtel Money", number: "+250788765432" },
  ]);

  // ✅ Only 3 payment histories for testing
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: "tx001",
      service: "City Ride",
      amount: "5300 RWF",
      date: "Oct 29, 2025",
      status: "Success",
      method: "Airtel Money",
      pickup: "Kigali City Center",
      dropoff: "Kimironko Market",
      driver: "John Doe",
      notes: "Smooth ride, 15 min duration",
    },
    {
      id: "tx002",
      service: "Airport Shuttle",
      amount: "7500 RWF",
      date: "Oct 28, 2025",
      status: "Failed",
      method: "MTN MoMo",
      pickup: "Kigali Airport",
      dropoff: "Hotel Des Mille Collines",
      driver: "Jane Smith",
      notes: "Payment declined",
    },
    {
      id: "tx003",
      service: "City Ride",
      amount: "5800 RWF",
      date: "Oct 27, 2025",
      status: "Pending",
      method: "Airtel Money",
      pickup: "Nyamirambo",
      dropoff: "Kimironko",
      driver: "Alex Kamanzi",
      notes: "Awaiting confirmation",
    },
  ]);

  useEffect(() => {
    if (newPayment && !paymentMethods.find((p) => p.number === newPayment)) {
      setPaymentMethods((prev) => [
        ...prev,
        { id: Date.now(), type: "New Payment", number: newPayment },
      ]);
    }
  }, [newPayment]);

  const handleDelete = (id) => {
    setPaymentMethods((prev) => prev.filter((item) => item.id !== id));
  };

  const handleViewDetails = (item) => {
    navigation.navigate("MyPaymentsDetails", { payment: item });
  };

  return (
    <View style={styles.container}>
      {/* Header with + */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Payments</Text>
        <TouchableOpacity
          style={styles.addIconBtn}
          onPress={() => navigation.navigate("NewPayment")}
        >
          <Ionicons name="add-circle-outline" size={28} color="#21292B" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={paymentHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        ListHeaderComponent={
          <>
            {/* Saved Payment Methods */}
            <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
            {paymentMethods.map((method) => (
              <View key={method.id} style={styles.paymentCard}>
                <View style={styles.cardLeft}>
                  <Ionicons name="card-outline" size={24} color="#21292B" style={styles.cardIcon} />
                  <View>
                    <Text style={styles.paymentType}>{method.type}</Text>
                    <Text style={styles.paymentNumber}>{method.number}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleDelete(method.id)} style={styles.deleteBtn}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            ))}

            <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Payment History</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.historyCard}
            onPress={() => handleViewDetails(item)}
          >
            <View style={styles.historyLeft}>
              <Ionicons name="time-outline" size={22} color="#21292B" style={styles.historyIcon} />
              <View>
                <Text style={styles.historyService}>{item.service}</Text>
                <Text style={styles.historyMeta}>{item.date} • {item.method}</Text>
              </View>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.historyAmount}>{item.amount}</Text>
              <Text
                style={[
                  styles.historyStatus,
                  item.status === "Success"
                    ? { color: "#00B67A" }
                    : item.status === "Failed"
                    ? { color: "red" }
                    : { color: "#FFA500" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fb" },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    zIndex: 10,
  },
  backBtn: { marginRight: 10, padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: "600", color: "#21292B", flex: 1 },
  addIconBtn: { padding: 4 },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 10,
  },

  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // elevation: 2,
  },
  cardLeft: { flexDirection: "row", alignItems: "center" },
  cardIcon: { marginRight: 12 },
  paymentType: { fontSize: 15, fontWeight: "600", color: "#21292B" },
  paymentNumber: { fontSize: 13, color: "#777" },
  deleteBtn: { padding: 6, backgroundColor: "#f9e1e1", borderRadius: 8 },

  historyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 3,
    // elevation: 2,
  },
  historyLeft: { flexDirection: "row", alignItems: "center" },
  historyIcon: { marginRight: 10 },
  historyService: { fontSize: 15, fontWeight: "600", color: "#21292B" },
  historyMeta: { fontSize: 12, color: "#777" },
  historyAmount: { fontSize: 15, fontWeight: "600", color: "#21292B" },
  historyStatus: { fontSize: 12, marginTop: 3, fontWeight: "500" },
});
