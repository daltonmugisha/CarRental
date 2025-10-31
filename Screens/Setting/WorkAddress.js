// Screens/Setting/AddWorkAddressScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AddWorkAddressScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleDestinationChange = (text) => {
    setSearchText(text);

    if (!text || text.length < 2) {
      setSuggestions([]);
      return;
    }

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(async () => {
      try {
        const apiKey = 'AIzaSyDBaDarG-S951BPfZoUCScMSe_T_v8M0pE';
        const country = 'rw';
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            text
          )}&components=country:${country}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.status === 'OK' && data.predictions) {
          const apiSuggestions = data.predictions.map((item) => ({
            id: item.place_id,
            title: item.description,
          }));
          setSuggestions(apiSuggestions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error('API Error:', error);
        setSuggestions([]);
      }
    }, 300);

    setDebounceTimer(timer);
  };

  const selectSuggestion = (item) => {
    if (!item || !item.title) return;
    setSearchText(item.title);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Ionicons
                name="chevron-back"
                size={25}
                color="#21292B"
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.headerTitle}>Add Work Address</Text>
            </View>

            {/* Address Input */}
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={styles.label}>Work Address</Text>
              <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Type your work address"
                value={searchText}
                onChangeText={handleDestinationChange}
              />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionItem}
            onPress={() => selectSuggestion(item)}
          >
            <Text style={styles.suggestionText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => console.log('Add Work Address pressed')}
          >
            <Text style={styles.addButtonText}>Add Address</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingBottom: 50 }}
      />
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
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#21292B',
    marginLeft: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#21292B',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#21292B',
  },
  suggestionItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 16,
  },
  suggestionText: {
    fontSize: 14,
    color: '#21292B',
  },
  addButton: {
    backgroundColor: '#21292B',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});