import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal, StatusBar } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BookLaterModal = ({
  visible,
  onClose,
  pickupLocation,
  destination,
  selectedRide,
  rides,
  distanceKm,
  onBook
}) => {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState('date');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const calculatePrice = (ratePerKm, km) => {
    if (km === 0) return '0 Rwf';
    const total = Math.round(ratePerKm * km / 100) * 100; // Round to nearest 100 RWF
    return total.toLocaleString() + ' Rwf';
  };

  const getCurrentPrice = () => {
    const ride = rides[selectedRide];
    return calculatePrice(ride.ratePerKm, distanceKm);
  };

  const resetAndClose = () => {
    setCurrentStep('date');
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    setShowDatePicker(false);
    setShowTimePicker(false);
    onClose();
  };

  const handleDateConfirm = () => {
    setCurrentStep('time');
  };

  const handleTimeConfirm = () => {
    setCurrentStep('confirm');
  };

  const handleConfirmYes = () => {
    const ride = rides[selectedRide];
    const bookingData = {
      pickup: pickupLocation,
      destination: destination,
      rideType: ride.name,
      date: selectedDate.toDateString(),
      time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: getCurrentPrice(),
    };
    onBook(bookingData);
    resetAndClose();
  };

  const handleConfirmNo = () => {
    resetAndClose();
  };

  const handleCancel = () => {
    resetAndClose();
  };

  const onDateChange = (event, date) => {
    setSelectedDate(date || selectedDate);
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const onTimeChange = (event, date) => {
    setSelectedTime(date || selectedTime);
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
  };

  if (!visible) return null;

  const renderDateContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.modalTitle}>Select Date</Text>
      <TouchableOpacity 
        style={styles.pickerButton} 
        onPress={() => setShowDatePicker(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.pickerButtonText}>
          {selectedDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="compact"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
      {Platform.OS === 'android' && showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
        />
      )}
      <View style={styles.modalButtons}>
        <TouchableOpacity 
          style={styles.modalCancelButton} 
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.modalCancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.modalOkButton} 
          onPress={handleDateConfirm}
          activeOpacity={0.7}
        >
          <Text style={styles.modalOkText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTimeContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.modalTitle}>Select Time</Text>
      <TouchableOpacity 
        style={styles.pickerButton} 
        onPress={() => setShowTimePicker(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.pickerButtonText}>
          {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="compact"
          onChange={onTimeChange}
          minimumDate={new Date()}
        />
      )}
      {Platform.OS === 'android' && showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display="default"
          onChange={onTimeChange}
          minimumDate={new Date()}
        />
      )}
      <View style={styles.modalButtons}>
        <TouchableOpacity 
          style={styles.modalCancelButton} 
          onPress={handleCancel}
          activeOpacity={0.7}
        >
          <Text style={styles.modalCancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.modalOkButton} 
          onPress={handleTimeConfirm}
          activeOpacity={0.7}
        >
          <Text style={styles.modalOkText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConfirmContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.confirmModalTitle}>Confirm a ride</Text>
      <Text style={styles.confirmModalText}>
        Do you want to book or schedule ride from {pickupLocation} to {destination} at {selectedDate.toDateString()} - {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}?
      </Text>
      <View style={styles.confirmModalButtons}>
        <TouchableOpacity 
          style={styles.confirmNoButton} 
          onPress={handleConfirmNo}
          activeOpacity={0.7}
        >
          <Text style={styles.confirmNoText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.confirmYesButton} 
          onPress={handleConfirmYes}
          activeOpacity={0.7}
        >
          <Text style={styles.confirmYesText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getContent = () => {
    switch (currentStep) {
      case 'date':
        return renderDateContent();
      case 'time':
        return renderTimeContent();
      case 'confirm':
        return renderConfirmContent();
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'overFullScreen' : undefined}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <View style={[styles.modalOverlay, { paddingBottom: insets.bottom }]}>
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
          {getContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    maxHeight: '80%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#21292B',
    marginBottom: 20,
  },
  pickerButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#21292B',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalCancelButton: {
    flex: 0.48,
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#666',
    fontWeight: 'bold',
  },
  modalOkButton: {
    flex: 0.48,
    backgroundColor: '#21292B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalOkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#21292B',
    marginBottom: 10,
  },
  confirmModalText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  confirmModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmNoButton: {
    flex: 0.48,
    backgroundColor: '#eee',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmNoText: {
    color: '#666',
    fontWeight: 'bold',
  },
  confirmYesButton: {
    flex: 0.48,
    backgroundColor: '#21292B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmYesText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookLaterModal;