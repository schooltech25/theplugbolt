import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChartBar as BarChart3, Users, Package, CreditCard, Bell, Calendar, TrendingUp, Shield, Settings } from 'lucide-react-native';

const dashboardItems = [
  { id: 'bartender', title: 'Bartender Dashboard', icon: Package, color: '#059669' },
  { id: 'kitchen', title: 'Kitchen Dashboard', icon: CreditCard, color: '#dc2626' },
  { id: 'waiter', title: 'Waiter Dashboard', icon: Users, color: '#7c3aed' },
  { id: 'security', title: 'Security Dashboard', icon: Shield, color: '#ea580c' },
];

const quickStats = [
  { title: 'Today\'s Sales', value: '₱45,230', change: '+12%', icon: TrendingUp },
  { title: 'Active Orders', value: '23', change: '+5', icon: CreditCard },
  { title: 'Staff Online', value: '6/10', change: '60%', icon: Users },
  { title: 'Low Stock Items', value: '4', change: '-2', icon: Package },
];

export default function ManagerDashboard() {
  const router = useRouter();

  const navigateToDashboard = (dashboardId: string) => {
    router.push(`/(dashboard)/${dashboardId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Manager Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        {/* Dashboard Navigation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Access Dashboards</Text>
          <View style={styles.dashboardGrid}>
            {dashboardItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.dashboardCard}
                onPress={() => navigateToDashboard(item.id)}
              >
                <View style={[styles.dashboardIcon, { backgroundColor: `${item.color}15` }]}>
                  <item.icon size={24} color={item.color} />
                </View>
                <Text style={styles.dashboardTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Management Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management Tools</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <BarChart3 size={20} color="#000" />
              <Text style={styles.actionText}>Reports</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={20} color="#000" />
              <Text style={styles.actionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Package size={20} color="#000" />
              <Text style={styles.actionText}>Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Settings size={20} color="#000" />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 32,
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