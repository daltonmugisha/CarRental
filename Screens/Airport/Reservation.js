import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

// === KING RWANDA FULL-SCREEN ALERT ===
const CustomAlert = ({ visible, title, message, onClose }) => {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={alertStyles.fullOverlay}>
        <View style={alertStyles.alertBox}>
          <View style={alertStyles.iconCircle}>
            {title.includes('Confirmed') ? (
              <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
            ) : (
              <Ionicons name="alert-circle" size={36} color="#FF6B6B" />
            )}
          </View>
          <Text style={alertStyles.title}>{title}</Text>
          <Text style={alertStyles.message}>{message}</Text>
          <TouchableOpacity style={alertStyles.button} onPress={onClose}>
            <Text style={alertStyles.buttonText}>GOT IT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function ReservationAirportScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const reservation = route.params || {};

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+250");
  const [passengers, setPassengers] = useState("");
  const [note, setNote] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // EXTRACT ALL DATA — FIXED: ONLY ONE `ride` DECLARATION!
  const pickupLocation = reservation.pickupLocation || "Kigali International Airport (Kanombe)";
  const destination = reservation.destination || "Not set";
  const flightNumber = reservation.flightInfo || "Not provided";
  const distanceKm = reservation.distanceKm || 0;
  const pickupDateTime = reservation.pickupDateTime ? new Date(reservation.pickupDateTime) : new Date();

  // ONLY ONE RIDE — WITH TOTAL PRICE FROM ROUTE SCREEN!
  const selectedRide = reservation.selectedRide || { 
    id: 1,
    name: "Standard Shuttle", 
    ratePerKm: 1000, 
    totalPrice: 0 
  };

  const pricePerKm = selectedRide.ratePerKm || 1000;
  const totalPrice = selectedRide.totalPrice || Math.round(distanceKm * pricePerKm);

  const formatDateTime = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }) + ' GMT+2';
  };

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const validateForm = () => {
    if (!fullName.trim()) return showAlert('Oops!', 'Please enter your full name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showAlert('Invalid Email', 'Enter valid email');
    if (!/^(\+2507[0-9]{8})$/.test(phone)) return showAlert('Wrong Number', 'Use: +2507xxxxxxxx');
    if (!passengers.trim()) return showAlert('Required', 'Please enter number of passengers');
    if (!agreeTerms) return showAlert('Agreement Needed', 'Accept Terms & Privacy Policy');
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

   showAlert('Booking Confirmed!', 
  `Thank you, ${fullName}!\n\n` +
  `Your airport shuttle is reserved.\n\n` +
  `Pickup        : ${pickupLocation}\n` +
  `Drop-off      : ${destination}\n` +
  `Vehicle       : ${selectedRide.name.replace(/\n/g, ' ')}\n` +
  `Distance      : ${distanceKm.toFixed(1)} km\n` +
  `Price         : ${totalPrice.toLocaleString()} RWF\n` +
  `Date & Time   : ${formatDateTime(pickupDateTime)}\n` +
  `Flight        : ${flightNumber}\n` +
  `Passengers    : ${passengers}\n` +
  `Requests      : ${note || "None"}\n\n` +
  `Check your WhatsApp in 5 mins!\n` +
  `KING RWANDA — You are VIP!`
);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Your Booking</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* YOUR SHUTTLE CARD */}
        <View style={styles.perfectedCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="car-sport" size={26} color="#21292B" />
            <Text style={styles.summaryTitle}>Your Airport Shuttle</Text>
          </View>

          <View style={styles.carInfo}>
            <View style={styles.carImagePlaceholder}>
              <Ionicons name="car-sport" size={32} color="#fff" />
            </View>
            <View style={styles.carDetails}>
              <Text style={styles.carName}>{selectedRide.name}</Text>
              <Text style={styles.carYear}>
                {distanceKm.toFixed(1)} km • {pricePerKm.toLocaleString()} RWF/km
              </Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{totalPrice.toLocaleString()} RWF</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="airplane" size={18} color="#666" style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Flight Info</Text>
            <Text style={styles.rowValue}>{flightNumber}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#666" style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Pickup</Text>
            <Text style={styles.rowValue}>{pickupLocation}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="flag-outline" size={18} color="#666" style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Drop-off</Text>
            <Text style={styles.rowValue}>{destination}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={18} color="#666" style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Date & Time</Text>
            <Text style={styles.rowValue}>{formatDateTime(pickupDateTime)}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="people-outline" size={18} color="#666" style={styles.rowIcon} />
            <Text style={styles.rowLabel}>Passengers</Text>
            <Text style={styles.rowValue}>{passengers || "Not set yet"}</Text>
          </View>
        </View>

        {/* PERSONAL INFO */}
        <View style={styles.perfectedCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={22} color="#21292B" />
            <Text style={styles.sectionTitle}>Your Information</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput style={styles.input} placeholder="Jean Paul Hakizimana" value={fullName} onChangeText={setFullName} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput style={styles.input} placeholder="jean@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput 
              style={styles.input} 
              placeholder="+250 788 123 456" 
              value={phone} 
              onChangeText={(t) => setPhone(t.startsWith('+250') ? t : '+250')} 
              keyboardType="phone-pad" 
              maxLength={13} 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Passengers *</Text>
            <TextInput style={styles.input} placeholder="e.g. 3" value={passengers} onChangeText={setPassengers} keyboardType="numeric" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Special Requests</Text>
            <TextInput 
              style={[styles.input, { height: 100, textAlignVertical: "top", paddingTop: 14 }]} 
              placeholder="Baby seat, extra luggage..." 
              value={note} 
              onChangeText={setNote} 
              multiline 
            />
          </View>
        </View>

        {/* TERMS */}
        <View style={styles.perfectedCard}>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreeTerms(!agreeTerms)}>
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the <Text style={styles.link}>Terms & Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* NOTICE */}
        <View style={styles.perfectedCard}>
          <View style={styles.noticeBox}>
            <Ionicons name="information-circle" size={26} color="#0D47A1" />
            <Text style={styles.noticeText}>
              Your booking is secured. You will receive a WhatsApp confirmation within 5 minutes.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            Confirm & Pay {totalPrice.toLocaleString()} RWF
          </Text>
          <Ionicons name="lock-closed" size={15} color="#fff" />
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          if (alertTitle === 'Booking Confirmed!') {
            navigation.navigate('Main', { screen: 'Home' });
          }
        }}
      />
    </View>
  );
}

