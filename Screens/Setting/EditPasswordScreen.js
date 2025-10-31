// Screens/Setting/EditPasswordScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Reusable PasswordField component
const PasswordField = ({ label, value, setValue, show, setShow, placeholder }) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={!show}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShow(!show)}
        >
          <Ionicons name={show ? 'eye' : 'eye-off'} size={22} color="#777" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main Screen Component
export default function EditPasswordScreen() {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchStatus, setMatchStatus] = useState(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (confirmPassword === '') {
      setMatchStatus(null);
    } else if (confirmPassword === newPassword) {
      setMatchStatus(true);
    } else {
      setMatchStatus(false);
    }
  }, [confirmPassword, newPassword]);

  const handleSaveChanges = () => {
    if (matchStatus) {
      console.log('Password changed successfully!');
      // Add your API call here
    } else {
      console.log('Passwords do not match.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Password Fields */}
        <PasswordField
          label="Current Password"
          value={currentPassword}
          setValue={setCurrentPassword}
          show={showCurrent}
          setShow={setShowCurrent}
          placeholder="Enter current password"
        />

        <PasswordField
          label="New Password"
          value={newPassword}
          setValue={setNewPassword}
          show={showNew}
          setShow={setShowNew}
          placeholder="Enter new password"
        />

        <PasswordField
          label="Confirm New Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          show={showConfirm}
          setShow={setShowConfirm}
          placeholder="Confirm new password"
        />

        {/* Password Match / Error Message */}
        {matchStatus !== null && (
          <View style={styles.matchContainer}>
            {matchStatus ? (
              <>
                <View style={[styles.iconCircle, { backgroundColor: 'green' }]}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                </View>
                <Text style={styles.matchText}>Passwords match</Text>
              </>
            ) : (
              <>
                <View style={[styles.iconCircle, { backgroundColor: 'red' }]}>
                  <Ionicons name="close" size={16} color="#fff" />
                </View>
                <Text style={styles.errorText}>
                  Password does not match the new password
                </Text>
              </>
            )}
          </View>
        )}

        {/* Save Changes Button */}
        <TouchableOpacity
          style={[styles.saveButton, { opacity: matchStatus ? 1 : 0.6 }]}
          disabled={!matchStatus}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#21292B',
    marginLeft: 10,
  },
  content: { padding: 16 },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#21292B',
    marginBottom: 6,
  },
  inputWrapper: { position: 'relative' },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#21292B',
    paddingRight: 45,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  iconCircle: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  matchText: { color: 'green', fontSize: 13, fontWeight: '500' },
  errorText: { color: 'red', fontSize: 13, fontWeight: '500' },
  saveButton: { backgroundColor: '#21292B', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});