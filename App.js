// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { View, Platform, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Screens
import SplashScreen from './Screens/Splash';
import LoginScreen from './Screens/Login';
import SignupScreen from './Screens/Signup';
import ForgotPassword from './Screens/Forgot';
import OTPScreen from './Screens/Otp';
import HomeScreen from './Screens/Home';
import BuyCarsScreen from './Screens/BuyCars';
import ScanScreen from './Screens/Scan';
import VerifyPhone from './Screens/Verfiy';
import RideScreen from './Screens/Ride';
import LocationSearchScreen from './Screens/BookRide/Location2';
import Location3Screen from './Screens/BookRide/Location3';
import RentCar from './Screens/RentCar';
import CarDetailsScreen from './Screens/RentCar/CarDetail';
import VerificationForm from './Screens/RentCar/Verification';
import LoadingScreen from './Screens/BookRide/Loader';
import GetDriverScreen from './Screens/BookRide/GetDriver';
import BuyCarDetailsScreen from './Screens/BuyCar/CarDetail';
import BuyCarVerificationForm from './Screens/BuyCar/Verification';
import MyAccountScreen from './Screens/Home/MyAccount';
import SettingsScreen from './Screens/Home/Settings';
import MyProfileScreen from './Screens/Home/MyProfile';
import PaymentScreen from './Screens/payment';
import AddPaymentScreen from './Screens/AddNewPayment';
import AddHomeAddressScreen from './Screens/Setting/AddHomeAddressScreen';
import AddWorkAddressScreen from './Screens/Setting/WorkAddress';
import AddSchoolAddressScreen from './Screens/Setting/SchoolAddress';
import EditPasswordScreen from './Screens/Setting/EditPasswordScreen';
import ContactUsScreen from './Screens/Setting/ContactUsScreen';
import NotificationDetailScreen from './Screens/NotificationDetail';
import NotificationsScreen from './Screens/Notification';
import AirportShuttleScreen from './Screens/Airport/Airport';
import RouteAirportScreen from './Screens/Airport/AirportRoute';
import ReservationAirportScreen from './Screens/Airport/Reservation';
import MyPaymentsScreen from './Screens/Home/MyPayments';
import PaymentDetailsScreen from './Screens/Home/MyPaymentsDetails';

// Create Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Bottom Tabs
function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#21292B',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: (Platform.OS === 'ios' ? 90 : 70) + insets.bottom,
          paddingTop: 5,
          paddingBottom: (Platform.OS === 'ios' ? 20 : 8) + insets.bottom,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          left: 0,
          right: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="BookRide"
        component={RideScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity
              onPress={props.onPress}
              style={[styles.floatingScanContainer, props.style]}
              activeOpacity={0.8}
            >
              <View style={styles.floatingScan}>
                <MaterialIcons name="qr-code-scanner" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="RentCar"
        component={RentCar}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="car-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="BuyCar"
        component={BuyCarsScreen}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="car-outline" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgot" component={ForgotPassword} />
          <Stack.Screen name="Verify" component={VerifyPhone} />
          <Stack.Screen name="Otp" component={OTPScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Location2" component={LocationSearchScreen} />
          <Stack.Screen name="Location3" component={Location3Screen} />
          <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
          <Stack.Screen name="Verification" component={VerificationForm} />
          <Stack.Screen name="Loader" component={LoadingScreen} />
          <Stack.Screen name="GetDriver" component={GetDriverScreen} />
          <Stack.Screen name="BuyCarDetails" component={BuyCarDetailsScreen} />
          <Stack.Screen name="BuyVerification" component={BuyCarVerificationForm} />
          <Stack.Screen name="MyAccount" component={MyAccountScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="MyProfile" component={MyProfileScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="NewPayment" component={AddPaymentScreen} />
          <Stack.Screen name="MyPayments" component={MyPaymentsScreen} />
          <Stack.Screen name="MyPaymentsDetails" component={PaymentDetailsScreen} />
          <Stack.Screen name="HomeAddress" component={AddHomeAddressScreen} />
          <Stack.Screen name="WorkAddress" component={AddWorkAddressScreen} />
          <Stack.Screen name="SchoolAddress" component={AddSchoolAddressScreen} />
          <Stack.Screen name="EditPassword" component={EditPasswordScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
          <Stack.Screen name="Notification" component={NotificationsScreen} />
          <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
          <Stack.Screen name="Airport" component={AirportShuttleScreen} />
          <Stack.Screen name="RouteAirport" component={RouteAirportScreen} />
          <Stack.Screen name="AirportReservation" component={ReservationAirportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  floatingScan: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#21292B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  floatingScanContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});