// STYLES — SAME AS BEFORE
const styles = StyleSheet.create({
  // ... ALL YOUR STYLES HERE (unchanged) ...
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  rowIcon: { width: 30, textAlign: 'center' },
  rowLabel: { flex: 1, fontSize: 14.5, color: '#444', fontWeight: '600', marginLeft: 8 },
  rowValue: { fontSize: 14.5, color: '#21292B', fontWeight: '700', textAlign: 'right', marginRight: 4, maxWidth: '50%' },
  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: 20, paddingHorizontal: 10, paddingTop: 40, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  backButton: { marginRight: 12 },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#21292B', flex: 1 },
  perfectedCard: { backgroundColor: '#fff', marginHorizontal: 10, marginTop: 10, padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#21292B', marginLeft: 10 },
  carInfo: { flexDirection: 'row', paddingTop: 12, alignItems: 'center' },
  carImagePlaceholder: { width: 90, height: 60, borderRadius: 8, backgroundColor: '#0d48a18e', justifyContent: 'center', alignItems: 'center' },
  carDetails: { marginLeft: 16, justifyContent: 'center', flex: 1 },
  carName: { fontSize: 16, fontWeight: 'bold', color: '#21292B' },
  carYear: { fontSize: 13, color: '#666', marginTop: 4 },
  priceTag: { backgroundColor: '#0D47A1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  priceText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#21292B', marginLeft: 10 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#21292B', marginBottom: 8 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 8, padding: 14, fontSize: 15, color: '#21292B' },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16, paddingRight: 20 },
  checkbox: { width: 26, height: 26, borderRadius: 8, borderWidth: 2.5, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 },
  checkboxChecked: { backgroundColor: '#0D47A1', borderColor: '#0D47A1' },
  checkboxLabel: { fontSize: 14.5, color: '#21292B', lineHeight: 22, flex: 1 },
  link: { color: '#0066CC', fontWeight: 'bold', textDecorationLine: 'underline' },
  noticeBox: { flexDirection: 'row', backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, borderWidth: 1.5, borderColor: '#1976D2', alignItems: 'center' },
  noticeText: { flex: 1, fontSize: 14, color: '#0D47A1', marginLeft: 12, lineHeight: 21, fontWeight: '500' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 30, borderTopWidth: 1, borderTopColor: '#e0e0e0', shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 20 },
  submitButton: { backgroundColor: '#21292B', borderRadius: 12, paddingVertical: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});

const alertStyles = StyleSheet.create({
  fullOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  alertBox: { width: '85%', backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 20 },
  iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#21292B', marginBottom: 8, textAlign: 'center' },
  message: { 
  fontSize: 15.5, 
  color: '#333', 
  textAlign: 'left',           // LEFT ALIGNED!
  lineHeight: 28,              // BIG GAP BETWEEN LINES
  fontWeight: '500',
  paddingHorizontal: 10,
  width: '100%',
},
  button: { backgroundColor: '#21292B', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});