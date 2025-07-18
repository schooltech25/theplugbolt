import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Package, TrendingUp, Clock, Users, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import CollapsibleNavigation from '../../../components/navigation/CollapsibleNavigation';
import { useState } from 'react';

const quickStats = [
  { title: 'Orders Today', value: '47', change: '+8', icon: TrendingUp },
  { title: 'Avg. Process Time', value: '3.2m', change: '-0.5m', icon: Clock },
  { title: 'Walk-in Customers', value: '23', change: '+12', icon: Users },
  { title: 'Low Stock Items', value: '3', change: '-1', icon: AlertTriangle },
];

export default function BartenderDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CollapsibleNavigation
        userRole="bartender"
        currentRoute="/(dashboard)/bartender"
        notificationCount={2}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Bartender Dashboard</Text>
          <Text style={styles.subtitle}>Bar operations and walk-in service</Text>
        </View>

        {/* Performance Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceTitle}>Daily Rating</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>
            <Text style={styles.performanceDescription}>
              Excellent performance today! Keep up the great work.
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Overview</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <stat.icon size={20} color="#666" />
                  <Text style={styles.statChange}>{stat.change}</Text>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Current Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Orders</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>Order #1247</Text>
              <View style={styles.orderStatus}>
                <Text style={styles.orderStatusText}>In Progress</Text>
              </View>
            </View>
            <Text style={styles.orderItems}>2x Beer, 1x Cocktail Mix</Text>
            <Text style={styles.orderTime}>Started 2 minutes ago</Text>
          </View>
          
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>Order #1248</Text>
              <View style={[styles.orderStatus, styles.orderStatusReady]}>
                <Text style={styles.orderStatusText}>Ready</Text>
              </View>
            </View>
            <Text style={styles.orderItems}>1x Wine, 3x Shots</Text>
            <Text style={styles.orderTime}>Completed 1 minute ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    margin: 20,
    marginBottom: 0,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  performanceCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  ratingBadge: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  performanceDescription: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    color: '#059669',
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  orderStatus: {
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  orderStatusReady: {
    backgroundColor: '#059669',
  },
  orderStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
  },
});

  performanceDescription: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statChange: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  actionGrid: {
    gap: 12,
  },
  primaryActionCard: {
    backgroundColor: '#000',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
  },
  primaryActionDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  actionCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  orderStatus: {
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  orderStatusReady: {
    backgroundColor: '#059669',
  },
  orderStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  orderItems: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
  },
});