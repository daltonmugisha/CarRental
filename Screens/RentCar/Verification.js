// Screens/RentCar/Verification.js
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

export default function VerificationForm() {
  const navigation = useNavigation();
  const route = useRoute();

  const { 
    car = {}, 
    pickupDate: pickupIso = '', 
    returnDate: returnIso = '',
    totalRental = 0,
    securityDeposit = 0
  } = route.params || {};

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+250');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseImage, setLicenseImage] = useState(null);
  const [age21Plus, setAge21Plus] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

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

  const finalTotal = totalRental + securityDeposit;

  const formatDateTime = (isoString) => {
    if (!isoString) return 'Not set';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Invalid date';
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return showAlert('Permission Needed', 'Allow photo access.');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) setLicenseImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return showAlert('Permission Needed', 'Allow camera access.');
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) setLicenseImage(result.assets[0].uri);
  };

  const showImageOptions = () => {
    Alert.alert(
      "Upload Driver's License",
      "Choose how to add your license photo",
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
    if (!fullName.trim()) return showAlert('Oops!', 'Please enter your full name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showAlert('Invalid Email', 'Enter valid email');
    if (!/^(\+2507[0-9]{8})$/.test(phone)) return showAlert('Wrong Number', 'Use: +2507xxxxxxxx');
    if (!dateOfBirth.match(/^\d{2}\/\d{2}\/\d{4}$/)) return showAlert('Wrong Date', 'Use format: DD/MM/YYYY');
    if (!licenseNumber.trim()) return showAlert('Missing License', "Enter your driver's license number");
    if (!licenseImage) return showAlert('Photo Required', "Upload a clear photo of your license");
    if (!age21Plus) return showAlert('Age Required', 'You must be 21+ to rent');
    if (!agreeTerms || !agreePrivacy) return showAlert('Agreement Needed', 'Accept Terms & Privacy Policy');
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    showAlert('Booking Confirmed!', 
      `Thank you, ${fullName}!\n\nYour ${car.name || 'car'} is reserved.\n\nPickup: ${formatDateTime(pickupIso)}\nReturn: ${formatDateTime(returnIso)}\nTotal: ${finalTotal.toLocaleString()} RWF\n\nCheck your WhatsApp in 5 mins!`
    );
  };

  // EXACT SAME IMAGE PREVIEW AS BUY VERIFICATION
  const CarImagePreview = () => {
  const { localImage, thumbnail, image, images } = car;

  if (localImage && typeof localImage === 'object') {
    return <Image source={localImage} style={styles.carImage} resizeMode="cover" />;
  }

  const imageUri = thumbnail || (Array.isArray(images) && images[0]) || image;

  if (imageUri && typeof imageUri === 'string') {
    return <Image source={{ uri: imageUri }} style={styles.carImage} resizeMode="cover" />;
  }

  return (
    <View style={[styles.carImage, {
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd'
    }]}>
      <Ionicons name="car-sport" size={32} color="#999" />
    </View>
  );
};

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Booking</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* YOUR RENTAL CARD — NOW WITH PERFECT SMALL IMAGE */}
        <View style={styles.perfectedCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="car-sport" size={26} color="#21292B" />
            <Text style={styles.summaryTitle}>Your Rental</Text>
          </View>

          {/* THIS IS THE MAGIC PART — EXACT SAME AS BUY */}
          <View style={styles.carInfo}>
            <CarImagePreview />
            <View style={styles.carDetails}>
              <Text style={styles.carName}>{car.name || 'Selected Car'}</Text>
              <Text style={styles.carYear}>
                • {car.year || '2024'} • {car.transmission || 'Auto'} • {car.mileage ? `${car.mileage} KM` : 'Low KM'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <Text style={styles.summaryText}>Pickup</Text>
            <Text style={styles.summaryValue}>{formatDateTime(pickupIso)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <Text style={styles.summaryText}>Return</Text>
            <Text style={styles.summaryValue}>{formatDateTime(returnIso)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Ionicons name="cash-outline" size={18} color="#666" />
            <Text style={styles.summaryText}>Total Paid</Text>
            <Text style={styles.summaryPrice}>{finalTotal.toLocaleString()} RWF</Text>
          </View>
        </View>

        {/* REST OF FORM — UNCHANGED */}
        <View style={styles.perfectedCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={22} color="#21292B" />
            <Text style={styles.sectionTitle}>Personal Details</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput style={styles.input} placeholder="e.g. Jean Paul Hakizimana" value={fullName} onChangeText={setFullName} placeholderTextColor="#999" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput style={styles.input} placeholder="jeanpaul@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#999" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput style={styles.input} placeholder="+250 788 123 456" value={phone} onChangeText={(t) => setPhone(t.startsWith('+250') ? t : '+250')} keyboardType="phone-pad" maxLength={13} placeholderTextColor="#999" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth * (DD/MM/YYYY)</Text>
            <TextInput style={styles.input} placeholder="15/06/1995" value={dateOfBirth} onChangeText={setDateOfBirth} keyboardType="numeric" maxLength={10} placeholderTextColor="#999" />
          </View>
        </View>

        <View style={styles.perfectedCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card-outline" size={22} color="#21292B" />
            <Text style={styles.sectionTitle}>Driver's License</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>License Number *</Text>
            <TextInput style={styles.input} placeholder="e.g. 123456789" value={licenseNumber} onChangeText={setLicenseNumber} autoCapitalize="characters" placeholderTextColor="#999" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload License Photo *</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={showImageOptions}>
              {licenseImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: licenseImage }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.removeImageButton} onPress={() => setLicenseImage(null)}>
                    <Ionicons name="close-circle" size={32} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadContent}>
                  <Ionicons name="camera-outline" size={50} color="#21292B" />
                  <Text style={styles.uploadText}>Tap to Upload License</Text>
                  <Text style={styles.uploadSubtext}>Clear photo • Front side only</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.perfectedCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#21292B" />
            <Text style={styles.sectionTitle}>Final Confirmation</Text>
          </View>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => setAge21Plus(!age21Plus)}>
            <View style={[styles.checkbox, age21Plus && styles.checkboxChecked]}>
              {age21Plus && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>I am 21 years old or older</Text>
          </TouchableOpacity>
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

        <View style={styles.perfectedCard}>
          <View style={styles.noticeBox}>
            <Ionicons name="information-circle" size={26} color="#0D47A1" />
            <Text style={styles.noticeText}>
              Your booking is secured. You will receive a WhatsApp confirmation within 5 minutes.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Animated.View style={[styles.bottomBar, { bottom: bottomValue }]}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            Pay {finalTotal.toLocaleString()} RWF & Confirm
          </Text>
          <Ionicons name="lock-closed" size={15} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

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
  summaryHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingBottom: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  summaryTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#21292B', 
    marginLeft: 10 
  },
  carInfo: { 
    flexDirection: 'row', 
    paddingTop: 12 
  },
  carImage: { 
    width: 90, 
    height: 60, 
    borderRadius: 8,
    backgroundColor: '#f0f0f0'
  },
  carDetails: { 
    marginLeft: 16, 
    justifyContent: 'center',
    flex: 1
  },
  carName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#21292B' 
  },
  carYear: { 
    fontSize: 13, 
    color: '#666', 
    marginTop: 4 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#eee', 
    marginVertical: 12 
  },
  summaryRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8 
  },
  summaryText: { 
    flex: 1, 
    fontSize: 14, 
    color: '#555' 
  },
  summaryValue: { 
    fontSize: 13, 
    color: '#21292B', 
    fontWeight: '600' 
  },
  summaryPrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#21292B' 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#21292B', 
    marginLeft: 10 
  },
  inputGroup: { marginBottom: 18 },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#21292B', 
    marginBottom: 8 
  },
  input: { 
    backgroundColor: '#f9f9f9', 
    borderWidth: 1.5, 
    borderColor: '#e0e0e0', 
    borderRadius: 8, 
    padding: 14, 
    fontSize: 15, 
    color: '#21292B' 
  },
  uploadBox: { 
    backgroundColor: '#f8f9fa', 
    borderWidth: 2, 
    borderColor: '#ddd', 
    borderStyle: 'dashed', 
    borderRadius: 8, 
    padding: 20, 
    alignItems: 'center', 
    minHeight: 180 
  },
  uploadContent: { alignItems: 'center' },
  uploadText: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#21292B', 
    marginTop: 12 
  },
  uploadSubtext: { 
    fontSize: 13, 
    color: '#888', 
    marginTop: 6, 
    textAlign: 'center' 
  },
  imagePreviewContainer: { 
    width: '100%', 
    height: 180, 
    position: 'relative', 
    borderRadius: 8, 
    overflow: 'hidden' 
  },
  imagePreview: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  removeImageButton: { 
    position: 'absolute', 
    top: 8, 
    right: 8, 
    backgroundColor: 'rgba(255,255,255,0.9)', 
    borderRadius: 20, 
    padding: 4 
  },
  checkboxRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 16, 
    paddingRight: 20 
  },
  checkbox: { 
    width: 26, 
    height: 26, 
    borderRadius: 8, 
    borderWidth: 2.5, 
    borderColor: '#ccc', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 14, 
    marginTop: 2 
  },
  checkboxChecked: { 
    backgroundColor: '#21292B', 
    borderColor: '#21292B' 
  },
  checkboxLabel: { 
    fontSize: 14.5, 
    color: '#21292B', 
    lineHeight: 22, 
    flex: 1 
  },
  link: { 
    color: '#0066CC', 
    fontWeight: 'bold', 
    textDecorationLine: 'underline' 
  },
  noticeBox: { 
    flexDirection: 'row', 
    backgroundColor: '#E3F2FD', 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1.5, 
    borderColor: '#1976D2', 
    alignItems: 'center' 
  },
  noticeText: { 
    flex: 1, 
    fontSize: 14, 
    color: '#0D47A1', 
    marginLeft: 12, 
    lineHeight: 21, 
    fontWeight: '500' 
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  submitButton: { 
    backgroundColor: '#21292B', 
    borderRadius: 12, 
    paddingVertical: 18, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 10 
  },
  submitButtonText: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
});

const alertStyles = StyleSheet.create({
  fullOverlay: { 
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(0,0,0,0.85)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 9999 
  },
  alertBox: { 
    width: '85%', 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 24, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 10 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 20, 
    elevation: 20 
  },
  iconCircle: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#E8F5E9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#21292B', 
    marginBottom: 8, 
    textAlign: 'center' 
  },
  message: { 
    fontSize: 15, 
    color: '#555', 
    textAlign: 'center', 
    lineHeight: 22, 
    marginBottom: 24 
  },
  button: { 
    backgroundColor: '#21292B', 
    paddingHorizontal: 32, 
    paddingVertical: 14, 
    borderRadius: 12 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 15, 
    fontWeight: 'bold' 
  },
});