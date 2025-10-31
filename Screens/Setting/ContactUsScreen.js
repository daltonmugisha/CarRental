import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ContactUsScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!name || !email || !message) {
      alert('Please fill all fields before sending.');
      return;
    }
    console.log('✅ Message Sent:', { name, email, message });
    alert('Message sent successfully!');
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#21292B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
      </View>

      {/* MAIN CONTENT */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Intro */}
          <Text style={styles.introText}>
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello — reach out below.
          </Text>

          {/* CONTACT INFO CARDS */}
          <View style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Ionicons
                name="mail-outline"
                size={22}
                color="#fff"
                style={styles.iconGradient}
              />
              <View>
                <Text style={styles.infoTitle}>Email</Text>
                <Text style={styles.infoText}>support@platforminc.rw</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Ionicons
                name="call-outline"
                size={22}
                color="#fff"
                style={styles.iconGradient}
              />
              <View>
                <Text style={styles.infoTitle}>Phone</Text>
                <Text style={styles.infoText}>+250 794 377 409</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <Ionicons
                name="location-outline"
                size={22}
                color="#fff"
                style={styles.iconGradient}
              />
              <View>
                <Text style={styles.infoTitle}>Location</Text>
                <Text style={styles.infoText}>Kigali, Rwanda</Text>
              </View>
            </View>
          </View>

          {/* FORM */}
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Type your message here..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
          </View>

          {/* Padding so content doesn't hide behind button */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* FIXED BOTTOM BUTTON */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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

  scrollContainer: {
    padding: 16,
    paddingBottom: 120, // space for button
  },

  introText: {
    color: '#21292B',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },

  infoContainer: {
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconGradient: {
    backgroundColor: '#21292B',
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  infoTitle: {
    color: '#21292B',
    fontWeight: '600',
    fontSize: 14,
  },
  infoText: {
    color: '#555',
    fontSize: 13,
  },

  form: { marginTop: 10 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#21292B',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#21292B',
    marginBottom: 14,
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },

  // Fixed Bottom Button
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  sendButton: {
    backgroundColor: '#21292B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
