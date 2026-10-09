import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const initialFriends = [
  { id: '1', name: 'Alex Lee', followers: '2k Followers', avatar: require('../../anhmau/notification/15_ellipse_65.png'), selected: true },
  { id: '2', name: 'Micheal Silva', followers: '56 Followers', avatar: require('../../anhmau/notification/9_ellipse_62.png'), selected: false },
  { id: '3', name: 'Cristofer', followers: '300 Followers', avatar: require('../../anhmau/notification/11_ellipse_63.png'), selected: true },
  { id: '4', name: 'David Silbia', followers: '1k Followers', avatar: require('../../anhmau/notification/13_ellipse_64.png'), selected: false },
  { id: '5', name: 'Ashfak Sayem', followers: '432 Followers', avatar: require('../../anhmau/my_profile/1290_image_89.png'), selected: false },
  { id: '6', name: 'Rocks Velkeinjen', followers: '876 Followers', avatar: require('../../anhmau/notification/7_ellipse_61.png'), selected: true },
  { id: '7', name: 'Roman Kutepov', followers: '654 Followers', avatar: require('../../anhmau/notification/17_ellipse_66.png'), selected: false },
  { id: '8', name: 'Cristofer Nolan', followers: '2.4k Followers', avatar: require('../../anhmau/notification/19_ellipse_67.png'), selected: false },
];

export default function InviteFriendScreen({ navigation }: any) {
  const [friends, setFriends] = useState(initialFriends);
  const [search, setSearch] = useState('');

  const toggleSelect = (id: string) => {
    setFriends(friends.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const filteredFriends = friends.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#120D26" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite Friend</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Input */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#747688" style={{ marginRight: 10 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#747688"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Friends List */}
      <FlatList
        data={filteredFriends}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 40).duration(300)}>
            <TouchableOpacity
              style={styles.friendRow}
              activeOpacity={0.8}
              onPress={() => toggleSelect(item.id)}
            >
              <Image source={item.avatar} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.followers}>{item.followers}</Text>
              </View>
              <View style={[styles.checkbox, item.selected && styles.checkboxActive]}>
                {item.selected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {/* Bottom Invite Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.inviteButton} activeOpacity={0.85} onPress={() => navigation.goBack()}>
          <View style={{ width: 30 }} />
          <Text style={styles.inviteButtonText}>INVITE</Text>
          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 14,
  },
  headerBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#120D26',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E6E6EC',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    backgroundColor: '#FAFAFA',
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#120D26',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#120D26',
    marginBottom: 2,
  },
  followers: {
    fontSize: 12,
    color: '#747688',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E6E6EC',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#5669FF',
    borderColor: '#5669FF',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  inviteButton: {
    backgroundColor: '#5669FF',
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  arrowCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
