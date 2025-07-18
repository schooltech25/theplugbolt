import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Users } from 'lucide-react-native';
import StaffEvaluation from '../../../components/staff/StaffEvaluation';
import { User, PerformanceMetrics } from '../../../types';

export default function ManagerStaff() {
  const router = useRouter();

  const mockStaff: User[] = [
    {
      id: 'staff-1',
      username: 'Maria Santos',
      email: 'maria@barmaster.com',
      role: 'waiter',
      isFirstLogin: false,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
    {
      id: 'staff-2',
      username: 'Juan Cruz',
      email: 'juan@barmaster.com',
      role: 'bartender',
      isFirstLogin: false,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
    {
      id: 'staff-3',
      username: 'Ana Reyes',
      email: 'ana@barmaster.com',
      role: 'kitchen',
      isFirstLogin: false,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      isActive: true,
    },
  ];

  const mockPerformanceData: PerformanceMetrics[] = [
    {
      userId: 'staff-1',
      date: new Date(),
      role: 'waiter',
      metrics: {
        ordersProcessed: 23,
        averageServiceTime: 4.2,
        customersServed: 67,
      },
      rating: 4.7,
      notes: 'Excellent customer service',
    },
    {
      userId: 'staff-2',
      date: new Date(),
      role: 'bartender',
      metrics: {
        ordersProcessed: 45,
        totalSales: 12500,
      },
      rating: 4.8,
      notes: 'Fast and efficient service',
    },
    {
      userId: 'staff-3',
      date: new Date(),
      role: 'kitchen',
      metrics: {
        ordersProcessed: 34,
        averageServiceTime: 8.5,
      },
      rating: 4.6,
      notes: 'Consistent quality',
    },
  ];

  const handleEvaluate = (userId: string, rating: number, notes: string) => {
    // In a real app, this would save to database
    console.log('Evaluation submitted:', { userId, rating, notes });
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
        <Text style={styles.title}>Staff Management</Text>
        <Users size={24} color="#000" />
      </View>

      <StaffEvaluation
        staff={mockStaff}
        performanceData={mockPerformanceData}
        onEvaluate={handleEvaluate}
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