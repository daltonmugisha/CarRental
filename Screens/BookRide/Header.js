import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title = "Book Ride", showBack = true, showRightIcons = true }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Left: Back Arrow + Title */}
      <View style={styles.leftContainer}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            {/* <Ionicons name="chevron-back" size={25} color="#21292B" /> */}
            <Text style={styles.leftTitle}>{title}</Text>
          </TouchableOpacity>
        )}
        {!showBack && <Text style={styles.logo}>{title}</Text>}
      </View>

      {/* Right Icons */}
      {showRightIcons && (
        <View style={styles.rightIcons}>
          {/* Bell */}
          <TouchableOpacity 
            style={styles.bellContainer}
            onPress={() => navigation.navigate('Notification')}
          >
            <Ionicons name="notifications-outline" size={22} color="#21292B" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>

          {/* Profile Picture */}
          {/* <TouchableOpacity 
            style={styles.profileContainer}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.profileImage}
            />
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', // Chat header clean look
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#21292B',
    marginLeft: 6, 
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

