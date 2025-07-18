import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChartBar as BarChart3 } from 'lucide-react-native';
import SalesReport from '../../../components/reports/SalesReport';

export default function ManagerReports() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  const mockSalesData = {
    period: selectedPeriod,
    totalSales: 45230,
    totalOrders: 127,
    averageOrder: 356,
    topItems: [
      { name: 'San Miguel Beer', quantity: 45, revenue: 2925 },
      { name: 'Chicken Wings', quantity: 23, revenue: 6440 },
      { name: 'Tequila Shot', quantity: 38, revenue: 4560 },
      { name: 'Grilled Burger', quantity: 18, revenue: 5760 },
      { name: 'Red Wine', quantity: 12, revenue: 2160 },
    ],
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
        <Text style={styles.title}>Reports & Analytics</Text>
        <BarChart3 size={24} color="#000" />
      </View>

      <SalesReport
        data={mockSalesData}
        period={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />
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
});