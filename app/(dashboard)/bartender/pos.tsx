import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import MenuGrid from '../../../components/pos/MenuGrid';
import CategoryTabs from '../../../components/pos/CategoryTabs';
import OrderSummary from '../../../components/pos/OrderSummary';
import { mockMenuItems } from '../../../data/mockData';
import { MenuItem, OrderItem } from '../../../types';

export default function BartenderPOS() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const handleItemSelect = (item: MenuItem) => {
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
      `Process walk-in order for ₱${finalTotal.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Process the order
            Alert.alert('Success', 'Order processed successfully!');
            setOrderItems([]);
          },
        },
      ]
    );
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
        <Text style={styles.title}>Bartender POS</Text>
        <Text style={styles.subtitle}>Walk-in Orders</Text>
      </View>

      <View style={styles.content}>
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