import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Calendar, TrendingUp, DollarSign, Package } from 'lucide-react-native';

interface SalesData {
  period: string;
  totalSales: number;
  totalOrders: number;
  averageOrder: number;
  topItems: { name: string; quantity: number; revenue: number }[];
}

interface SalesReportProps {
  data: SalesData;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  onPeriodChange: (period: 'daily' | 'weekly' | 'monthly' | 'yearly') => void;
}

export default function SalesReport({ data, period, onPeriodChange }: SalesReportProps) {
  const periods = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' },
  ] as const;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales Report</Text>
        <View style={styles.periodTabs}>
          {periods.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                styles.periodTab,
                period === p.id && styles.periodTabActive,
              ]}
              onPress={() => onPeriodChange(p.id)}
            >
              <Text style={[
                styles.periodTabText,
                period === p.id && styles.periodTabTextActive,
              ]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <DollarSign size={20} color="#059669" />
            <Text style={styles.summaryValue}>₱{data.totalSales.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Total Sales</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <Package size={20} color="#3b82f6" />
            <Text style={styles.summaryValue}>{data.totalOrders}</Text>
            <Text style={styles.summaryLabel}>Total Orders</Text>
          </View>
          
          <View style={styles.summaryCard}>
            <TrendingUp size={20} color="#fbbf24" />
            <Text style={styles.summaryValue}>₱{data.averageOrder.toFixed(0)}</Text>
            <Text style={styles.summaryLabel}>Avg. Order</Text>
          </View>
        </View>

        {/* Top Selling Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selling Items</Text>
          {data.topItems.map((item, index) => (
            <View key={index} style={styles.topItemCard}>
              <View style={styles.topItemRank}>
                <Text style={styles.rankNumber}>{index + 1}</Text>
              </View>
              <View style={styles.topItemInfo}>
                <Text style={styles.topItemName}>{item.name}</Text>
                <Text style={styles.topItemQuantity}>{item.quantity} sold</Text>
              </View>
              <Text style={styles.topItemRevenue}>₱{item.revenue.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Performance Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          <View style={styles.metricsCard}>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Revenue Growth</Text>
              <Text style={[styles.metricValue, { color: '#059669' }]}>+12.5%</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Order Volume</Text>
              <Text style={[styles.metricValue, { color: '#059669' }]}>+8.3%</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Customer Satisfaction</Text>
              <Text style={[styles.metricValue, { color: '#059669' }]}>4.7/5</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  periodTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  periodTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  periodTabActive: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  periodTabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  periodTabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  topItemCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  topItemRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  topItemInfo: {
    flex: 1,
  },
  topItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  topItemQuantity: {
    fontSize: 12,
    color: '#666',
  },
  topItemRevenue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  metricsCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});