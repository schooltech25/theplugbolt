import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Package, TrendingDown, TrendingUp, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { InventoryItem } from '../../types';

interface InventoryListProps {
  items: InventoryItem[];
  onItemPress?: (item: InventoryItem) => void;
}

export default function InventoryList({ items, onItemPress }: InventoryListProps) {
  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock) return 'low';
    if (item.currentStock >= item.maxStock) return 'high';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return '#dc2626';
      case 'high': return '#059669';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low': return AlertTriangle;
      case 'high': return TrendingUp;
      default: return Package;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {items.map((item) => {
        const status = getStockStatus(item);
        const StatusIcon = getStatusIcon(status);
        const statusColor = getStatusColor(status);

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => onItemPress?.(item)}
          >
            <View style={styles.itemHeader}>
              <View style={styles.itemInfo}>
                <StatusIcon size={20} color={statusColor} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
              </View>
              <View style={styles.stockInfo}>
                <Text style={[styles.stockLevel, { color: statusColor }]}>
                  {item.currentStock} {item.unit}
                </Text>
                <Text style={styles.stockRange}>
                  Min: {item.minStock} | Max: {item.maxStock}
                </Text>
              </View>
            </View>

            <View style={styles.itemFooter}>
              <Text style={styles.purchasePrice}>
                Purchase: ₱{item.purchasePrice.toFixed(2)}
              </Text>
              <Text style={styles.supplier}>
                {item.supplier || 'No supplier'}
              </Text>
            </View>

            {status === 'low' && (
              <View style={styles.lowStockBanner}>
                <AlertTriangle size={16} color="#dc2626" />
                <Text style={styles.lowStockText}>Low Stock Alert</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    color: '#666',
  },
  stockInfo: {
    alignItems: 'flex-end',
  },
  stockLevel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stockRange: {
    fontSize: 12,
    color: '#666',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purchasePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  supplier: {
    fontSize: 12,
    color: '#666',
  },
  lowStockBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 8,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  lowStockText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
});