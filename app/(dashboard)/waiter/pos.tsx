import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin } from 'lucide-react-native';
import MenuGrid from '../../../components/pos/MenuGrid';
import CategoryTabs from '../../../components/pos/CategoryTabs';
import OrderSummary from '../../../components/pos/OrderSummary';
import { mockMenuItems, mockTables } from '../../../data/mockData';
import { MenuItem, OrderItem, Table } from '../../../types';

export default function WaiterPOS() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleTableSelect = (table: Table) => {
    if (table.status === 'vacant') {
      Alert.alert('Error', 'Please seat customers at this table first');
      return;
    }
    setSelectedTable(table);
    setOrderItems([]); // Clear previous order when switching tables
  };

  const handleItemSelect = (item: MenuItem) => {
    if (!selectedTable) {
      Alert.alert('Error', 'Please select a table first');
      return;
    }

    const existingItem = orderItems.find(orderItem => orderItem.menuItemId === item.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(orderItem =>
        orderItem.menuItemId === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ));
    } else {
      const newOrderItem: OrderItem = {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };
      setOrderItems([...orderItems, newOrderItem]);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setOrderItems(orderItems.map(item =>
      item.menuItemId === itemId
        ? { ...item, quantity }
        : item
    ));
  };

  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.menuItemId !== itemId));
  };

  const handleCheckout = () => {
    if (!selectedTable) {
      Alert.alert('Error', 'Please select a table first');
      return;
    }

    if (orderItems.length === 0) {
      Alert.alert('Error', 'Please add items to the order');
      return;
    }

    const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = total * 0.12;
    const serviceCharge = total * 0.10;
    const finalTotal = total + vat + serviceCharge;

    Alert.alert(
      'Confirm Order',
      `Process order for ${selectedTable.number} - ₱${finalTotal.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Process the order
            Alert.alert('Success', `Order for ${selectedTable.number} processed successfully!`);
            setOrderItems([]);
          },
        },
      ]
    );
  };

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'occupied': return '#fbbf24';
      case 'reserved': return '#3b82f6';
      case 'vacant': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getTableStatusText = (status: string) => {
    switch (status) {
      case 'occupied': return 'Occupied';
      case 'reserved': return 'Reserved';
      case 'vacant': return 'Vacant';
      default: return 'Unknown';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Waiter POS</Text>
        <Text style={styles.subtitle}>Table Orders</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.tableSection}>
          <Text style={styles.sectionTitle}>Select Table</Text>
          <ScrollView style={styles.tableGrid} showsVerticalScrollIndicator={false}>
            <View style={styles.tableRow}>
              {mockTables.map((table) => (
                <TouchableOpacity
                  key={table.id}
                  style={[
                    styles.tableCard,
                    selectedTable?.id === table.id && styles.tableCardSelected,
                    table.status === 'vacant' && styles.tableCardDisabled,
                  ]}
                  onPress={() => handleTableSelect(table)}
                >
                  <View style={styles.tableHeader}>
                    <MapPin size={16} color="#666" />
                    <Text style={styles.tableNumber}>{table.number}</Text>
                  </View>
                  <View style={[styles.tableStatus, { backgroundColor: getTableStatusColor(table.status) }]}>
                    <Text style={styles.tableStatusText}>{getTableStatusText(table.status)}</Text>
                  </View>
                  <Text style={styles.tableCapacity}>
                    {table.guests ? `${table.guests}/${table.capacity}` : `${table.capacity} seats`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <View style={styles.menuSection}>
          <CategoryTabs
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
          <MenuGrid
            items={mockMenuItems}
            onItemSelect={handleItemSelect}
            selectedCategory={selectedCategory}
          />
        </View>

        <View style={styles.orderSection}>
          <OrderSummary
            items={orderItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
            tableNumber={selectedTable?.number}
          />
        </View>
      </View>
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
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  tableSection: {
    width: 200,
    backgroundColor: '#f8f9fa',
    borderRightWidth: 1,
    borderRightColor: '#e9ecef',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  tableGrid: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tableCard: {
    width: '47%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 8,
  },
  tableCardSelected: {
    borderColor: '#000',
    borderWidth: 2,
  },
  tableCardDisabled: {
    opacity: 0.5,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
  },
  tableStatus: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  tableStatusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCapacity: {
    fontSize: 12,
    color: '#666',
  },
  menuSection: {
    flex: 2,
    backgroundColor: '#fff',
  },
  orderSection: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: '#e9ecef',
  },
});