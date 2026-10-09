import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function OrganizerProfileScreen({ navigation, route }: any) {
  const [activeTab, setActiveTab] = useState<'ABOUT' | 'EVENT' | 'REVIEWS'>('ABOUT');

  const events = [
    {
      id: '1',
      title: 'A virtual evening of smooth jazz',
      image: require('../../anhmau/see_all_events/780_group_33490.png'),
      date: '1st May - Sat - 2:00 PM',
      location: 'Radius Gallery • Santa Cruz'
    },
    {
      id: '2',
      title: "Jo Malone London's Mother's Day",
      image: require('../../anhmau/home_/1768_group_33318.png'),
      date: '24th Apr - Sat - 8:00 PM',
      location: '36 Guild Street London, UK'
    },
    {
      id: '3',
      title: "Women's leadership conference",
      image: require('../../anhmau/see_all_events/764_group_33495.png'),
      date: '15th Apr - Thu - 10:00 AM',
      location: 'Gala Convention Center'
    }
  ];

  const reviews = [
    {
      id: '1',
      name: 'Rocks Velkeinjen',
      date: '10 Feb',
      rating: 4,
      avatar: require('../../anhmau/notification/15_ellipse_65.png'),
      comment: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.'
    },
    {
      id: '2',
      name: 'Angelina Zelly',
      date: '09 Feb',
      rating: 5,
      avatar: require('../../anhmau/notification/11_ellipse_63.png'),
      comment: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.'
    },
    {
      id: '3',
      name: 'Zenileen Belex',
      date: '08 Feb',
      rating: 4,
      avatar: require('../../anhmau/notification/9_ellipse_62.png'),
      comment: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax.'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color="#120D26" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical" size={24} color="#120D26" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.profileSection}>
          <Image
            source={require('../../anhmau/notification/9_ellipse_62.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>David Silbia</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>350</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>346</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>

          {/* Action Buttons: Follow & Messages */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.followButton} activeOpacity={0.85}>
              <Ionicons name="person-add-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messagesButton} activeOpacity={0.85}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#5669FF" style={{ marginRight: 6 }} />
              <Text style={styles.messagesText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Tab Headers: ABOUT / EVENT / REVIEWS */}
        <View style={styles.tabsContainer}>
          {(['ABOUT', 'EVENT', 'REVIEWS'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'ABOUT' && (
          <Animated.View entering={FadeInDown.duration(400)} style={styles.aboutContainer}>
            <Text style={styles.aboutBody}>
              Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.{' '}
              <Text style={styles.readMore}>Read More ⌄</Text>
            </Text>
          </Animated.View>
        )}

        {activeTab === 'EVENT' && (
          <Animated.View entering={FadeInDown.duration(400)} style={styles.eventsContainer}>
            {events.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.eventCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('EventDetails', { event: item })}
              >
                <Image source={item.image} style={styles.eventImg} resizeMode="cover" />
                <View style={styles.eventInfo}>
                  <Text style={styles.eventDate}>{item.date}</Text>
                  <Text style={styles.eventTitle} numberOfLines={2}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        )}

        {activeTab === 'REVIEWS' && (
          <Animated.View entering={FadeInDown.duration(400)} style={styles.reviewsContainer}>
            {reviews.map((rev) => (
              <View key={rev.id} style={styles.reviewCard}>
                <Image source={rev.avatar} style={styles.reviewAvatar} />
                <View style={styles.reviewBody}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewName}>{rev.name}</Text>
                    <Text style={styles.reviewDate}>{rev.date}</Text>
                  </View>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={star <= rev.rating ? 'star' : 'star-outline'}
                        size={14}
                        color="#FFA000"
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewText}>{rev.comment}</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        )}
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerBtn: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#120D26',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#120D26',
  },
  statLabel: {
    fontSize: 13,
    color: '#747688',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E4DFDF',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 14,
    width: '100%',
    paddingHorizontal: 10,
  },
  followButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#5669FF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5669FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  followText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  messagesButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#5669FF',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesText: {
    color: '#5669FF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    marginTop: 24,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#5669FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#747688',
  },
  tabTextActive: {
    color: '#5669FF',
  },
  aboutContainer: {
    paddingVertical: 10,
  },
  aboutBody: {
    fontSize: 15,
    color: '#3C3E56',
    lineHeight: 24,
  },
  readMore: {
    color: '#5669FF',
    fontWeight: '600',
  },
  eventsContainer: {
    gap: 14,
    paddingVertical: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  eventImg: {
    width: 72,
    height: 72,
    borderRadius: 10,
  },
  eventInfo: {
    flex: 1,
    marginLeft: 14,
  },
  eventDate: {
    fontSize: 12,
    color: '#5669FF',
    fontWeight: '600',
    marginBottom: 4,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#120D26',
    lineHeight: 18,
  },
  reviewsContainer: {
    gap: 16,
    paddingVertical: 10,
  },
  reviewCard: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  reviewAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  reviewBody: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#120D26',
  },
  reviewDate: {
    fontSize: 12,
    color: '#747688',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
    marginVertical: 4,
  },
  reviewText: {
    fontSize: 13,
    color: '#747688',
    lineHeight: 18,
  },
});
