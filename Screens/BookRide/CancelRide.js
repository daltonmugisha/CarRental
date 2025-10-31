// Screens/RentCar/CancelRide.js
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Platform, // <-- THIS WAS MISSING!
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CancelRideModal({ visible, onClose, onSubmit }) {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState("reason");
  const [cancelReason, setCancelReason] = useState("Changed my mind");
  const [customReason, setCustomReason] = useState("");
  const [open, setOpen] = useState(false);
  const [items] = useState([
    { label: "Changed my mind", value: "Changed my mind" },
    { label: "Found another ride", value: "Found another ride" },
    { label: "Driver too far", value: "Driver too far" },
    { label: "Other", value: "Other" },
  ]);

  const resetAndClose = () => {
    setCurrentStep("reason");
    setCancelReason("Changed my mind");
    setCustomReason("");
    setOpen(false);
    onClose();
  };

  const handleReasonConfirm = () => {
    const reason = cancelReason === "Other" ? customReason : cancelReason;
    if (!reason.trim()) {
      alert("Please select or enter a reason");
      return;
    }
    setCurrentStep("confirm");
  };

  const handleConfirmYes = () => {
    const reason = cancelReason === "Other" ? customReason : cancelReason;
    onSubmit(reason);
    resetAndClose();
  };

  const handleConfirmNo = () => {
    resetAndClose();
  };

  const renderReasonContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.modalTitle}>Select Cancellation Reason</Text>
      <Text style={styles.modalSubtitle}>Why are you cancelling the ride?</Text>
      <DropDownPicker
        open={open}
        value={cancelReason}
        items={items}
        setOpen={setOpen}
        setValue={(cb) => setCancelReason(cb())}
        setItems={() => {}} // items are static
        style={styles.picker}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholder="Select a reason"
      />
      {cancelReason === "Other" && (
        <TextInput
          style={styles.textInput}
          placeholder="Enter your reason"
          value={customReason}
          onChangeText={setCustomReason}
          multiline
          textAlignVertical="top"
        />
      )}
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={styles.modalCancelButton}
          onPress={resetAndClose}
          activeOpacity={0.7}
        >
          <Text style={styles.modalCancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalOkButton}
          onPress={handleReasonConfirm}
          activeOpacity={0.7}
        >
          <Text style={styles.modalOkText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConfirmContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.confirmModalTitle}>Confirm Cancellation</Text>
      <Text style={styles.confirmModalText}>
        Are you sure you want to cancel the ride?{"\n"}
        Reason: {cancelReason === "Other" ? customReason : cancelReason}
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
      case "reason":
        return renderReasonContent();
      case "confirm":
        return renderConfirmContent();
      default:
        return null;
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      presentationStyle={Platform.OS === "ios" ? "overFullScreen" : undefined} // Now works!
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
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    alignItems: "center",
    maxHeight: "80%",
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#21292B",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    width: "100%",
    height: 50,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: "#d7d7d7",
  },
  dropDownContainer: {
    width: "100%",
    marginBottom: 15,
    borderColor: "#d7d7d7",
    borderRadius: 10,
  },
  textInput: {
    width: "100%",
    height: 80,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  modalCancelButton: {
    flex: 0.48,
    backgroundColor: "#eee",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalCancelText: {
    color: "#666",
    fontWeight: "bold",
  },
  modalOkButton: {
    flex: 0.48,
    backgroundColor: "#21292B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalOkText: {
    color: "white",
    fontWeight: "bold",
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#21292B",
    marginBottom: 10,
  },
  confirmModalText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  confirmModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmNoButton: {
    flex: 0.48,
    backgroundColor: "#eee",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmNoText: {
    color: "#666",
    fontWeight: "bold",
  },
  confirmYesButton: {
    flex: 0.48,
    backgroundColor: "#21292B",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmYesText: {
    color: "white",
    fontWeight: "bold",
  },
});