import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DateTimePickerSection({
  onPickupChange,
  onReturnChange,
  onSearch,
  initialPickupDate,
  initialReturnDate,
}) {
  // Ensure we always have valid Date objects
  const safeInitialPickup = initialPickupDate instanceof Date && !isNaN(initialPickupDate.getTime()) 
    ? initialPickupDate 
    : new Date();
    
  const safeInitialReturn = initialReturnDate instanceof Date && !isNaN(initialReturnDate.getTime())
    ? initialReturnDate 
    : new Date(Date.now() + 24 * 60 * 60 * 1000);

  const [pickupDate, setPickupDate] = useState(safeInitialPickup);
  const [returnDate, setReturnDate] = useState(safeInitialReturn);
  const [showPickup, setShowPickup] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const navigation = useNavigation();

  const handleConfirmPickup = (selectedDate) => {
    setShowPickup(false);
    
    const newPickupDate = selectedDate;
    setPickupDate(newPickupDate);
    
    if (onPickupChange) {
      onPickupChange(newPickupDate);
    }
    
    // Ensure return date is at least 1 hour after pickup
    const minReturnDate = new Date(newPickupDate.getTime() + 60 * 60 * 1000);
    if (returnDate < minReturnDate) {
      setReturnDate(minReturnDate);
      if (onReturnChange) {
        onReturnChange(minReturnDate);
      }
    }
  };

  const handleCancelPickup = () => {
    setShowPickup(false);
  };

  const handleConfirmReturn = (selectedDate) => {
    setShowReturn(false);
    
    const newReturnDate = selectedDate;
    const minReturnDate = new Date(pickupDate.getTime() + 60 * 60 * 1000);

    if (newReturnDate < minReturnDate) {
      Alert.alert(
        'Invalid Return Time',
        'Car rental return must be at least 1 hour after pickup.',
        [{ text: 'OK' }]
      );
      return;
    }

    setReturnDate(newReturnDate);
    if (onReturnChange) {
      onReturnChange(newReturnDate);
    }
  };

  const handleCancelReturn = () => {
    setShowReturn(false);
  };

  // Format date and time for car rental - with safety check
  const formatDateTime = (date) => {
    try {
      if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return 'Select date';
      }
      return `${date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })} ${date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })}`;
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Select date';
    }
  };

  // Handle search action
  const handleSearch = () => {
    const minReturnDate = new Date(pickupDate.getTime() + 60 * 60 * 1000);
    if (returnDate < minReturnDate) {
      Alert.alert(
        'Invalid Dates',
        'Please select a valid return date at least 1 hour after pickup.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (onSearch) {
      onSearch({ pickupDate, returnDate });
    }
    navigation.navigate('CarResults', { pickupDate, returnDate });
  };

  return (
    <View style={styles.container}>
      {/* Pickup Date/Time */}
      <View style={styles.dateColumn}>
        <Text style={styles.label}>Pickup</Text>
        <TouchableOpacity
          style={styles.dateWrapper}
          onPress={() => setShowPickup(true)}
          accessibilityLabel="Select car rental pickup date and time"
          accessibilityRole="button"
        >
          <Ionicons name="car-outline" size={16} color="#888" />
          <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
            {formatDateTime(pickupDate)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Return Date/Time */}
      <View style={styles.dateColumn}>
        <Text style={styles.label}>Return</Text>
        <TouchableOpacity
          style={styles.dateWrapper}
          onPress={() => setShowReturn(true)}
          accessibilityLabel="Select car rental return date and time"
          accessibilityRole="button"
        >
          <Ionicons name="car-sport-outline" size={16} color="#888" />
          <Text style={styles.dateText} numberOfLines={1} ellipsizeMode="tail">
            {formatDateTime(returnDate)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Button */}
      <View style={styles.searchColumn}>
        <Text style={styles.label} />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          accessibilityLabel="Search for available rental cars"
          accessibilityRole="button"
        >
          <Ionicons name="search" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Pickup DateTimePicker Modal */}
      <DateTimePickerModal
        isVisible={showPickup}
        mode="datetime"
        date={pickupDate}
        onConfirm={handleConfirmPickup}
        onCancel={handleCancelPickup}
        minimumDate={new Date()}
        isDarkModeEnabled={false}
      />

      {/* Return DateTimePicker Modal */}
      <DateTimePickerModal
        isVisible={showReturn}
        mode="datetime"
        date={returnDate}
        onConfirm={handleConfirmReturn}
        onCancel={handleCancelReturn}
        minimumDate={pickupDate ? new Date(pickupDate.getTime() + 60 * 60 * 1000) : new Date()}
        isDarkModeEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  dateColumn: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  searchColumn: {
    width: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#21292B',
    marginBottom: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d7d7d7',
    borderRadius: 8,
    height: 36,
    paddingHorizontal: 6,
  },
  dateText: {
    marginLeft: 6,
    fontSize: 11,
    color: '#21292B',
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#21292B',
    borderRadius: 8,
    height: 36,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});