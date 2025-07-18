import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChefHat } from 'lucide-react-native';
import OrderQueue from '../../../components/kitchen/OrderQueue';
import { mockOrders } from '../../../data/mockData';
import { Order } from '../../../types';

export default function KitchenOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(
    mockOrders.filter(order => 
      order.status === 'new' || order.status === 'cooking' || order.status === 'prepared'
    )
  );

  const handleUpdateStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      )
    );

    // Show confirmation
    const statusText = newStatus === 'cooking' ? 'started cooking' : 'marked as prepared';
    Alert.alert('Status Updated', `Order #${orderId.slice(-4)} ${statusText}`);

    // If marked as prepared, notify waiters (in real app, this would be a push notification)
    if (newStatus === 'prepared') {
      Alert.alert(
        'Order Ready',
        `Order #${orderId.slice(-4)} is ready for pickup. Waiters have been notified.`,
        [{ text: 'OK' }]
      );
    }
  };

  const activeOrders = orders.filter(order => 
    order.status === 'new' || order.status === 'cooking'
  );
  const preparedOrders = orders.filter(order => order.status === 'prepared');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Kitchen Orders</Text>
        <ChefHat size={24} color="#000" />
      </View>

      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{activeOrders.length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: '#059669' }]}>{preparedOrders.length}</Text>
          <Text style={styles.statLabel}>Prepared</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {Math.round(orders.reduce((sum, order) => {
              const timeDiff = new Date().getTime() - order.createdAt.getTime();
              return sum + (timeDiff / 60000);
            }, 0) / orders.length) || 0}m
          </Text>
          <Text style={styles.statLabel}>Avg Time</Text>
        </View>
      </View>

      <View style={styles.content}>
        <OrderQueue
          orders={orders}
          onUpdateStatus={handleUpdateStatus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    flex: 1,
  },
});