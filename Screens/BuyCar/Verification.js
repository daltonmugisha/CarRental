// Screens/BuyCar/BuyCarVerificationForm.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  Alert,
  Keyboard,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

// KING RWANDA FULL-SCREEN ALERT (EXACT SAME AS RENTAL)
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

export default function BuyCarVerificationForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car = {} } = route.params || {};

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+250');
  const [nationalId, setNationalId] = useState('');
  const [idImage, setIdImage] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // ANIMATED BOTTOM BAR — NEVER STUCK (SAME AS RENTAL)
  const bottomValue = new Animated.Value(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(bottomValue, { toValue: 0, duration: 0, useNativeDriver: false }).start();
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(bottomValue, { toValue: 0, duration: 0, useNativeDriver: false }).start();
    });
    return () => { show.remove(); hide.remove(); };
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return showAlert('Permission Needed', 'Allow photo access to upload ID.');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) setIdImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return showAlert('Permission Needed', 'Allow camera to take ID photo.');
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) setIdImage(result.assets[0].uri);
  };

  const showImageOptions = () => {
    Alert.alert(
      "Upload National ID",
      "Choose how to add your ID photo",
      [
        { text: "Take Photo", onPress: takePhoto },
        { text: "Choose from Gallery", onPress: pickImage },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const validateForm = () => {
    if (!fullName.trim()) return showAlert('Missing Name', 'Enter your full name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showAlert('Invalid Email', 'Enter valid email');
    if (!/^(\+2507[0-9]{8})$/.test(phone)) return showAlert('Wrong Number', 'Use: +2507xxxxxxxx');
    if (!nationalId.trim()) return showAlert('Missing ID', 'Enter National ID number');
    if (!idImage) return showAlert('Photo Required', 'Upload clear ID photo');
    if (!agreeTerms || !agreePrivacy) return showAlert('Agreement Needed', 'Accept Terms & Privacy');
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const price = (car.purchasePrice || 25000000).toLocaleString();
    showAlert('Purchase Confirmed!',
      `Congratulations, ${fullName}!\n\nYou just bought:\n${car.name || 'Car'} (${car.year})\nMileage: ${car.mileage || 'Low KM'}\n\nTotal: ${price} RWF\n\nOwnership transfer begins now!\nWhatsApp confirmation in 5 mins!`
    );
  };

  const CarImagePreview = () => {
    const imageUri = car.thumbnail || car.images?.[0] || car.image;
    if (!imageUri || typeof imageUri !== 'string') {
      return (
        <View style={[styles.carImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }]}>
          <Ionicons name="car-sport" size={32} color="#bbb" />
        </View>
      );
    }
    return <Image source={{ uri: imageUri }} style={styles.carImage} resizeMode="cover" />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* HEADER — SAME AS RENTAL */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Purchase</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* CAR SUMMARY — PERFECTED */}
        <View style={styles.perfectedCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="car-sport" size={26} color="#21292B" />
            <Text style={styles.summaryTitle}>Your Purchase</Text>
          </View>
          <View style={styles.carInfo}>
            <CarImagePreview />
            <View style={styles.carDetails}>
              <Text style={styles.carName}>{car.name || 'Selected Car'}</Text>
              <Text style={styles.carYear}>• {car.year} • {car.mileage || 'Low KM'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="speedometer-outline" size={18} color="#666" />
            <Text style={styles.summaryText}>Mileage</Text>
            <Text style={styles.summaryValue}>{car.mileage || 'N/A'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="cash-outline" size={18} color="#666" />
            <Text style={styles.summaryText}>Total Price</Text>
            <Text style={styles.summaryPrice}>
              {(car.purchasePrice || 25000000).toLocaleString()} RWF
            </Text>
          </View>
        </View>

        {/* PERSONAL DETAILS */}
        <View style={styles.perfectedCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={22} color="#21292B" />
            <Text style={styles.sectionTitle}>Personal Details</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput style={styles.input} placeholder="e.g. Marie Claire Uwase" value={fullName} onChangeText={setFullName} placeholderTextColor="#999" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput style={styles.input} placeholder="marie@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#999" />
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
              placeholderTextColor="#999" 
            />
          </View>
        </View>

        {/* NATIONAL ID */}
        <View style={styles.perfectedCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card-outline" size={22} color="#21292B" />
            <Text style={styles.sectionTitle}>National ID</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ID Number *</Text>
            <TextInput style={styles.input} placeholder="1199980043215678" value={nationalId} onChangeText={setNationalId} keyboardType="numeric" placeholderTextColor="#999" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload ID Photo *</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={showImageOptions}>
              {idImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: idImage }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.removeImageButton} onPress={() => setIdImage(null)}>
                    <Ionicons name="close-circle" size={32} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadContent}>
                  <Ionicons name="camera-outline" size={50} color="#21292B" />
                  <Text style={styles.uploadText}>Tap to Upload ID</Text>
                  <Text style={styles.uploadSubtext}>Clear photo • Front & back</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* FINAL CONFIRMATION */}
        <View style={styles.perfectedCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#21292B" />
            <Text style={styles.sectionTitle}>Final Confirmation</Text>
          </View>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreeTerms(!agreeTerms)}>
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>I agree to the <Text style={styles.link}>Terms & Conditions</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setAgreePrivacy(!agreePrivacy)}>
            <View style={[styles.checkbox, agreePrivacy && styles.checkboxChecked]}>
              {agreePrivacy && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>I agree to the <Text style={styles.link}>Privacy Policy</Text></Text>
          </TouchableOpacity>
        </View>

        {/* ROYAL NOTICE */}
        <View style={styles.perfectedCard}>
          <View style={styles.noticeBox}>
            <Ionicons name="information-circle" size={26} color="#0D47A1" />
            <Text style={styles.noticeText}>
              Ownership transfer begins immediately. You’ll receive plate number & papers within 48 hours via WhatsApp.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* FIXED BOTTOM BAR — EXACT SAME AS RENTAL */}
      <Animated.View style={[styles.bottomBar, { bottom: bottomValue }]}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            Pay {(car.purchasePrice || 25000000).toLocaleString()} RWF & Own It
          </Text>
          <Ionicons name="lock-closed" size={15} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* CUSTOM ALERT — SAME AS RENTAL */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={() => {
          setAlertVisible(false);
          if (alertTitle === 'Purchase Confirmed!') {
            navigation.navigate('Main', { screen: 'Home' });
          }
        }}
      />
    </View>
  );
}

// EXACT SAME STYLES AS RENTAL — ZERO DIFFERENCE
const styles = StyleSheet.create({
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 20, 
    paddingHorizontal: 10, 
    paddingTop: 40, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0' 
  },
  backButton: { marginRight: 12 },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#21292B', flex: 1 },
  perfectedCard: { 
    backgroundColor: '#fff', 
    marginHorizontal: 10, 
    marginTop: 10, 
    padding: 16, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#e0e0e0',
    
  },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#21292B', marginLeft: 10 },
  carInfo: { flexDirection: 'row', paddingTop: 12 },
  carImage: { width: 90, height: 60, borderRadius: 8 },
  carDetails: { marginLeft: 16, justifyContent: 'center' },
  carName: { fontSize: 16, fontWeight: 'bold', color: '#21292B' },
  carYear: { fontSize: 13, color: '#666', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  summaryText: { flex: 1, fontSize: 14, color: '#555' },
  summaryValue: { fontSize: 13, color: '#21292B', fontWeight: '600' },
  summaryPrice: { fontSize: 16, fontWeight: 'bold', color: '#21292B' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#21292B', marginLeft: 10 },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#21292B', marginBottom: 8 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1.5, borderColor: '#e0e0e0', borderRadius: 8, padding: 14, fontSize: 15, color: '#21292B' },
  uploadBox: { backgroundColor: '#f8f9fa', borderWidth: 2, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 8, padding: 20, alignItems: 'center', minHeight: 180 },
  uploadContent: { alignItems: 'center' },
  uploadText: { fontSize: 17, fontWeight: 'bold', color: '#21292B', marginTop: 12 },
  uploadSubtext: { fontSize: 13, color: '#888', marginTop: 6, textAlign: 'center' },
  imagePreviewContainer: { width: '100%', height: 180, position: 'relative', borderRadius: 8, overflow: 'hidden' },
  imagePreview: { width: '100%', height: '100%', resizeMode: 'cover' },
  removeImageButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 20, padding: 4 },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16, paddingRight: 20 },
  checkbox: { width: 26, height: 26, borderRadius: 8, borderWidth: 2.5, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 },
  checkboxChecked: { backgroundColor: '#21292B', borderColor: '#21292B' },
  checkboxLabel: { fontSize: 14.5, color: '#21292B', lineHeight: 22, flex: 1 },
  link: { color: '#0066CC', fontWeight: 'bold', textDecorationLine: 'underline' },
  noticeBox: { flexDirection: 'row', backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, borderWidth: 1.5, borderColor: '#1976D2', alignItems: 'center' },
  noticeText: { flex: 1, fontSize: 14, color: '#0D47A1', marginLeft: 12, lineHeight: 21, fontWeight: '500' },
  bottomBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1, borderTopColor: '#e0e0e0',
    shadowColor: '#000', shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1, shadowRadius: 10, elevation: 20,
  },
  submitButton: { backgroundColor: '#21292B', borderRadius: 12, paddingVertical: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});

const alertStyles = StyleSheet.create({
  fullOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  alertBox: { width: '85%', backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 20 },
  iconCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#21292B', marginBottom: 8, textAlign: 'center' },
  message: { fontSize: 15, color: '#555', textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  button: { backgroundColor: '#21292B', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});