import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

// --- Custom Navigators ---
import CustomTabBar from './src/navigation/CustomTabBar';
import CustomDrawer from './src/navigation/CustomDrawer';

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
import OrganizerProfileScreen from './src/screens/OrganizerProfileScreen';
import InviteFriendScreen from './src/screens/InviteFriendScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createNativeStackNavigator();

const EmptyComponent = () => null;

const HomeTabs = () => (
  <Tab.Navigator
    tabBar={(props) => <CustomTabBar {...props} />}
    screenOptions={{ headerShown: false }}
  >
    <Tab.Screen name="Explore" component={HomeScreen} />
    <Tab.Screen name="Events" component={SeeAllEventsScreen} />
    <Tab.Screen name="CenterButton" component={EmptyComponent} />
    <Tab.Screen name="Map" component={MapViewScreen} />
    <Tab.Screen name="Profile" component={MyProfileScreen} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        width: 270,
        backgroundColor: '#FFFFFF',
      },
    }}
  >
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

export default function App() {
  return (
    <View style={styles.appContainer}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthNavigator} />
          <RootStack.Screen name="Main" component={DrawerNavigator} />
          <RootStack.Screen name="EventDetails" component={EventDetailsScreen} />
          <RootStack.Screen name="SeeAllEvents" component={SeeAllEventsScreen} />
          <RootStack.Screen name="Filter" component={FilterScreen} options={{ presentation: 'modal' }} />
          <RootStack.Screen name="Notification" component={NotificationScreen} />
          <RootStack.Screen name="Search" component={SearchScreen} />
          <RootStack.Screen name="OrganizerProfile" component={OrganizerProfileScreen} />
          <RootStack.Screen name="InviteFriend" component={InviteFriendScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    ...(Platform.OS === 'web'
      ? {
          maxWidth: 480,
          width: '100%',
          alignSelf: 'center',
          height: '100vh' as any,
          boxShadow: '0 0 24px rgba(0,0,0,0.1)',
          overflow: 'hidden' as any,
        }
      : {}),
  },
});
