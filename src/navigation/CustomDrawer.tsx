import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const { navigation } = props;

  const menuItems = [
    { id: '1', title: 'My Profile', icon: 'person-outline', screen: 'Profile' },
    { id: '2', title: 'Message', icon: 'chatbubble-ellipses-outline', badge: '3' },
    { id: '3', title: 'Calender', icon: 'calendar-outline', screen: 'Events' },
    { id: '4', title: 'Bookmark', icon: 'bookmark-outline' },
    { id: '5', title: 'Contact Us', icon: 'mail-outline' },
    { id: '6', title: 'Settings', icon: 'settings-outline' },
    { id: '7', title: 'Helps & FAQs', icon: 'help-circle-outline' },
    { id: '8', title: 'Sign Out', icon: 'log-out-outline', isSignOut: true },
  ];

  const handlePress = (item: any) => {
    if (item.isSignOut) {
      navigation.navigate('Auth', { screen: 'SignIn' });
    } else if (item.screen) {
      navigation.navigate('HomeTabs', { screen: item.screen });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../anhmau/my_profile/1290_image_89.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>Ashfak Sayem</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handlePress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={22} color="#747688" style={styles.menuIcon} />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              {item.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Upgrade Pro Banner */}
        <TouchableOpacity style={styles.upgradeCard} activeOpacity={0.85}>
          <Ionicons name="ribbon-outline" size={20} color="#00F8FF" style={{ marginRight: 8 }} />
          <Text style={styles.upgradeText}>Upgrade Pro</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 30,
  },
  profileSection: {
    marginBottom: 35,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginBottom: 12,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#120D26',
  },
  menuSection: {
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuTitle: {
    fontSize: 15,
    color: '#120D26',
    fontWeight: '500',
  },
  badge: {
    backgroundColor: '#F59762',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  upgradeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 248, 255, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  upgradeText: {
    color: '#00F8FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
