import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ navigation }) {
  const [allowCall, setAllowCall] = useState(true);
  const [language, setLanguage] = useState('English');

  const languages = ['English', 'Francaise', 'Kinyarwanda'];

  const favoritePlaces = [
    { label: 'Add Home Address', navigateTo: 'HomeAddress' },
    { label: 'Add Work Address', navigateTo: 'WorkAddress' },
    { label: 'Add School Address', navigateTo: 'SchoolAddress' },
  ];

  const legalOptions = [
    { label: 'Terms & Conditions', navigateTo: 'TermsScreen' },
    { label: 'Privacy Policy', navigateTo: 'PrivacyScreen' },
  ];

  const reachUsOptions = [
    { label: 'Visit Website', navigateTo: 'WebsiteScreen' },
    { label: 'Contact Us', navigateTo: 'ContactUs' },
    { label: 'Delete My Account', navigateTo: 'DeleteAccountScreen' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>johndoe@example.com</Text>
          </View>
        </View>

        {/* Favorite Places */}
        <Text style={styles.sectionTitle}>Favorite Places</Text>
        {favoritePlaces.map((place, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => navigation.navigate(place.navigateTo)}
          >
            <Text style={styles.optionLabel}>{place.label}</Text>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        ))}

        {/* Security & Privacy */}
        <Text style={styles.sectionTitle}>Security & Privacy</Text>
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Allow Drivers to Call Me</Text>
          <Switch
            value={allowCall}
            onValueChange={setAllowCall}
            thumbColor={allowCall ? '#21292B' : '#ccc'}
            trackColor={{ true: '#cfd3d4', false: '#eee' }}
          />
        </View>
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => navigation.navigate('EditPassword')}
        >
          <Text style={styles.optionLabel}>Edit Password</Text>
          <Ionicons name="chevron-forward" size={22} color="#999" />
        </TouchableOpacity>

        {/* Language */}
        <Text style={styles.sectionTitle}>Language</Text>
        {languages.map((lang, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => setLanguage(lang)}
          >
            <Text style={styles.optionLabel}>{lang}</Text>
            {language === lang && (
              <Ionicons name="checkmark" size={20} color="#21292B" />
            )}
          </TouchableOpacity>
        ))}

        {/* Legal */}
        <Text style={styles.sectionTitle}>Legal</Text>
        {legalOptions.map((legal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => navigation.navigate(legal.navigateTo)}
          >
            <Text style={styles.optionLabel}>{legal.label}</Text>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        ))}

        {/* Reach Us */}
        <Text style={styles.sectionTitle}>Reach Us</Text>
        {reachUsOptions.map((reach, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => navigation.navigate(reach.navigateTo)}
          >
            <Text style={[styles.optionLabel, reach.label === 'Delete My Account' && { color: '#D9534F' }]}>
              {reach.label}
            </Text>
            <Ionicons name="chevron-forward" size={22} color="#999" />
          </TouchableOpacity>
        ))}

        <View style={{ height: 70 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb' },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {
    marginRight: 10,
    padding: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#21292B',
  },

  content: { padding: 16 },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 1,
  },
  profileImage: { width: 60, height: 60, borderRadius: 30 },
  profileInfo: { marginLeft: 16 },
  profileName: { fontSize: 16, fontWeight: 'bold', color: '#21292B' },
  profileEmail: { fontSize: 13, color: '#666', marginTop: 4 },

  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 18,
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  optionLabel: {
    fontSize: 15,
    color: '#21292B',
    fontWeight: '500',
  },
});
