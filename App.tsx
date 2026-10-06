import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// --- Auth Screens ---
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';

// --- Main Screens ---
import HomeScreen from './src/screens/HomeScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import MapViewScreen from './src/screens/MapViewScreen';
import SearchScreen from './src/screens/SearchScreen';
import SeeAllEventsScreen from './src/screens/SeeAllEventsScreen';
import FilterScreen from './src/screens/FilterScreen';

// --- Profile & Others ---
import MyProfileScreen from './src/screens/MyProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Map" component={MapViewScreen} />
    <Tab.Screen name="Profile" component={MyProfileScreen} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    <Drawer.Screen name="Search" component={SearchScreen} />
    <Drawer.Screen name="Notification" component={NotificationScreen} />
  </Drawer.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
    <AuthStack.Screen name="Splash" component={SplashScreen} />
    <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="Verification" component={VerificationScreen} />
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </AuthStack.Navigator>
);

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* State logic to switch Auth/Main would go here */}
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="Main" component={DrawerNavigator} />
        <RootStack.Screen name="EventDetails" component={EventDetailsScreen} />
        <RootStack.Screen name="SeeAllEvents" component={SeeAllEventsScreen} />
        <RootStack.Screen name="Filter" component={FilterScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
