import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Pressable, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation, title, showBack, showRightIcons = true }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setShowDropdown(false);
    navigation.navigate('Login');
  };

  const handleOutsidePress = () => {
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      {/* Left: Back Button or Logo */}
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={20} color="#21292B" />
            <Text style={styles.leftTitle}>{title}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.logo}>GoSnap</Text>
        )}
      </View>

      {/* Right Icons */}
      {showRightIcons && !showBack && (
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
          <TouchableOpacity 
            style={styles.profileContainer}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Dropdown Menu using Modal to appear above all */}
      <Modal
        transparent
        visible={showDropdown}
        animationType="fade"
        onRequestClose={handleOutsidePress}
      >
        <Pressable style={styles.modalOverlay} onPress={handleOutsidePress}>
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('MyAccount');
              }}
            >
              <Ionicons name="person-outline" size={20} color="#21292B" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>My Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('Settings');
              }}
            >
              <Ionicons name="cog-outline" size={20} color="#21292B" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#21292B" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#21292B',
    marginLeft: 8,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#21292B',
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
    marginRight: 15,
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
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    top: 70, // pushed slightly down
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    width: 200,
    zIndex: 9999,
    paddingVertical: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownIcon: {
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#21292B',
    fontWeight: '500',
  },
});
