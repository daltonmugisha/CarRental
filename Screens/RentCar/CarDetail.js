// Screens/RentCar/CarDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CarDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Safe date handling
  const createSafeDate = (dateInput, fallback) => {
    if (!dateInput) return fallback;
    try {
      if (dateInput instanceof Date) return !isNaN(dateInput.getTime()) ? dateInput : fallback;
      const parsed = new Date(dateInput);
      return !isNaN(parsed.getTime()) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const [pickupDate, setPickupDate] = useState(
    createSafeDate(route.params?.pickupDate, new Date())
  );
  const [returnDate, setReturnDate] = useState(
    createSafeDate(route.params?.returnDate, new Date(Date.now() + 24 * 60 * 60 * 1000))
  );
  const [showPickup, setShowPickup] = useState(false);
  const [showReturn, setShowReturn] = useState(false);

  // Car data from route
  const carData = route.params?.car || {
    id: 1,
    name: "Ford Transit",
    model: "Transit",
    make: "Ford",
    year: 2023,
    color: "Frozen White",
    licensePlate: "RAB 303L",
    vin: "1FTYR1ZM7KKB12345",
    rating: 4.5,
    seats: 12,
    pricePerDay: 240000,
    paymentMethod: "Cash / Mobile Money",
    fuelType: "Diesel",
    transmission: "Manual",
    features: ['Air Conditioning', '12 Seats', 'Cargo Space', 'Bluetooth', 'USB Ports'],
    images: [
      'https://di-Uploads-pod16.dealerinspire.com/fordofwestmemphis/uploads/2023/01/2023-Ford-Transit-Cargo-Van-Exterior.jpg',
      'https://di-Uploads-pod16.dealerinspire.com/fordofwestmemphis/uploads/2023/01/2023-Ford-Transit-Cargo-Van-Interior.jpg',
      'https://di-Uploads-pod16.dealerinspire.com/fordofwestmemphis/uploads/2023/01/2023-Ford-Transit-Cargo-Van-Seats.jpg',
    ],
    // REVIEWS COPIED FROM BUY SCREEN — PERFECT STYLE
    reviews: [
      { user: 'John Doe', rating: 5, comment: 'Amazing car! Smooth ride and great value for the price.', avatar: 'https://i.pravatar.cc/150?img=12' },
      { user: 'Sarah Smith', rating: 4, comment: 'Really happy with my purchase. The car was in great condition.', avatar: 'https://i.pravatar.cc/150?img=45' },
      { user: 'Mike Johnson', rating: 5, comment: 'Excellent buying experience. The car exceeded my expectations!', avatar: 'https://i.pravatar.cc/150?img=33' },
      { user: 'Emma Brown', rating: 4, comment: 'Good value for money. Would definitely buy again.', avatar: 'https://i.pravatar.cc/150?img=23' },
    ],
  };

  const pricePerDay = carData.pricePerDay || 240000;
  const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalRental = pricePerDay * diffDays;
  const securityDeposit = Math.round(totalRental * 0.5);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // STAR RENDERER — SAME AS BUY SCREEN
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FontAwesome
        key={i}
        name={i < rating ? 'star' : 'star-o'}
        size={14}
        color={i < rating ? 'orange' : '#ccc'}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.title}>{carData.name} ({carData.year})</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE GALLERY */}
        <View style={styles.imageGallery}>
          <Image source={{ uri: carData.images[0] }} style={styles.mainImage} />
          <View style={styles.sideImagesContainer}>
            <Image source={{ uri: carData.images[1] }} style={styles.sideImage} />
            <Image source={{ uri: carData.images[2] }} style={styles.sideImage} />
          </View>
        </View>

        {/* VEHICLE SPECS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Specifications</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specCard}>
              <Ionicons name="car-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Make</Text>
              <Text style={styles.specValue}>{carData.make}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="build-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Model</Text>
              <Text style={styles.specValue}>{carData.model}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="calendar-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Year</Text>
              <Text style={styles.specValue}>{carData.year}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="color-palette-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Color</Text>
              <Text style={styles.specValue}>{carData.color}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="card-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Plate</Text>
              <Text style={styles.specValue}>{carData.licensePlate}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="finger-print-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>VIN</Text>
              <Text style={styles.specValue}>{carData.vin}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="people-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Seats</Text>
              <Text style={styles.specValue}>{carData.seats}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="flash-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Fuel</Text>
              <Text style={styles.specValue}>{carData.fuelType}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="cog-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Transmission</Text>
              <Text style={styles.specValue}>{carData.transmission}</Text>
            </View>
          </View>
        </View>

        {/* RENTAL PERIOD */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.datePickerContainer}>
            <TouchableOpacity style={styles.datePickerBox} onPress={() => setShowPickup(true)}>
              <Ionicons name="calendar-outline" size={20} color="#21292B" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Pickup</Text>
                <Text style={styles.dateValue}>{formatDate(pickupDate)}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.datePickerBox} onPress={() => setShowReturn(true)}>
              <Ionicons name="calendar-outline" size={20} color="#21292B" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Return</Text>
                <Text style={styles.dateValue}>{formatDate(returnDate)}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.durationText}>Duration: {diffDays} day{diffDays > 1 ? 's' : ''}</Text>
        </View>

        {/* PRICE BREAKDOWN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Daily Rate</Text>
            <Text style={styles.priceValue}>{pricePerDay.toLocaleString()} RWF</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Number of Days</Text>
            <Text style={styles.priceValue}>× {diffDays}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>{totalRental.toLocaleString()} RWF</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Security Deposit (50%)</Text>
            <Text style={styles.priceValue}>{securityDeposit.toLocaleString()} RWF</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total to Pay Now</Text>
            <Text style={styles.totalValue}>{(totalRental + securityDeposit).toLocaleString()} RWF</Text>
          </View>
          <Text style={styles.paymentNote}>
            Payment Method: {carData.paymentMethod}
          </Text>
        </View>

        {/* POLICIES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policies</Text>
          <View style={styles.policyItem}>
            <Ionicons name="checkmark-circle" size={22} color="#4CAF50" />
            <Text style={styles.policyText}>Fuel must be returned at the same level as pickup</Text>
          </View>
          <View style={styles.policyItem}>
            <Ionicons name="shield-checkmark" size={22} color="#4CAF50" />
            <Text style={styles.policyText}>Basic third-party insurance included</Text>
          </View>
        </View>

        {/* CUSTOMER REVIEWS — COPIED FROM BUY SCREEN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.reviewsContainer}
          >
            {carData.reviews && carData.reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{ uri: review.avatar }}
                    style={styles.avatar}
                  />
                  <View style={styles.reviewUserInfo}>
                    <Text style={styles.reviewUser}>{review.user}</Text>
                    <View style={styles.starsContainer}>
                      {renderStars(review.rating)}
                    </View>
                  </View>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* BOOK NOW */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => {
            if (pickupDate >= returnDate) {
              alert('Return date must be after pickup date');
              return;
            }
            navigation.navigate('Verification', {
              car: carData,
              pickupDate: pickupDate.toISOString(),
              returnDate: returnDate.toISOString(),
              totalRental,
              securityDeposit,
            });
          }}
        >
          <Text style={styles.bookButtonText}>
            Book Now • {(totalRental + securityDeposit).toLocaleString()} RWF
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* DATE PICKERS */}
      <DateTimePickerModal
        isVisible={showPickup}
        mode="datetime"
        date={pickupDate}
        onConfirm={(date) => {
          setPickupDate(date);
          setShowPickup(false);
          if (returnDate <= date) setReturnDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
        }}
        onCancel={() => setShowPickup(false)}
        minimumDate={new Date()}
      />
      <DateTimePickerModal
        isVisible={showReturn}
        mode="datetime"
        date={returnDate}
        onConfirm={setReturnDate}
        onCancel={() => setShowReturn(false)}
        minimumDate={new Date(pickupDate.getTime() + 60 * 60 * 1000)}
      />
    </View>
  );
}

