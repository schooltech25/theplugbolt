import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChartBar as BarChart3, Users, Package, CreditCard, Calendar, TrendingUp, Shield } from 'lucide-react-native';
import CollapsibleNavigation from '../../../components/navigation/CollapsibleNavigation';
import NotificationPanel from '../../../components/notifications/NotificationPanel';
import { useState } from 'react';
import { Notification } from '../../../types';

const quickStats = [
  { title: 'Today\'s Sales', value: '₱45,230', change: '+12%', icon: TrendingUp },
  { title: 'Active Orders', value: '23', change: '+5', icon: CreditCard },
  { title: 'Staff Online', value: '6/10', change: '60%', icon: Users },
  { title: 'Low Stock Items', value: '4', change: '-2', icon: Package },
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'staff',
    title: 'Login Request',
    message: 'Maria Santos (Waiter) requesting login approval',
    priority: 'medium',
    targetRoles: ['manager'],
    isRead: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    actionRequired: true,
  },
];

export default function ManagerDashboard() {
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
    if (notification.type === 'staff') {
      router.push('/(dashboard)/manager/staff');
    }
  };

  return (
    <View style={styles.container}>
      <CollapsibleNavigation
        userRole="manager"
        currentRoute="/(dashboard)/manager"
        notificationCount={unreadCount}
        onNotificationPress={() => setShowNotifications(true)}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Manager Dashboard</Text>
          <Text style={styles.subtitle}>Operations management and oversight</Text>
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

        {/* Staff Approval Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Approvals</Text>
          <View style={styles.approvalCard}>
            <View style={styles.approvalHeader}>
              <Users size={20} color="#ea580c" />
              <Text style={styles.approvalTitle}>Login Requests</Text>
              <View style={styles.approvalBadge}>
                <Text style={styles.approvalBadgeText}>2</Text>
              </View>
            </View>
            <Text style={styles.approvalDescription}>
              Staff members waiting for login approval
            </Text>
            <TouchableOpacity style={styles.approvalButton}>
              <Text style={styles.approvalButtonText}>Review Requests</Text>
            </TouchableOpacity>
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
  approvalCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  approvalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  approvalBadge: {
    backgroundColor: '#ea580c',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  approvalBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  approvalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  approvalButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  approvalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

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
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
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
  approvalCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  approvalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  approvalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  approvalBadge: {
    backgroundColor: '#ea580c',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  approvalBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  approvalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  approvalButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  approvalButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});