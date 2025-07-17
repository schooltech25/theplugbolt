import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Users, Bell, TrendingUp, Clock, CreditCard, MapPin } from 'lucide-react-native';

const quickStats = [
  { title: 'Tables Served', value: '12', change: '+3', icon: TrendingUp },
  { title: 'Avg. Service Time', value: '4.2m', change: '-0.8m', icon: Clock },
  { title: 'Total Orders', value: '28', change: '+7', icon: CreditCard },
  { title: 'Active Tables', value: '5', change: '+2', icon: MapPin },
];

const tableData = [
  { id: 'T1', status: 'occupied', guests: 4, orderValue: '₱1,250', time: '25m' },
  { id: 'T3', status: 'occupied', guests: 2, orderValue: '₱680', time: '12m' },
  { id: 'T5', status: 'ready', guests: 6, orderValue: '₱2,100', time: '35m' },
  { id: 'T7', status: 'occupied', guests: 3, orderValue: '₱950', time: '18m' },
  { id: 'T9', status: 'ready', guests: 2, orderValue: '₱420', time: '8m' },
];

export default function WaiterDashboard() {
  const router = useRouter();

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return '#fbbf24';
      case 'ready': return '#059669';
      case 'vacant': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getTableStatusText = (status: string) => {
    switch (status) {
      case 'occupied': return 'In Service';
      case 'ready': return 'Ready to Serve';
      case 'vacant': return 'Vacant';
      default: return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.title}>Waiter Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color="#000" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Performance Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceTitle}>Daily Rating</Text>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>4.7</Text>
              </View>
            </View>
            <Text style={styles.performanceDescription}>
              Excellent service today! Customers are very satisfied.
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

        {/* Main Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Main Functions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.primaryActionCard}
              onPress={() => router.push('/(dashboard)/waiter/pos')}
            >
              <MapPin size={32} color="#fff" />
              <Text style={styles.primaryActionTitle}>Table Management</Text>
              <Text style={styles.primaryActionDescription}>
                Manage table orders and service
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <CreditCard size={20} color="#000" />
              <Text style={styles.actionText}>Process Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Clock size={20} color="#000" />
              <Text style={styles.actionText}>Service Log</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Table Dashboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Tables</Text>
          <View style={styles.tableGrid}>
            {tableData.map((table) => (
              <TouchableOpacity key={table.id} style={styles.tableCard}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableNumber}>{table.id}</Text>
                  <View style={[styles.tableStatus, { backgroundColor: getTableStatusColor(table.status) }]}>
                    <Text style={styles.tableStatusText}>{getTableStatusText(table.status)}</Text>
                  </View>
                </View>
                <View style={styles.tableInfo}>
                  <Text style={styles.tableGuests}>{table.guests} guests</Text>
                  <Text style={styles.tableValue}>{table.orderValue}</Text>
                </View>
                <Text style={styles.tableTime}>Service time: {table.time}</Text>
                {table.status === 'ready' && (
                  <TouchableOpacity style={styles.serveButton}>
                    <Text style={styles.serveButtonText}>Ready to Serve</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Pickup Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ready for Pickup</Text>
          <View style={styles.pickupCard}>
            <View style={styles.pickupHeader}>
              <Text style={styles.pickupOrder}>Order #1249 - Table T3</Text>
              <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimButtonText}>Claim</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.pickupItems}>2x Pasta, 1x Salad</Text>
            <Text style={styles.pickupTime}>Ready 2 minutes ago</Text>
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
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tableCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  tableStatus: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tableStatusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  tableGuests: {
    fontSize: 14,
    color: '#666',
  },
  tableValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  tableTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  serveButton: {
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  serveButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  pickupCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  pickupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pickupOrder: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  claimButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  claimButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  pickupItems: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  pickupTime: {
    fontSize: 12,
    color: '#666',
  },
});