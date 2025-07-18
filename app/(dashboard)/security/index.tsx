import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, TrendingUp, Clock, QrCode, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import CollapsibleNavigation from '../../../components/navigation/CollapsibleNavigation';

const quickStats = [
  { title: 'Tickets Scanned', value: '89', change: '+12', icon: TrendingUp },
  { title: 'Avg. Response Time', value: '2.1m', change: '-0.3m', icon: Clock },
  { title: 'Incidents Logged', value: '3', change: '+1', icon: AlertTriangle },
  { title: 'Vouchers Verified', value: '15', change: '+8', icon: QrCode },
];

export default function SecurityDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <CollapsibleNavigation
        userRole="security"
        currentRoute="/(dashboard)/security"
        notificationCount={1}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Security Dashboard</Text>
          <Text style={styles.subtitle}>Security monitoring and access control</Text>
        </View>

        {/* Performance Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceTitle}>Daily Rating</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
            <Text style={styles.performanceDescription}>
              Outstanding security performance! All incidents handled promptly.
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

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <QrCode size={16} color="#059669" />
              <Text style={styles.activityTitle}>Voucher Scanned</Text>
              <Text style={styles.activityTime}>2m ago</Text>
            </View>
            <Text style={styles.activityDescription}>
              Free drink voucher verified for customer #1247
            </Text>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <AlertTriangle size={16} color="#fbbf24" />
              <Text style={styles.activityTitle}>Minor Incident</Text>
              <Text style={styles.activityTime}>15m ago</Text>
            </View>
            <Text style={styles.activityDescription}>
              Spilled drink cleaned up, no further action required
            </Text>
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <QrCode size={16} color="#059669" />
              <Text style={styles.activityTitle}>Ticket Verified</Text>
              <Text style={styles.activityTime}>28m ago</Text>
            </View>
            <Text style={styles.activityDescription}>
              Event ticket scanned for VIP customer entry
            </Text>
          </View>
        </View>

        {/* Pending Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Requests</Text>
          <View style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <Shield size={20} color="#dc2626" />
              <Text style={styles.requestTitle}>Manager Request</Text>
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentText}>URGENT</Text>
              </View>
            </View>
            <Text style={styles.requestDescription}>
              Assistance needed at Table 7 - customer complaint
            </Text>
            <TouchableOpacity style={styles.respondButton}>
              <Text style={styles.respondButtonText}>Respond Now</Text>
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
  requestCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  urgentBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  urgentText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  requestDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  respondButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  respondButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
  requestCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  urgentBadge: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgentText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  requestDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  respondButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  respondButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});