// Screens/RentCar/Verification.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function VerificationForm({ navigation, route }) {
  // Safely extract params (JavaScript way)
  const params = route?.params || {};
  const { car = {}, pickupDate = '', returnDate = '' } = params;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseImage, setLicenseImage] = useState(null);
  const [age21Plus, setAge21Plus] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // Safe total calculation
  const calculateTotal = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const days = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 1);
    return (car.pricePerDay || 150000) * days;
  };

  // Format date safely
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? 'Invalid date' : d.toLocaleDateString();
  };

  // Image picker functions
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photos.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setLicenseImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow camera access.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setLicenseImage(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert(
      "Upload Driver's License",
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Form validation
  const validateForm = () => {
    if (!fullName.trim()) return Alert.alert('Required', 'Please enter your full name');
    if (!email.includes('@')) return Alert.alert('Invalid Email', 'Please enter a valid email');
    if (phone.length < 10) return Alert.alert('Invalid Phone', 'Please enter a valid phone number');
    if (!dateOfBirth) return Alert.alert('Required', 'Please enter your date of birth');
    if (!licenseNumber) return Alert.alert('Required', "Please enter your driver's license number");
    if (!licenseImage) return Alert.alert('Required', "Please upload a photo of your driver's license");
    if (!age21Plus) return Alert.alert('Age Requirement', 'You must be 21+ years old');
    if (!agreeTerms) return Alert.alert('Required', 'Please agree to the Terms & Conditions');
    if (!agreePrivacy) return Alert.alert('Required', 'Please agree to the Privacy Policy');
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Booking Confirmed!',
        'Your rental has been confirmed. You will receive a confirmation email shortly.',
        [{ text: 'OK', onPress: () => navigation.navigate('Main', { screen: 'Home' }) }]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verification & Booking</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Car Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="car-sport" size={24} color="#21292B" />
            <Text style={styles.summaryTitle}>Booking Summary</Text>
          </View>
          <View style={styles.summaryContent}>
            <Text style={styles.carName}>{car.model || car.name || 'Car'}</Text>
            <View style={styles.summaryRow}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.summaryText}>
                {formatDate(pickupDate)} - {formatDate(returnDate)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Ionicons name="cash-outline" size={16} color="#666" />
              <Text style={styles.summaryPrice}>
                Total: {calculateTotal().toLocaleString()} RWF
              </Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={20} color="#21292B" />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="your.email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="+250 XXX XXX XXX"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth *</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Driver's License */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card-outline" size={20} color="#21292B" />
            <Text style={styles.sectionTitle}>Driver's License</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>License Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your license number"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              autoCapitalize="characters"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload License Photo *</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={showImageOptions}>
              {licenseImage ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: licenseImage }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => setLicenseImage(null)}
                  >
                    <Ionicons name="close-circle" size={28} color="#ff4444" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.uploadContent}>
                  <Ionicons name="cloud-upload-outline" size={48} color="#21292B" />
                  <Text style={styles.uploadText}>Tap to upload</Text>
                  <Text style={styles.uploadSubtext}>Take a photo or choose from gallery</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Verification Checkboxes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#21292B" />
            <Text style={styles.sectionTitle}>Verification</Text>
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAge21Plus(!age21Plus)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, age21Plus && styles.checkboxChecked]}>
              {age21Plus && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>I confirm that I am 21 years or older</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.checkboxLabel}>
                I agree to the <Text style={styles.link}>Terms & Conditions</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreePrivacy(!agreePrivacy)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreePrivacy && styles.checkboxChecked]}>
              {agreePrivacy && <Ionicons name="checkmark" size={18} color="#fff" />}
            </View>
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.checkboxLabel}>
                I agree to the <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Important Notice */}
        <View style={styles.noticeBox}>
          <Ionicons name="information-circle" size={24} color="#2196F3" />
          <Text style={styles.noticeText}>
            Your information will be verified before pickup. Please ensure all details are accurate.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Confirm Booking</Text>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles (No StyleProp, pure JS)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: { marginRight: 12 },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#21292B', flex: 1 },
  scrollView: { flex: 1 },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 10,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  summaryTitle: { fontSize: 15, fontWeight: 'bold', color: '#21292B', marginLeft: 8 },
  summaryContent: { paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  carName: { fontSize: 15, fontWeight: 'bold', color: '#21292B', marginBottom: 8 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  summaryText: { fontSize: 12, color: '#666', marginLeft: 8 },
  summaryPrice: { fontSize: 13, fontWeight: 'bold', color: '#21292B', marginLeft: 8 },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#21292B', marginLeft: 8 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#21292B', marginBottom: 8 },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#21292B',
  },
  uploadBox: {
    backgroundColor: '#f9f9f9',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 180,
  },
  uploadContent: { alignItems: 'center' },
  uploadText: { fontSize: 16, fontWeight: '600', color: '#21292B', marginTop: 12 },
  uploadSubtext: { fontSize: 12, color: '#999', marginTop: 4 },
  imagePreviewContainer: { width: '100%', height: 180, position: 'relative' },
  imagePreview: { width: '100%', height: '100%', borderRadius: 8, resizeMode: 'cover' },
  removeImageButton: { position: 'absolute', top: -10, right: -10, backgroundColor: '#fff', borderRadius: 14 },
  checkboxRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d0d0d0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: { backgroundColor: '#21292B', borderColor: '#21292B' },
  checkboxTextContainer: { flex: 1 },
  checkboxLabel: { fontSize: 14, color: '#21292B', lineHeight: 20, flex: 1 },
  link: { color: '#2196F3', fontWeight: '600', textDecorationLine: 'underline' },
  noticeBox: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  noticeText: { flex: 1, fontSize: 13, color: '#1565C0', marginLeft: 12, lineHeight: 18 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  submitButton: {
    backgroundColor: '#21292B',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});