// STYLES — 100% SAME AS BUY SCREEN FOR REVIEWS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: { marginRight: 12 },
  title: { fontSize: 17, fontWeight: 'bold', color: '#21292B', flex: 1 },
  imageGallery: { flexDirection: 'row', height: 220, padding: 10, gap: 10 },
  mainImage: { flex: 2, borderRadius: 12, resizeMode: 'cover' },
  sideImagesContainer: { flex: 1, gap: 10 },
  sideImage: { flex: 1, borderRadius: 12, resizeMode: 'cover' },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#21292B', marginBottom: 16 },
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  specCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  specLabel: { fontSize: 12, color: '#888', marginTop: 8 },
  specValue: { fontSize: 16, fontWeight: 'bold', color: '#21292B', marginTop: 4 },
  datePickerContainer: { gap: 12 },
  datePickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateInfo: { marginLeft: 12, flex: 1 },
  dateLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
  dateValue: { fontSize: 14, fontWeight: '600', color: '#21292B' },
  durationText: { marginTop: 12, fontSize: 16, fontWeight: 'bold', color: '#21292B', textAlign: 'center' },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceLabel: { fontSize: 14, color: '#666' },
  priceValue: { fontSize: 14, fontWeight: '600', color: '#21292B' },
  totalRow: { marginTop: 8, paddingTop: 12, borderTopWidth: 2, borderTopColor: '#21292B', borderBottomWidth: 0 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#21292B' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#21292B' },
  paymentNote: { fontSize: 12, color: '#888', marginTop: 8, textAlign: 'center' },
  policyItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  policyText: { marginLeft: 10, fontSize: 14, color: '#21292B', flex: 1, lineHeight: 20 },
  // REVIEWS — EXACT COPY FROM BUY SCREEN
  reviewsContainer: { paddingRight: 16 },
  reviewCard: {
    width: 280,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  reviewHeader: { flexDirection: 'row', marginBottom: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  reviewUserInfo: { flex: 1, justifyContent: 'center' },
  reviewUser: { fontSize: 14, fontWeight: 'bold', color: '#21292B', marginBottom: 4 },
  starsContainer: { flexDirection: 'row', gap: 2 },
  reviewComment: { fontSize: 14, color: '#666', lineHeight: 20 },
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
  bookButton: {
    backgroundColor: '#21292B',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  bookButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});