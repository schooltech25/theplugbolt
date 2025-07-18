import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChartBar as BarChart3, Users, Package, CreditCard, Settings, Calendar, TrendingUp, Shield, Code } from 'lucide-react-native';
import CollapsibleNavigation from '../../../components/navigation/CollapsibleNavigation';
import NotificationPanel from '../../../components/notifications/NotificationPanel';
import { useState } from 'react';
import { Notification } from '../../../types';

const quickStats = [
  { title: 'Today\'s Sales', value: '₱45,230', change: '+12%', icon: TrendingUp },
  { title: 'Active Orders', value: '23', change: '+5', icon: CreditCard },
  { title: 'Staff Online', value: '8/12', change: '67%', icon: Users },
  { title: 'Low Stock Items', value: '4', change: '-2', icon: Package },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Order Ready',
    message: 'Order #1245 is ready for pickup at Table 3',
    priority: 'high',
    targetRoles: ['owner'],
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    actionRequired: true,
  },
  {
    id: '2',
    type: 'inventory',
    title: 'Low Stock Alert',
    message: 'Beer bottles running low (6 cases remaining)',
    priority: 'medium',
    targetRoles: ['owner'],
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    actionRequired: false,
  },
];

export default function OwnerDashboard() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    // Handle notification action based on type
    if (notification.orderId) {
      router.push('/(dashboard)/kitchen/orders');
    }
  };

  return (
    <View style={styles.container}>
      <CollapsibleNavigation
        userRole="owner"
        currentRoute="/(dashboard)/owner"
        notificationCount={unreadCount}
        onNotificationPress={() => setShowNotifications(true)}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Owner Dashboard</Text>
        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <TrendingUp size={16} color="#059669" />
              <Text style={styles.activityTitle}>Sales Update</Text>
              <Text style={styles.activityTime}>5m ago</Text>
            </View>
            <Text style={styles.activityDescription}>
              Daily sales target achieved - ₱45,230 (112% of target)
            </Text>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Users size={16} color="#3b82f6" />
              <Text style={styles.activityTitle}>Staff Performance</Text>
              <Text style={styles.activityTime}>15m ago</Text>
            </View>
            <Text style={styles.activityDescription}>
              All staff members performing above average today
            </Text>
          </View>
        </View>
      </ScrollView>

      <NotificationPanel
        visible={showNotifications}
        notifications={notifications}
        onClose={() => setShowNotifications(false)}
        onMarkAsRead={handleMarkAsRead}
        onNotificationPress={handleNotificationPress}
      />
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
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 12,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
  },
});

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
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dashboardCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  dashboardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  dashboardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});