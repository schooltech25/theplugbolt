import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { MenuItem, OrderItem } from '../../types';

interface MenuGridProps {
  items: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
  selectedCategory: string;
}

export default function MenuGrid({ items, onItemSelect, selectedCategory }: MenuGridProps) {
  const filteredItems = items.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'non-alcoholic') return item.category === 'non-alcoholic';
    if (selectedCategory === 'alcoholic') return item.category === 'alcoholic';
    if (selectedCategory === 'food') return item.category === 'food';
    if (selectedCategory === 'shots') return item.subcategory === 'shots';
    if (selectedCategory === 'glass') return item.subcategory === 'glass';
    if (selectedCategory === 'pitcher') return item.subcategory === 'pitcher';
    if (selectedCategory === 'bottled') return item.subcategory === 'bottled';
    return false;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.itemCard,
              !item.isAvailable && styles.itemCardDisabled,
            ]}
            onPress={() => item.isAvailable && onItemSelect(item)}
            disabled={!item.isAvailable}
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            )}
            <View style={styles.itemInfo}>
              <Text style={[
                styles.itemName,
                !item.isAvailable && styles.itemNameDisabled,
              ]}>
                {item.name}
              </Text>
              <Text style={[
                styles.itemPrice,
                !item.isAvailable && styles.itemPriceDisabled,
              ]}>
                ₱{item.price.toFixed(2)}
              </Text>
              {!item.isAvailable && (
                <Text style={styles.unavailableText}>Out of Stock</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
  },
  itemCardDisabled: {
    opacity: 0.5,
    backgroundColor: '#f8f9fa',
  },
  itemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemNameDisabled: {
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemPriceDisabled: {
    color: '#666',
  },
  unavailableText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
    marginTop: 4,
  },
});