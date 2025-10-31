import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CarDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params || {};

  // Mock car data with purchase-related details
  const carData = params.car ? {
    ...params.car,
    name: params.car.name || params.car.model || 'Unknown Car', // Prioritize name for display
    model: params.car.model || 'Unknown Model', // Keep model for other uses
    year: params.car.year || 2023,
    purchasePrice: params.car.purchasePrice || 25000000,
    mileage: params.car.mileage || '30,000 km',
    condition: params.car.condition || 'Excellent',
    seats: params.car.seats || 5,
    fuelType: params.car.fuelType || 'Petrol',
    transmission: params.car.transmission || 'Automatic',
    features: params.car.features || ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Backup Camera', 'Apple CarPlay', 'USB Charging'],
    images: params.car.images || [
      'https://di-Uploads-pod16.dealerinspire.com/toyotaofnorthcharlotte/uploads/2022/08/N-Charlotte-Toyota-sedan.jpg',
      'https://dealerinspire-image-library-prod.s3.us-east-1.amazonaws.com/images/ZQ4URzhsDTUaCxztiexbP7HvHSbocYf0kjGF3ZXb.jpg',
      'https://scout.customerscout.net/Gallery/IMAGES/2023/Toyota/Camry/2023ToyotaCamry-interior-01.jpg',
    ],
    reviews: params.car.reviews || [
      { user: 'John Doe', rating: 5, comment: 'Amazing car! Smooth ride and great value for the price.', avatar: 'https://i.pravatar.cc/150?img=12' },
      { user: 'Sarah Smith', rating: 4, comment: 'Really happy with my purchase. The car was in great condition.', avatar: 'https://i.pravatar.cc/150?img=45' },
      { user: 'Mike Johnson', rating: 5, comment: 'Excellent buying experience. The car exceeded my expectations!', avatar: 'https://i.pravatar.cc/150?img=33' },
      { user: 'Emma Brown', rating: 4, comment: 'Good value for money. Would definitely buy again.', avatar: 'https://i.pravatar.cc/150?img=23' },
    ],
  } : {
    id: 1,
    name: 'Toyota Camry',
    model: 'Camry',
    year: 2023,
    purchasePrice: 25000000,
    mileage: '30,000 km',
    condition: 'Excellent',
    seats: 5,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    features: ['Air Conditioning', 'GPS Navigation', 'Bluetooth', 'Backup Camera', 'Apple CarPlay', 'USB Charging'],
    images: [
      'https://di-Uploads-pod16.dealerinspire.com/toyotaofnorthcharlotte/uploads/2022/08/N-Charlotte-Toyota-sedan.jpg',
      'https://dealerinspire-image-library-prod.s3.us-east-1.amazonaws.com/images/ZQ4URzhsDTUaCxztiexbP7HvHSbocYf0kjGF3ZXb.jpg',
      'https://scout.customerscout.net/Gallery/IMAGES/2023/Toyota/Camry/2023ToyotaCamry-interior-01.jpg',
    ],
    reviews: [
      { user: 'John Doe', rating: 5, comment: 'Amazing car! Smooth ride and great value for the price.', avatar: 'https://i.pravatar.cc/150?img=12' },
      { user: 'Sarah Smith', rating: 4, comment: 'Really happy with my purchase. The car was in great condition.', avatar: 'https://i.pravatar.cc/150?img=45' },
      { user: 'Mike Johnson', rating: 5, comment: 'Excellent buying experience. The car exceeded my expectations!', avatar: 'https://i.pravatar.cc/150?img=33' },
      { user: 'Emma Brown', rating: 4, comment: 'Good value for money. Would definitely buy again.', avatar: 'https://i.pravatar.cc/150?img=23' },
    ],
  };

  console.log('Car data loaded:', carData);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FontAwesome 
        key={i} 
        name={i < rating ? "star" : "star-o"} 
        size={14} 
        color={i < rating ? "orange" : "#ccc"} 
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={20} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.title}>{carData.name} ({carData.year})</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageGallery}>
          <Image 
            source={{ uri: carData.images[0] }} 
            style={styles.mainImage} 
          />
          <View style={styles.sideImagesContainer}>
            <Image 
              source={{ uri: carData.images[1] }} 
              style={styles.sideImage} 
            />
            <Image 
              source={{ uri: carData.images[2] }} 
              style={styles.sideImage} 
            />
          </View>
        </View>

        {/* Specifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          <View style={styles.specsGrid}>
            <View style={styles.specCard}>
              <Ionicons name="calendar-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Year</Text>
              <Text style={styles.specValue}>{carData.year}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="speedometer-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Mileage</Text>
              <Text style={styles.specValue}>{carData.mileage}</Text>
            </View>
            <View style={styles.specCard}>
              <Ionicons name="car-outline" size={24} color="#21292B" />
              <Text style={styles.specLabel}>Condition</Text>
              <Text style={styles.specValue}>{carData.condition}</Text>
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

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {carData.features && carData.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="green" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Purchase Price</Text>
            <Text style={styles.priceValue}>{carData.purchasePrice.toLocaleString()} RWF</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Status</Text>
            <Text style={[styles.priceValue, { color: 'green' }]}>In Stock</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Price</Text>
            <Text style={styles.totalValue}>{carData.purchasePrice.toLocaleString()} RWF</Text>
          </View>
          <Text style={styles.paymentNote}>Financing options available at checkout</Text>
        </View>

        {/* Customer Reviews */}
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

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Buy Now Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('BuyVerification', { car: carData })}
        >
          <Text style={styles.bookButtonText}>Reserve Now</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#21292B',
    flex: 1,
  },
  imageGallery: {
    flexDirection: 'row',
    height: 220,
    padding: 10,
    gap: 10,
  },
  mainImage: {
    flex: 2,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  sideImagesContainer: {
    flex: 1,
    gap: 10,
  },
  sideImage: {
    flex: 1,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#21292B',
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
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
  specLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
  specValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#21292B',
    marginTop: 4,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#21292B',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#21292B',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 2,
    borderTopColor: '#21292B',
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#21292B',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#21292B',
  },
  paymentNote: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  reviewsContainer: {
    paddingRight: 16,
  },
  reviewCard: {
    width: 280,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewUserInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#21292B',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
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
  bookButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});